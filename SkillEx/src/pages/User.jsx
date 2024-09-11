import "./styles/User.css"
import UserSidePanel from "../components/user/UserSidePanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import UserProfileReviews from "../components/user/UserProfileReviews";
import { useGetUserByTokenQuery, useGetUserByUsernameQuery, useUpdateUserMutation } from "../api/UsersApi";
import UserProfileTeaching from "../components/user/UserProfileTeaching";
import UserProfileLearning from "../components/user/UserProfileLearning";
import { useState } from "react";
import AddCategories from "../components/common/AddCategories";
import toast from "react-hot-toast";

export default function User() {
    const navigate = useNavigate();
    const { username } = useParams();
    const { data: user, isLoading, isSuccess, isError, error } = useGetUserByUsernameQuery({ username }, { refetchOnMountOrArgChange: true });
    const { data: viewer } = useGetUserByTokenQuery();

    const [editCategories, setEditCategories] = useState(false);

    const learnInitialState = [];
    const teachInitialState = [];

    if (isSuccess) {
        user.learn.forEach(el => learnInitialState.push(el.category));
        user.teach.forEach(el => teachInitialState.push(el.category));
    }

    const [addcategories, {
        data: resCategories,
        isSuccess: isSuccessCategories,
        isLoading: isLoadingCategories,
        isError: isErrorCategories,
        error: errorCategories
    }] = useUpdateUserMutation();

    if (isLoadingCategories) {
        toast.loading("Loading...", {
            id: "loading"
        });
    }
    if (isSuccessCategories) {
        toast.dismiss("loading");
        toast.success("Categories Updated!", {
            id: "success"
        });
        setTimeout(() => { location.reload() }, 500)
    }
    if (isErrorCategories) {
        toast.dismiss("loading");
        toast.error(error.data.error, {
            id: "error"
        });
    }

    return (
        <>
            <img src="/SkillEx Background 1.png" alt="Explore Page Background" className="bg" />

            <div className="user-page">
                {isSuccess && <>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        fontSize={"1.5rem"}
                        color="var(--background-color)"
                        style={{ backgroundColor: "var(--primary-color)", padding: "0.5rem 0.6rem", borderRadius: "1.5rem", position: "absolute", cursor: "pointer" }}
                        onClick={(e) => navigate(-1)}
                    ></FontAwesomeIcon>

                    <UserSidePanel user={user} me={user.username == viewer.username} />
                    <UserProfileReviews reviews={user.reviews} me={user.username == viewer.username} />
                    <div className="user-categories">
                        {editCategories
                            ? <AddCategories title={''} learnInitialState={learnInitialState} teachInitialState={teachInitialState} submit={addcategories} />
                            : <>{user.username == viewer.username && <FontAwesomeIcon
                                icon={faEdit}
                                fontSize={"1rem"}
                                color="var(--background-color)"
                                style={{ backgroundColor: "var(--primary-color)", padding: "0.5rem 0.5rem", borderRadius: "100%", cursor: "pointer" }}
                                onClick={() => { setEditCategories(true) }}
                            ></FontAwesomeIcon>}
                                <UserProfileTeaching teach={user.teach} me={user.username == username} />
                                <UserProfileLearning learn={user.learn} me={user.username == username} />
                            </>}</div>
                </>}
            </div>
        </>
    )
}
