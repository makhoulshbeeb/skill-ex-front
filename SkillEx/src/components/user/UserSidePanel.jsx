import { useNavigate, useParams } from "react-router-dom";
import { useGetUserByUsernameQuery } from "../../api/UsersApi";
import { useSocketContext } from "../../context/SocketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMessage } from "@fortawesome/free-solid-svg-icons";

export default function UserSidePanel() {
    const { onlineUsers } = useSocketContext();
    const navigate = useNavigate();

    const { username } = useParams();
    const { data: user, isLoading, isSuccess, isError, error } = useGetUserByUsernameQuery({ username });

    const online = onlineUsers.includes(user ? user._id : "");
    return (
        <div className="user-side-panel">
            {isSuccess && <>
                <div className="user-page-picture" >
                    <div>
                        <img src={`${user.picture}`} alt={`${user.username}'s Picture`} />
                        <div style={{ backgroundColor: online ? 'limegreen' : 'var(--text-light)' }}></div>
                    </div>
                </div>
                <div className="user-page-contact">
                    <div>
                        <h2>{user.displayName}</h2>
                        <FontAwesomeIcon
                            icon={faEnvelope}
                            fontSize={"1.2rem"}
                            color="var(--background-color)"
                            style={{ backgroundColor: "var(--primary-color)", padding: "0.5rem 0.5rem", borderRadius: "100%" }}
                            onClick={(e) => navigate("/chats")}
                        ></FontAwesomeIcon>
                    </div>
                    <h3>@{user.username}</h3>

                </div>
                <br></br>
                <p>{user.bio}</p>
            </>}
        </div>
    )
}
