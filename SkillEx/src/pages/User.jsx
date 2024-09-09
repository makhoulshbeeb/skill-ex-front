import "./styles/User.css"
import UserSidePanel from "../components/user/UserSidePanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function User() {
    const navigate = useNavigate();
    return (
        <>
            <img src="/SkillEx Background 1.png" alt="Explore Page Background" className="bg" />

            <div className="user-page">
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    fontSize={"1.2rem"}
                    color="var(--background-color)"
                    style={{ backgroundColor: "var(--primary-color)", padding: "0.5rem 0.6rem", borderRadius: "1.5rem", position: "absolute" }}
                    onClick={(e) => navigate(-1)}
                ></FontAwesomeIcon>

                <UserSidePanel />
            </div>
        </>
    )
}
