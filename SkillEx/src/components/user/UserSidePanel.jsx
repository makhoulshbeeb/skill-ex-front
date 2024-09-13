import { useNavigate } from "react-router-dom";
import { useSocketContext } from "../../context/SocketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEnvelope, faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";
import { useDispatch } from "react-redux";
import { useCreateChatMutation } from "../../api/ChatsApi";
import { setReceiver } from "../../app/slices/receiverSlice";

export default function UserSidePanel({ user, me }) {
    const { onlineUsers } = useSocketContext();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [createChat] = useCreateChatMutation();

    const online = onlineUsers.includes(user ? user._id : "");

    const handleCreateChat = () => {
        dispatch(setReceiver({
            _id: user._id,
            displayName: user.displayName,
            username: user.username,
            email: user.email,
            picture: user.picture,
        }));
        createChat({ receiverId: user._id });
        navigate("/chats")
    };

    const handleEditProfile = () => {

    };

    return (
        <div className="user-side-panel">
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
                        icon={me ? faEdit : faEnvelope}
                        fontSize={"1.5rem"}
                        color="var(--background-color)"
                        style={{ backgroundColor: "var(--primary-color)", padding: "0.5rem 0.5rem", borderRadius: "100%", cursor: "pointer" }}
                        onClick={() => me ? handleEditProfile() : handleCreateChat()}
                    ></FontAwesomeIcon>
                </div>
                <h3>@{user.username}</h3>

            </div>
            <div className="user-page-rating">
                {[1, 2, 3, 4, 5].map((el) => {
                    if (user.avgRating - el >= 0) {
                        return (<FontAwesomeIcon icon={faStar} color="gold" fontSize={"1.25rem"} key={el} />)
                    } else if (user.avgRating - el <= -1) {
                        return (<FontAwesomeIcon icon={faStarOutline} color="gold" fontSize={"1.25rem"} key={el} />)
                    } else {
                        return (<FontAwesomeIcon icon={faStarHalfStroke} color="gold" fontSize={"1.25rem"} key={el} />)
                    }

                })}
                <span style={{ fontSize: "1.1rem" }}>&nbsp;&nbsp;{Math.round(user.avgRating * 10) / 10}</span>
            </div>
            <p>{user.bio}</p>
        </div>
    )
}
