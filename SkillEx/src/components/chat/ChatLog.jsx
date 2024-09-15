import { useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { useState } from "react";
import { useGetMessagesQuery } from "../../api/MessagesApi";

export default function ChatLog() {
    const receiver = useSelector(state => state.receiver);
    const { data, isLoading, isSuccess, isError, error } = useGetMessagesQuery(receiver._id, { refetchOnMountOrArgChange: true });
    const [messages, setMessages] = useState(data);

    return (
        receiver._id == ''
            ? <div className="chat-log">
                <img src="/SkillEx Logo.png" alt="SkillEx Logo" />
                <h1>Unleash Potential, Share Skills, Grow Together</h1>
            </div>
            : <div className="chat-log">
                <ChatHeader />
                <ChatMessages messages={messages} setMessages={setMessages} data={data} isLoading={isLoading} />
                <ChatInput messages={messages} setMessages={setMessages} />
            </div>
    )
}
