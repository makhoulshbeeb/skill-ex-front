import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

export default function ChatLog() {

    return (
        <div className="chat-log">
            <ChatHeader />
            <ChatMessages />
            <ChatInput />
        </div>
    )
}
