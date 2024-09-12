import "./styles/User.css"
import UserSidePanel from "../components/user/UserSidePanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import UserProfileReviews from "../components/user/UserProfileReviews";
import { useGetUserByTokenQuery, useGetUserByUsernameQuery, usersApi, useUpdateUserMutation } from "../api/UsersApi";
import UserProfileTeaching from "../components/user/UserProfileTeaching";
import UserProfileLearning from "../components/user/UserProfileLearning";
import { useEffect, useState } from "react";
import AddCategories from "../components/common/AddCategories";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

var isFalseCategories = false;
export default function User() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { username } = useParams();
    const { data: user, isLoading, isSuccess, isError, error } = useGetUserByUsernameQuery({ username }, { refetchOnMountOrArgChange: true });
    const { data: viewer, isSuccess: viewerVerified } = useGetUserByTokenQuery();

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
        isFalseCategories = false;
    }
    if (isSuccessCategories != isFalseCategories) {
        toast.dismiss("loading");
        toast.success("Categories Updated!", {
            id: "success"
        });
        isFalseCategories = true;
        dispatch(usersApi.util.invalidateTags(['Information']));
    }
    if (isErrorCategories != isFalseCategories) {
        toast.dismiss("loading");
        toast.error(error.data.error, {
            id: "error"
        });
        isFalseCategories = true;
    }

    useEffect(() => {
        setEditCategories(false);
    }, [resCategories])

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

                    <UserSidePanel user={user} me={viewerVerified && user.username == viewer.username} />
                    <UserProfileReviews reviews={user.reviews} me={viewerVerified && user.username == viewer.username} user={user} />
                    <div className="user-categories" style={{ position: viewerVerified && user.username == viewer.username ? 'relative' : '' }}>
                        {editCategories
                            ? <AddCategories title={''} learnInitialState={learnInitialState} teachInitialState={teachInitialState} submit={addcategories} />
                            : <>{viewerVerified && user.username == viewer.username && <FontAwesomeIcon
                                icon={faEdit}
                                fontSize={"1rem"}
                                color="var(--background-color)"
                                style={{ backgroundColor: "var(--primary-color)", padding: "0.5rem 0.5rem", borderRadius: "100%", cursor: "pointer" }}
                                onClick={() => { setEditCategories(true) }}
                            ></FontAwesomeIcon>}
                                <UserProfileTeaching user={user} me={viewerVerified && user.username == viewer.username} />
                                <UserProfileLearning learn={user.learn} me={viewerVerified && user.username == viewer.username} />
                            </>}</div>
                </>}
            </div>
        </>
    )
}
