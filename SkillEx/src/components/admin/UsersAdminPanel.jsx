

import { useState } from "react";
import { useDeleteUserAdminMutation, useGetUsersBySearchQuery, useUpdateRoleMutation } from "../../api/UsersApi";
import Searchbar from "../common/Searchbar";
import UsersAdminCard from "./UsersAdminCard";
import { useGetReviewsQuery } from "../../api/ReviewsApi";
import UserSidePanel from "../user/UserSidePanel";
import UserAdminReviews from "./UserAdminReviews";
import UserAdminProfile from "./UsersAdminProfile";

export default function UsersAdminPanel({ me }) {

    const [user, setUser] = useState(me);
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
                            return (<UsersAdminCard user={user} setUser={setUser} openReviews={setOpenReviews} />)
                        })
                    }
                </div>
            </div>
            {openReviews ?
                <UserAdminReviews reviews={userReviews} me={me._id == user._id} user={me} /> :
                <UserAdminProfile user={user} me={me._id == user._id} />}
        </div>
    )
}
