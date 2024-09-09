import { useParams } from "react-router-dom";
import { useGetUserByUsernameQuery } from "../../api/UsersApi";
import { useSocketContext } from "../../context/SocketContext";

export default function UserSidePanel() {
    const { onlineUsers } = useSocketContext();

    const { username } = useParams();
    const { data: user, isLoading, isSuccess, isError, error } = useGetUserByUsernameQuery({ username });

    const online = onlineUsers.includes(user._id);
    return (
        <div className="user-side-panel">
            {isSuccess && <>
                <div className="user-page-picture" >
                    <div>
                        <img src={`${user.picture}`} alt={`${user.username}'s Picture`} />
                        <div style={{ backgroundColor: online ? 'limegreen' : 'var(--text-light)' }}></div>
                    </div>
                </div>
                <div>
                    <h2>{user.displayName}</h2>
                    <h3>@{user.username}</h3>
                </div>
                <br></br>
                <p>{user.bio}</p>
            </>}
        </div>
    )
}
