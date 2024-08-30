
export default function ChatPanel({ chat }) {
    return (
        <div className="chat-panel">
            <img src={chat.particpants[0].picture} alt={`${chat.particpants[0].username}'s Picture`} />
            <h3>{chat.particpants[0].displayName}</h3>
        </div>
    )
}
