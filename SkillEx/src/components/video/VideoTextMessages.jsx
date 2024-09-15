import { useState } from 'react'
import VideoChatInput from './VideoChatInput';

export default function VideoTextMessages() {
    const { socket } = useSocketContext();
    const receiver = useSelector(state => state.receiver);

    const { data: user } = useGetUserByTokenQuery();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket?.on("videoChat", ({ newMessage }) => {
            if (newMessage.senderId == receiver._id) setMessages([...messages, newMessage]);
        });
        return () => socket?.off("newMessage");
    }, [socket, setMessages, messages]);
    return (
        <div className='video-text-messages'>

            <VideoChatInput messages={messages} setMessages={setMessages} socket={socket} />
        </div>
    )
}
