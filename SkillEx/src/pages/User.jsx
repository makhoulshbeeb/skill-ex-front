import "./styles/User.css"
import UserSidePanel from "../components/user/UserSidePanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import UserProfileReviews from "../components/user/UserProfileReviews";
import { useGetUserByUsernameQuery, usersApi } from "../api/UsersApi";
import UserProfileTeaching from "../components/user/UserProfileTeaching";

export default function User() {
    const navigate = useNavigate();
    const { username } = useParams();
    const { data: user, isLoading, isSuccess, isError, error } = useGetUserByUsernameQuery({ username });

    return (
        <>
            <img src="/SkillEx Background 1.png" alt="Explore Page Background" className="bg" />

            <div className="user-page">
                {isSuccess && <>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        fontSize={"1.2rem"}
                        color="var(--background-color)"
                        style={{ backgroundColor: "var(--primary-color)", padding: "0.5rem 0.6rem", borderRadius: "1.5rem", position: "absolute" }}
                        onClick={(e) => navigate(-1)}
                    ></FontAwesomeIcon>

                    <UserSidePanel user={user} />
                    <UserProfileReviews reviews={user.reviews} />
                    <div className="user-categories">
                        <UserProfileTeaching teach={user.teach} />
                    </div>
                </>}
            </div>
        </>
    )
}
