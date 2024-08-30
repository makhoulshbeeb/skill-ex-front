import "../components/chat/Chat.css"

import ChatSidebar from "../components/chat/ChatSidebar";
import ChatLog from "../components/chat/ChatLog";

export default function Chat() {
    return (
        <div className="chat-container">
            <ChatSidebar />
            <hr />
            <ChatLog />
            <img src="/SkillEx Background 1.png" alt="Main Background" className="bg" />
        </div>
    )
}
