import { useSelector } from "react-redux";
import { useGetMessagesQuery } from "../../api/MessagesApi";

export default function ChatMessages() {
    const receiver = useSelector(state => state.receiver);
    const user = useSelector(state => state.user);
    const { data, isLoading, isSuccess, isError, error } = useGetMessagesQuery(receiver._id);
    return (
        <div className="chat-messages">
            <div className="chat-reverse">
                {messages.map((element) => {
                    return (
                        <div className={`message ${element.senderId == user._id ? "sent" : "recieved"}`}>
                            <div>{element.message}</div>
                            <p>{element.created_at}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
