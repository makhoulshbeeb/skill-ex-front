import "./styles/Explore.css"

import { useParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Searchbar from "../components/common/Searchbar";
import { useGetCategoriesQuery } from "../api/CategoriesApi";

const types = {
    Categories: useGetCategoriesQuery,
}

export default function Explore() {
    const { type } = useParams();
    const { data: items, isLoading, isSuccess, isError, error } = types[type]();
    console.log(items)
    return (
        <>
            <img src="/SkillEx Background 4.png" alt="Explore Page Background" className="bg" />
            <Navbar />
            <div className="explore-page">
                <div>
                    <div className="explore-header">
                        <h1>{type}</h1>
                        <Searchbar placeholder={`Search ${type}`} />
                    </div>
                    <hr />
                </div>

            </div>
        </>
    )
}
