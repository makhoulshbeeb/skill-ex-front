import { faPaperPlane, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useSendMessageMutation } from "../../api/MessagesApi";
import { useGetUserByTokenQuery } from "../../api/UsersApi";
import { current } from "@reduxjs/toolkit";

export default function ChatInput({ messages, setMessages }) {
    const [sendMessage, { data: newMessage, isLoading, isSuccess, isError, error }] = useSendMessageMutation();
    const ref = useRef();
    const receiver = useSelector(state => state.receiver);
    const { data: user } = useGetUserByTokenQuery();
    return (
        <div className="chat-input">
            <input
                type="text"
                placeholder={"Type here..."}
                id='input'
                ref={ref}
                autoComplete="off"
            />
            <div
                style={{ backgroundColor: "var(--primary-color)", padding: "0.6rem 0.7rem", borderRadius: "2rem", cursor: "pointer" }}
                onClick={async () => {
                    if (ref.current.value.trim() != '') {
                        const newMessage = { receiverId: receiver._id, senderId: user._id, message: ref.current.value.trim(), createdAt: new Date() }
                        console.log([...messages, newMessage]);
                        setMessages([...messages, newMessage]);
                        sendMessage(newMessage);
                        ref.current.value = '';
                    }

                }}>
                <FontAwesomeIcon
                    icon={faPaperPlane}
                    color="var(--background-color)"
                    fontSize={"1.6rem"}
                />
            </div>
        </div>
    );
}