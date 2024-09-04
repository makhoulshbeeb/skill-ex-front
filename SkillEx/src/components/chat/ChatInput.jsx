import { faPaperPlane, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useSendMessageMutation } from "../../api/MessagesApi";

export default function ChatInput() {
    const [sendMessage, { data: newMessage, isLoading, isSuccess, isError, error }] = useSendMessageMutation();
    const ref = useRef();
    const receiver = useSelector(state => state.receiver);
    return (
        <div className="chat-input">
            <input
                type="text"
                placeholder={"Type here..."}
                id='input'
                ref={ref}
                autoComplete="off"
            />
            <div style={{ backgroundColor: "var(--primary-color)", padding: "0.6rem 0.7rem", borderRadius: "2rem", cursor: "pointer" }}>
                <FontAwesomeIcon
                    icon={faPaperPlane}
                    color="var(--background-color)"
                    fontSize={"1.2rem"}
                    onClick={async () => {
                        sendMessage({ receiverId: receiver._id, message: ref.current.value });
                        ref.current.value = '';
                    }}
                />
            </div>
        </div>
    );
}