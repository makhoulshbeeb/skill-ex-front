import "./styles/UserTag.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp, faInbox, faLock, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons"
import DropDownMenu from "./DropDownMenu"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../api/AuthApi"
import { useGetAdminByTokenQuery } from "../../api/UsersApi"


export default function UserTag({ user }) {
    const [open, setOpen] = useState(false);

    const { isSuccess: isAdmin } = useGetAdminByTokenQuery();

    const navigate = useNavigate();
    const [logout] = useLogoutMutation();
    const logoutHandler = () => {
        logout();
        navigate("/");
        location.reload();
    };

    const dropDownMenuList = [
        {
            title: "Inbox",
            action: () => navigate("/chats"),
            icon:
                <FontAwesomeIcon
                    icon={faInbox}
                    fontSize={"1.4rem"}
                    style={{ padding: '0.25rem', cursor: 'pointer' }}

                />
        },
        {
            title: "View Profile",
            action: () => navigate(`/user/${user.username}`),
            icon:
                <FontAwesomeIcon
                    icon={faUser}
                    fontSize={"1.4rem"}
                    style={{ padding: '0.25rem', cursor: 'pointer' }}
                />
        },
        {
            title: "Log out",
            action: logoutHandler,
            icon:
                <FontAwesomeIcon
                    icon={faRightFromBracket}
                    fontSize={"1.4rem"}
                    style={{ padding: '0.25rem', cursor: 'pointer' }}
                />
        },
    ];

    if (isAdmin) {
        dropDownMenuList.push({
            title: "Admin",
            action: () => navigate(`/admin`),
            icon:
                <FontAwesomeIcon
                    icon={faLock}
                    style={{ padding: '0.25rem', cursor: 'pointer' }}
                />
        })
    }

    return (
        <div className="user-tag"
            tabIndex={0}
            onClick={() => setOpen(!open)}
            onBlur={() => setOpen(false)}>
            <FontAwesomeIcon
                icon={open ? faChevronUp : faChevronDown}
                color="var(--background-color)"
                fontSize={"0.8rem"}
            />
            <p>{user.displayName.split(' ')[0]}</p>
            <img src={user.picture} alt={`${user.username}'s picture`} />
            <DropDownMenu
                menuItems={dropDownMenuList}
                open={open} />
        </div>
    )
}
