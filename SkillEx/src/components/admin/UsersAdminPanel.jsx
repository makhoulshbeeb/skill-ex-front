

import { useState } from "react";
import { useGetUsersBySearchQuery } from "../../api/UsersApi";
import Searchbar from "../common/Searchbar";
import UsersAdminCard from "./UsersAdminCard";

export default function UsersAdminPanel() {

    const [userSearch, setUserSearch] = useState('');
    const { data, isLoading, isSuccess, isError, error } = useGetUsersBySearchQuery({ search: '' }, { refetchOnMountOrArgChange: true });

    var users = data;

    if (users) {
        users = users.filter(function (el) {
            return el.displayName.match(new RegExp(String.raw`.*${userSearch.trim()}.*`, "i"));
        })
    }
    return (
        <div className="users-admin-panel">
            <div className="users-admin-header">
                <div className="users-admin-title">
                    <h2 className="underline">Users</h2>
                </div>
                <Searchbar placeholder={`Search Users`} change={(e) => setUserSearch(e.target.value)} />
            </div>
            <div className="users-admin-body">
                {
                    users.map(user => {
                        <UsersAdminCard user={user} />
                    })
                }
            </div>
        </div>
    )
}
