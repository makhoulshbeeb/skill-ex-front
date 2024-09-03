import { useSelector } from "react-redux";
import { useGetMessagesQuery } from "../../api/MessagesApi";
import dateToString from "../../utils/DateToString";
import { useGetUserByTokenQuery } from "../../api/UsersApi";
import { useSocketContext } from "../../context/SocketContext";
import { useEffect } from "react";

export default function ChatMessages() {
    const { socket } = useSocketContext();
    const receiver = useSelector(state => state.receiver);
    const { data: user } = useGetUserByTokenQuery();
    var { data: messages, isLoading, isSuccess, isError, error } = useGetMessagesQuery(receiver._id);

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            const { data } = useGetMessagesQuery(receiver._id);
            messages = data;
            return () => socket?.off("newMessage");
        });

        return () => socket?.off("newMessage");
    }, [socket, messages]);

    return (
        <div className="chat-messages">
            <div className="chat-reverse">
                {messages?.map((element) => {
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
