import "./styles/Explore.css"

import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Searchbar from "../components/common/Searchbar";
import { useGetCategoriesQuery } from "../api/CategoriesApi";
import ExploreDisplay from "../components/explore/ExploreDisplay";
import { useState } from "react";
import { useGetUsersByMatchQuery } from "../api/UsersApi";

const types = {
    Categories: useGetCategoriesQuery,
    Matches: useGetUsersByMatchQuery
}

export default function Explore() {
    const { type } = useParams();
    const [itemSearch, setItemSearch] = useState('');
    const { data, isLoading, isSuccess, isError, error } = types[type]();

    var items = data;

    if (items) {
        items = items.filter(function (el) {
            if (type == "Categories") {
                return el.name.match(new RegExp(String.raw`.*${itemSearch.trim()}.*`, "i"));
            }
            if (type == "Matches") {
                return el.displayName.match(new RegExp(String.raw`.*${itemSearch.trim()}.*`, "i"));
            }
        })
    }
    return (
        <>
            <img src="/SkillEx Background 4.png" alt="Explore Page Background" className="bg" />
            <div className="explore-page">
                <Navbar />
                <div className="explore-header">
                    <h2>{type}</h2>
                    <Searchbar placeholder={`Search ${type}`} change={(e) => setItemSearch(e.target.value)} />
                </div>
                <hr />
                {isSuccess && <ExploreDisplay items={items} type={type} />}
            </div>
        </>
    )
}
