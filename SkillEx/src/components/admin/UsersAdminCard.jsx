import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faTrashAlt, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UsersAdminCard({ user, setUser, openReviews }) {
    return (
        <div className="users-admin-card">
            <div>
                <img src={user.picture} />
                <div className="users-admin-card-info">
                    <h3>{user.displayName}</h3>
                    <p>@{user.username}</p>
                    <p>id: ({user._id})</p>
                </div>
            </div>
            <div>
                <div className="svg" onClick={() => { setUser(user); openReviews(true); }}>
                    <FontAwesomeIcon icon={faStar} color="gold" />
                </div>
                <div className="svg" onClick={() => { setUser(user); openReviews(false); }}>
                    <FontAwesomeIcon icon={faUserAlt} color="var(--primary-color)" />
                </div>
                <div className="svg" onClick={() => { setUser(user) }}>
                    <FontAwesomeIcon icon={faTrashAlt} color="tomato" />
                </div>
            </div>
        </div>
    )
}
