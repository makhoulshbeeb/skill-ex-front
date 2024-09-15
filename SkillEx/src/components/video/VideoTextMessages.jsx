import { useState } from 'react'
import VideoChatInput from './VideoChatInput';
import { useSelector } from "react-redux";
import { timeToString } from "../../utils/DateToString";
import { useGetUserByTokenQuery } from "../../api/UsersApi";
import { useSocketContext } from "../../context/SocketContext";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

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
            <div className="chat-messages" style={{ justifyContent: isLoading ? 'center' : 'flex-start' }}>
                <div className="chat-reverse">
                    {isLoading
                        ? <center>
                            <FontAwesomeIcon
                                icon={faSpinner}
                                fontSize={"2rem"}
                                color={"var(--background-dark)"}
                                spinPulse
                            />
                        </center>
                        : messages?.map((element, index) => {
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
