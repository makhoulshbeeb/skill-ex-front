import { useNavigate } from 'react-router-dom';
import './Chat.css'
import { useSelector } from "react-redux"

export default function ChatLog() {
    const receiver = useSelector(state => state.receiver);
    const navigate = useNavigate();
    return (
        <div className="chat-log">
            <div className="chat-header">
                <div
                    onClick={() => navigate(`user/${receiver.username}`)}>
                    <img src={receiver.picture} alt={`${receiver.username}'s Picture`}
                    />
                    <h4 style={{ color: "var(--background-color)" }}>{receiver.displayName}</h4>
                </div>
            </div>
        </div>
    )
}
