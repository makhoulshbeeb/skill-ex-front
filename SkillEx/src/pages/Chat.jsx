import ChatList from "../components/ChatList";
import ChatMessages from "../components/ChatMessages";


export default function Chat() {
    return (
        <div className="chat-container">
            <ChatList />
            <ChatMessages />
        </div>
    )
}
