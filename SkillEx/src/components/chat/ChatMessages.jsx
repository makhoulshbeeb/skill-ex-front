import { useSelector } from "react-redux";
import { useGetMessagesQuery } from "../../api/MessagesApi";
import dateToString from "../../utils/DateToString";
import { useGetUserByTokenQuery } from "../../api/UsersApi";
import { useSocketContext } from "../../context/SocketContext";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function ChatMessages() {
    const { socket } = useSocketContext();
    const receiver = useSelector(state => state.receiver);
    const [messages, setMessages] = useState([]);

    const { data: user } = useGetUserByTokenQuery();
    const { data, isLoading, isSuccess, isError, error } = useGetMessagesQuery(receiver._id, { refetchOnMountOrArgChange: true });
    const [prevData, setPrevData] = useState(data);

    if (prevData != data) {
        setPrevData(data);
        setMessages(data);
    }

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            setMessages([...messages, newMessage]);
        });
        return () => socket?.off("newMessage");
    }, [socket, setMessages, messages]);

    return (
        <div className="chat-messages">
            <div className="chat-reverse">
                {isLoading
                    ? <FontAwesomeIcon
                        icon={faSpinner}
                        fontSize={"2rem"}
                        color={"var(--background-dark)"}
                        spinPulse
                    />
                    : messages?.map((element) => {
                        return (
                            <div key={element._id} className={`message ${element.senderId.toString() == user._id.toString() ? "sent" : "recieved"}`}>
                                <div>{element.message}</div>
                                <p>{dateToString(element.createdAt)}</p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
