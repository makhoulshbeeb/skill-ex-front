import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useSendMessageMutation } from "../../api/MessagesApi";

export default function ChatInput({ chat_id }) {
    const [sendMessage] = useSendMessageMutation();
    const ref = useRef();
    const user = useSelector(state => state.user);
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

            <FontAwesomeIcon
                icon={faPaperPlane}
                color="var(--background-color)"
                fontSize={"1.2rem"}
                style={{ backgroundColor: "var(--primary-color)", padding: "0.5rem 0.6rem", borderRadius: "1.5rem" }}
                onClick={async () => {
                    sendMessage({ receiverId: receiver._id, message: ref.current.value });
                    ref.current.value = '';
                }}
            />
        </div>
    );
}