import ChatList from "../components/chat/ChatList";
import ChatLog from "../components/chat/ChatLog";

export default function Chat() {
    return (
        <div className="chat-container">
            <ChatList />
            <ChatLog />
        </div>
    )
}
