import { useNavigate } from "react-router-dom";
import { useSocketContext } from "../../context/SocketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEnvelope, faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";
import { useDispatch } from "react-redux";
import { useCreateChatMutation } from "../../api/ChatsApi";
import { setReceiver } from "../../app/slices/receiverSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { usersApi, useUpdateUserMutation } from "../../api/UsersApi";
import toast from "react-hot-toast";

var isFalse = false;
export default function UserSidePanel({ user, me }) {
    const { onlineUsers } = useSocketContext();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [editProfile, setEditProfile] = useState(false);
    const [createChat] = useCreateChatMutation();

    const [updateUser, { data: updatedProfile, isLoading, isSuccess, isError, error }] = useUpdateUserMutation();

    const form = useForm();

    const { register, handleSubmit } = form;

    const [openCategoriesTab, setOpenCategoriesTab] = useState(false);

    const online = onlineUsers.includes(user ? user._id : "");

    const handleCreateChat = () => {
        dispatch(setReceiver({
            _id: user._id,
            displayName: user.displayName,
            username: user.username,
            email: user.email,
            picture: user.picture,
        }));
        createChat({ receiverId: user._id });
        navigate("/chats")
    };

    const handleEditProfile = async (data, e) => {
        e.preventDefault();
        updateUser(data);
        setTimeout(() => setEditProfile(false), 500);
    };

    if (isLoading) {
        toast.dismiss(error);
        toast.loading("Loading...", {
            id: "loading"
        });
        isFalse = false;
    }
    if (isSuccess && isSuccess != isFalse) {
        toast.dismiss("loading");
        toast.success("Profile updated!", {
            id: "success"
        });
        dispatch(usersApi.util.invalidateTags(['Information']));
        isFalse = true;
        setTimeout(() => { setAddReview(false) }, 500);
    }
    if (isError) {
        toast.dismiss("loading");
        toast.error(error.data.error, {
            id: "error"
        });
    }

    return (
        <>
            <div className="user-side-panel">
                <div className="user-page-picture" >
                    <div>
                        <img src={`${user.picture}`} alt={`${user.username}'s Picture`} />
                        <div style={{ backgroundColor: online ? 'limegreen' : 'var(--text-light)' }}></div>
                    </div>
                </div>
                <div className="user-page-contact">
                    <div>
                        <h2>{user.displayName}</h2>
                        <FontAwesomeIcon
                            icon={me ? faEdit : faEnvelope}
                            fontSize={"1.5rem"}
                            color="var(--background-color)"
                            style={{ backgroundColor: "var(--primary-color)", padding: "0.5rem 0.5rem", borderRadius: "100%", cursor: "pointer" }}
                            onClick={() => me ? setEditProfile(true) : handleCreateChat()}
                        ></FontAwesomeIcon>
                    </div>
                    <h3>@{user.username}</h3>

                </div>
                <div className="user-page-rating">
                    {[1, 2, 3, 4, 5].map((el) => {
                        if (user.avgRating - el >= 0) {
                            return (<FontAwesomeIcon icon={faStar} color="gold" fontSize={"1.25rem"} key={el} />)
                        } else if (user.avgRating - el <= -1) {
                            return (<FontAwesomeIcon icon={faStarOutline} color="gold" fontSize={"1.25rem"} key={el} />)
                        } else {
                            return (<FontAwesomeIcon icon={faStarHalfStroke} color="gold" fontSize={"1.25rem"} key={el} />)
                        }

                    })}
                    <span style={{ fontSize: "1.1rem" }}>&nbsp;&nbsp;{Math.round(user.avgRating * 10) / 10}</span>
                </div>
                <p>{user.bio}</p>
            </div>
            <dialog open={editProfile}>
                <form className='edit-profile-panel' onSubmit={handleSubmit(handleEditProfile)}>
                    <div className='edit-profile-tag'>
                        <img src={user.picture} />
                        <div style={{ scale: "0.9" }}>
                            <label >
                                Display Name
                                <input type="text" placeholder="Display Name" {...register('displayName')} defaultValue={user.displayName} required />
                            </label>
                            <br></br>
                            <label>
                                Username
                                <input type="text" placeholder="Username" {...register('username')} defaultValue={user.username} required />
                            </label>
                        </div>
                    </div>
                    <label>
                        Bio
                        <textarea placeholder='Tell us about yourself...' {...register('bio')} defaultValue={user.bio}></textarea>
                    </label>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <div className='add-reviews-button' style={{ backgroundColor: "var(--background-light)", color: "var(--primary-color)", scale: "0.9" }} onClick={() => setEditProfile(false)}>Cancel</div>
                        <button style={{ all: 'unset' }}><div className='add-reviews-button' style={{ scale: "0.9" }}
                        >Submit
                        </div></button>
                    </div>
                </form></dialog>
        </>
    )
}
