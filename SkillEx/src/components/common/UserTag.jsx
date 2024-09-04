import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./styles/UserTag.css"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

export default function UserTag({ user }) {
    return (
        <div className="user-tag">
            <FontAwesomeIcon
                icon={faChevronDown}
                color="var(--background-color)"
                fontSize={"0.75rem"}
            />
            <p>{user.displayName}</p>
            <img src={user.picture} alt={`${user.username}'s picture`} />
        </div>
    )
}
