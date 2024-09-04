import { useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { useState } from "react";

export default function ChatLog() {
    const receiver = useSelector(state => state.receiver);
    const [messages, setMessages] = useState([]);

    return (
        receiver._id == ''
            ? <div className="chat-log">
                <img src="/SkillEx Logo.png" alt="SkillEx Logo" />
                <h1>Unleash Potential, Share Skills, Grow Together</h1>
            </div>
            : <div className="chat-log">
                <ChatHeader />
                <ChatMessages messages={messages} setMessages={setMessages} />
                <ChatInput messages={messages} setMessages={setMessages} />
            </div>
    )
}
