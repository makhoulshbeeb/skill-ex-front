import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";

export default function ChatLog() {

    return (
        <div className="chat-log">
            <ChatHeader />
            <div className="chat-messages">

            </div>
            <ChatInput />
        </div>
    )
}
