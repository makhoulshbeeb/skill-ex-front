import "./styles/Explore.css"

import { useNavigate, useParams } from "react-router-dom";
import Searchbar from "../components/common/Searchbar";
import { useGetCategoriesQuery } from "../api/CategoriesApi";
import ExploreDisplay from "../components/explore/ExploreDisplay";
import { useState } from "react";
import { useGetUsersByMatchQuery } from "../api/UsersApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const types = {
    Categories: useGetCategoriesQuery,
    Matches: useGetUsersByMatchQuery
}

export default function Explore() {
    const { type } = useParams();
    const [itemSearch, setItemSearch] = useState('');
    const { data, isLoading, isSuccess, isError, error } = types[type]();
    const navigate = useNavigate();

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
                <div className="explore-header">
                    <div className="explore-title">
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            fontSize={"1.5rem"}
                            color="var(--background-color)"
                            style={{ backgroundColor: "var(--primary-color)", padding: "0.5rem 0.6rem", borderRadius: "1.5rem", cursor: "pointer" }}
                            onClick={(e) => navigate(-1)}
                        />
                        <h2 className="underline">{type}</h2>
                    </div>
                    <Searchbar placeholder={`Search ${type}`} change={(e) => setItemSearch(e.target.value)} />
                </div>
                {isSuccess && <ExploreDisplay items={items} type={type} />}
            </div>
        </>
    )
}
