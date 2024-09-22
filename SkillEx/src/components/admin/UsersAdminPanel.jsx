

import { useState } from "react";
import { useDeleteUserAdminMutation, useGetUsersBySearchQuery, usersApi, useUpdateRoleMutation } from "../../api/UsersApi";
import Searchbar from "../common/Searchbar";
import UsersAdminCard from "./UsersAdminCard";
import { useDeleteReviewAdminMutation, useGetReviewsQuery } from "../../api/ReviewsApi";
import UserAdminReviews from "./UserAdminReviews";
import UserAdminProfile from "./UsersAdminProfile";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";


var isFalseDelete = false;
var isFalseEdit = false;
var isFalseDeleteReview = false;
export default function UsersAdminPanel({ me }) {

    const dispatch = useDispatch();
    const [user, setUser] = useState(me);
    const [review, setReview] = useState();
    const [deletePopup, setDeletePopup] = useState(false);
    const [deleteUserPopup, setDeleteUserPopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [openReviews, setOpenReviews] = useState(false);

    const { data: userReviews, isLoading: isLoadingReviews, isSuccess: isSuccessReviews } = useGetReviewsQuery({ receiverId: user._id }, { refetchOnMountOrArgChange: true });

    const [userSearch, setUserSearch] = useState('');
    const { data, isLoading, isSuccess, isError, error } = useGetUsersBySearchQuery({ search: '' }, { refetchOnMountOrArgChange: true });

    var users = data;

    console.log(users);

    if (users) {
        users = users.filter(function (el) {
            return el.displayName.match(new RegExp(String.raw`.*${userSearch.trim()}.*`, "i"));
        })
    }

    const [editUser, { data: editedUser, isLoading: editLoading, isSuccess: editSuccess, isError: editError, error: editErrorMessage }] = useUpdateRoleMutation();
    const [deleteUser, { data: deletedUser, isLoading: deleteLoading, isSuccess: deleteSuccess, isError: deleteError, error: deleteErrorMessage }] = useDeleteUserAdminMutation();
    const [deleteReview, { data: deletedReview, isLoading: deleteReviewLoading, isSuccess: deleteReviewSuccess, isError: deleteReviewError, error: deleteReviewErrorMessage }] = useDeleteReviewAdminMutation();

    if (editLoading) {
        toast.loading("Loading...", {
            id: "loading"
        });
        isFalseEdit = false;
    }
    if (editSuccess && editSuccess != isFalseEdit) {
        toast.dismiss("loading");
        toast.success("User Editd!", {
            id: "success"
        });
        isFalseEdit = true;
        dispatch(usersApi.util.invalidateTags(['Information']));
    }
    if (editError && editError != isFalseEdit) {
        toast.dismiss("loading");
        toast.error(editErrorMessage.data.error, {
            id: "error"
        });
        isFalseEdit = true;
    }

    if (deleteLoading) {
        toast.loading("Loading...", {
            id: "loading"
        });
        isFalseDelete = false;
    }
    if (deleteSuccess && deleteSuccess != isFalseDelete) {
        toast.dismiss("loading");
        toast.success("User Deleted!", {
            id: "success"
        });
        isFalseDelete = true;
        dispatch(usersApi.util.invalidateTags(['Information']));
    }
    if (deleteError && deleteError != isFalseDelete) {
        toast.dismiss("loading");
        toast.error(deleteErrorMessage.data.error, {
            id: "error"
        });
        isFalseDelete = true;
    }

    if (deleteReviewLoading) {
        toast.loading("Loading...", {
            id: "loading"
        });
        isFalseDeleteReview = false;
    }
    if (deleteReviewSuccess && deleteReviewSuccess != isFalseDeleteReview) {
        toast.dismiss("loading");
        toast.success("Review Deleted!", {
            id: "success"
        });
        isFalseDeleteReview = true;
        dispatch(usersApi.util.invalidateTags(['Information']));
    }
    if (deleteReviewError && deleteReviewError != isFalseDeleteReview) {
        toast.dismiss("loading");
        toast.error(deleteReviewErrorMessage.data.error, {
            id: "error"
        });
        isFalseDeleteReview = true;
    }

    return (
        <div className="users-admin-panel">
            <div style={{ width: '60%' }}>
                <div className="users-admin-header">
                    <div className="users-admin-title">
                        <h2 className="underline">Users</h2>
                    </div>
                    <Searchbar placeholder={`Search Users`} change={(e) => setUserSearch(e.target.value)} />
                </div>
                <div className="users-admin-body">
                    {isSuccess &&
                        users.map(user => {
                            return (<UsersAdminCard user={user} setUser={setUser} openReviews={setOpenReviews} setEditPopup={setEditPopup} setDeleteUserPopup={setDeleteUserPopup} />)
                        })
                    }
                </div>
            </div>
            {openReviews ?
                <UserAdminReviews reviews={userReviews} me={me._id == user._id} user={me} setDeletePopup={setDeletePopup} setReview={setReview} /> :
                <UserAdminProfile user={user} me={me._id == user._id} />}
            <dialog open={deletePopup} >
                <div className="add-endorsement">
                    <p>Are you sure you want to delete {(review && review.reviewerId?.displayName) ?? 'Deleted User'}'s review (id: {review && review._id})?</p>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <div className='add-reviews-button' style={{ backgroundColor: "var(--background-light)", color: "var(--primary-color)", scale: "0.9" }} onClick={() => setDeletePopup(false)}>Cancel</div>
                        <div className='add-reviews-button' style={{ scale: "0.9" }}
                            onClick={() => { deleteReview({ id: review._id }); setDeletePopup(false); }}
                        >Submit
                        </div>
                    </div>
                </div>
            </dialog>
            <dialog open={editPopup} >
                <div className="add-endorsement">
                    <p>{user.role == 'User'
                        ? `Would you like to make ${user.displayName} into an Admin?`
                        : `Are you sure you want to remove ${user.displayName} from the Admin role?`}</p>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <div className='add-reviews-button' style={{ backgroundColor: "var(--background-light)", color: "var(--primary-color)", scale: "0.9" }} onClick={() => setEditPopup(false)}>Cancel</div>
                        <div className='add-reviews-button' style={{ scale: "0.9" }}
                            onClick={() => { editUser({ id: user._id, role: user.role == 'User' ? 'Admin' : 'User' }); setEditPopup(false); }}
                        >Submit
                        </div>
                    </div>
                </div>
            </dialog>
            <dialog open={deleteUserPopup} >
                <div className="add-endorsement">
                    <p>Are you sure you want to delete {user.displayName}?</p>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <div className='add-reviews-button' style={{ backgroundColor: "var(--background-light)", color: "var(--primary-color)", scale: "0.9" }} onClick={() => setDeleteUserPopup(false)}>Cancel</div>
                        <div className='add-reviews-button' style={{ scale: "0.9" }}
                            onClick={() => { deleteUser({ id: user._id }); setDeleteUserPopup(false); }}
                        >Submit
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    )
}
