import { useSelector } from "react-redux";
import { useGetMessagesQuery } from "../../api/MessagesApi";

export default function ChatMessages() {
    const receiver = useSelector(state => state.receiver);
    const user = useSelector(state => state.user);
    const { data: messages, isLoading, isSuccess, isError, error } = useGetMessagesQuery(receiver._id);
    return (
        <div className="chat-messages">
            <div className="chat-reverse">
                {messages?.map((element) => {
                    return (
                        <div key={element._id} className={`message ${element.senderId.toString().localeCompare(user._id.toString()) ? "sent" : "recieved"}`}>
                            <div>{element.message}</div>
                            <p>{element.createdAt}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
