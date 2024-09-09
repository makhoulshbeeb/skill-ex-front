import "./styles/UserTag.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import DropDownMenu from "./DropDownMenu"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../api/AuthApi"


export default function UserTag({ user }) {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const [logout] = useLogoutMutation();
    const logoutHandler = () => {
        logout();
        navigate("/");
        location.reload();
    };
    const viewProfileHandler = () => {
        navigate(`/user/${user.username}`)
    };
    return (
        <div className="user-tag" onClick={() => setOpen(!open)}>
            <FontAwesomeIcon
                icon={faChevronDown}
                color="var(--background-color)"
                fontSize={"0.75rem"}
            />
            <p>{user.displayName.split(' ')[0]}</p>
            <img src={user.picture} alt={`${user.username}'s picture`} />
            <DropDownMenu
                menuItems={[{ title: "View Profile", action: viewProfileHandler }, { title: "Log out", action: logoutHandler }]}
                open={open} />
        </div>
    )
}
