import { useSelector } from "react-redux";
import { useGetMessagesQuery } from "../../api/MessagesApi";
import { dateToString } from "../../utils/DateToString";
import { useGetUserByTokenQuery } from "../../api/UsersApi";
import { useSocketContext } from "../../context/SocketContext";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function ChatMessages({ messages, setMessages }) {
    const { socket } = useSocketContext();
    const receiver = useSelector(state => state.receiver);

    const { data: user } = useGetUserByTokenQuery();
    const { data, isLoading, isSuccess, isError, error } = useGetMessagesQuery(receiver._id, { refetchOnMountOrArgChange: true });
    const [prevData, setPrevData] = useState(data);

    if (prevData != data) {
        setPrevData(data);
        setMessages(data);
    }

    useEffect(() => {
        socket?.on("newMessage", ({ newMessage }) => {
            if (newMessage.senderId == receiver._id) setMessages([...messages, newMessage]);
        });
        return () => socket?.off("newMessage");
    }, [socket, setMessages, messages]);

    return (
        <div className="chat-messages" style={{ justifyContent: isLoading ? 'center' : 'flex-start' }}>
            <div className="chat-reverse">
                {isLoading
                    ? <center>
                        <FontAwesomeIcon
                            icon={faSpinner}
                            fontSize={"2rem"}
                            color={"var(--background-dark)"}
                            spinPulse
                        />
                    </center>
                    : messages?.map((element, index) => {
                        return (
                            <div key={index} className={`message ${element.senderId == user._id ? "sent" : "recieved"}`}>
                                <div>{element.message}</div>
                                <p>{dateToString(element.createdAt)}</p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
