import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faTrashAlt, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UsersAdminCard({ user, setUser, openReviews, setEditPopup, setDeleteUserPopup }) {
    return (
        <div className="users-admin-card">
            <div className="users-admin-card-aligned">
                <img src={user.picture} />
                <div className="users-admin-card-info">
                    <h3>{user.displayName}</h3>
                    <p>@{user.username}</p>
                    <p>id: ({user._id})</p>
                </div>
            </div>
            <div className="users-admin-card-info">
                <div className="users-admin-card-aligned">
                    <div className="svg" onClick={() => { setUser(user); openReviews(true); }}>
                        <FontAwesomeIcon icon={faStar} color="gold" />
                    </div>
                    <div className="svg" onClick={() => { setUser(user); openReviews(false); }}>
                        <FontAwesomeIcon icon={faUserAlt} color="var(--primary-color)" />
                    </div>
                    <div className="svg" onClick={() => { setUser(user); setDeleteUserPopup(true) }}>
                        <FontAwesomeIcon icon={faTrashAlt} color="tomato" />
                    </div>
                </div>
                <select className="user-admin-role-select" onChange={() => { setUser(user); setEditPopup(true) }}>
                    <option value={"User"}>User </option>
                    <option value={"Admin"} selected={user.role == 'Admin'}>Admin</option>
                </select>
            </div>
        </div>
    )
}
