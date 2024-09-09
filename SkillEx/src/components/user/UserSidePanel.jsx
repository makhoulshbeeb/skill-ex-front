import { useNavigate, useParams } from "react-router-dom";
import { useGetUserByUsernameQuery } from "../../api/UsersApi";
import { useSocketContext } from "../../context/SocketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMessage } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useCreateChatMutation } from "../../api/ChatsApi";
import { setReceiver } from "../../app/slices/receiverSlice";

export default function UserSidePanel() {
    const { onlineUsers } = useSocketContext();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [createChat] = useCreateChatMutation();

    const { username } = useParams();
    const { data: user, isLoading, isSuccess, isError, error } = useGetUserByUsernameQuery({ username });

    const online = onlineUsers.includes(user ? user._id : "");

    const handleCreateChat = () => {
        dispatch(setReceiver({
            _id: user._id,
            displayName: user.displayName,
            username: user.username,
            email: user.email,
            picture: user.picture,
        }));
        createChat({ receiver_id: user._id });
        navigate("/chats")
    };

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
                            onClick={(e) => handleCreateChat()}
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
