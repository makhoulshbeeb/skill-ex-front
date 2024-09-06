import "./styles/Explore.css"

import { useParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Searchbar from "../components/common/Searchbar";
import { useGetCategoriesQuery } from "../api/CategoriesApi";
import ExploreDisplay from "../components/explore/ExploreDisplay";

const types = {
    Categories: useGetCategoriesQuery,
}

export default function Explore() {
    const { type } = useParams();
    const { data: items, isLoading, isSuccess, isError, error } = types[type]();
    return (
        <>
            <img src="/SkillEx Background 4.png" alt="Explore Page Background" className="bg" />
            <div className="explore-page">
                <Navbar />
                <div className="explore-header">
                    <h1>{type}</h1>
                    <Searchbar placeholder={`Search ${type}`} />
                </div>
                <hr />
                {isSuccess && <ExploreDisplay items={items} type={type} />}
            </div>
        </>
    )
}
