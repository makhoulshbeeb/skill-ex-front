import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faVideo } from '@fortawesome/free-solid-svg-icons';

export default function ChatHeader() {
    const receiver = useSelector(state => state.receiver);
    const navigate = useNavigate();
    return (
        <div className="chat-header">
            <div
                onClick={() => navigate(`app/user/${receiver.username}`, { relative: "path" })}>
                <img src={receiver.picture} alt={`${receiver.username}'s Picture`}
                />
                <h3 style={{ color: "var(--background-color)", fontWeight: "600" }}>{receiver.displayName}</h3>
            </div>
            <div>
                <FontAwesomeIcon
                    icon={faVideo}
                    fontSize={"1.8rem"}
                    color="var(--background-color)"
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    fontSize={"1.8rem"}
                    color="var(--background-color)"
                ></FontAwesomeIcon>
            </div>
        </div>
    )
}
