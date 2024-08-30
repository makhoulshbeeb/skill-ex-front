import { useSelector } from "react-redux"

export default function ChatLog() {
    const receiver = useSelector(state => state.receiver);
    return (
        <div className="chat-header">

        </div>
    )
}
