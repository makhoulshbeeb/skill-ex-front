import "../../pages/styles/Chat.css"
import VideoChatInput from './VideoChatInput';
import { useSelector } from "react-redux";
import { timeToString } from "../../utils/DateToString";
import { useGetUserByTokenQuery } from "../../api/UsersApi";
import { useSocketContext } from "../../context/SocketContext";
import { useEffect, useState } from "react";

export default function VideoTextMessages({ open }) {
    const { socket } = useSocketContext();
    const receiver = useSelector(state => state.videoReceiver);

    const { data: user } = useGetUserByTokenQuery();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket?.on("videoChat", (newMessage) => {
            console.log(newMessage)
            setMessages([...messages, newMessage]);
        });
        return () => socket?.off("videoChat");
    }, [socket, setMessages, messages]);
    return (
        <div className='video-text-messages' style={{ width: open ? '25dvw' : '0' }}>
            <h1>Chat</h1>
            <div className="chat-messages" style={{ justifyContent: 'flex-start' }}>
                <div className="chat-reverse">
                    {messages?.map((element, index) => {
                        return (
                            <div key={index} className={`message ${element.senderId == user._id ? "sent" : "recieved"}`}>
                                <div>{element.message}</div>
                                <p>{timeToString(element.createdAt)}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <VideoChatInput messages={messages} setMessages={setMessages} socket={socket} />
        </div>
    )
}
