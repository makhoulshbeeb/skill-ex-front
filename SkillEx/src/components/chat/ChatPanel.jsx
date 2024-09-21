import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { setReceiver } from "../../app/slices/receiverSlice";

export default function ChatPanel({ chat, online }) {
    const receiver = useSelector(state => state.receiver);
    const dispatch = useDispatch();

    const selected = chat.participants[0]._id == receiver._id;

    return (
        <div className="chat-panel"
            style={{ backgroundColor: selected ? "var(--primary-light)" : "var(--background-color)" }}
            onClick={() => dispatch(setReceiver(chat.participants[0]))}>
            <div>
                <img src={chat.participants[0].picture} alt={`${chat.participants[0].username}'s Picture`} />
                <div style={{ backgroundColor: online ? 'limegreen' : 'var(--text-light)' }}></div>
            </div>
            <h3 style={{ color: selected ? "var(--background-color)" : "var(--text-light)" }}>{chat.participants[0].displayName}</h3>
        </div>
    )
}
