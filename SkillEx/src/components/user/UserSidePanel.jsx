import { useParams } from "react-router-dom";
import { useGetUserByUsernameQuery } from "../../api/UsersApi"

export default function UserSidePanel() {
    const { username } = useParams();
    const { data: user, isLoading, isSuccess, isError, error } = useGetUserByUsernameQuery({ username });
    return (
        <div className="user-side-panel">
            <div className="user-panel-picture" >
                <img src={`${user.picture}`} alt={`${user.username}'s Picture`} />
            </div>
            <div>
                <h2>{user.displayName}</h2>
                <h3>@{user.username}</h3>
            </div>
            <p>{user.bio}</p>
        </div>
    )
}
