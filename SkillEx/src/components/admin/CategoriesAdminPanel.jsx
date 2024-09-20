import { useState } from "react";
import { useGetCategoriesQuery } from "../../api/CategoriesApi";
import Searchbar from "../common/Searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CategoreisAdminCard from "./CategoreisAdminCard";

export default function CategoriesAdminPanel() {
    const [categorySearch, setCategorySearch] = useState('');
    const { data, isLoading, isSuccess, isError, error } = useGetCategoriesQuery();

    var categories = data;

    if (categories) {
        categories = categories.filter(function (el) {
            return el.name.match(new RegExp(String.raw`.*${categorySearch.trim()}.*`, "i"));
        })
    }
    return (
        <div className="categories-admin-panel">
            <div className="categories-admin-header">
                <div className="categories-admin-title">
                    <h2 className="underline">Categories</h2>
                </div>
                <div className="add-categories-button">
                    <FontAwesomeIcon
                        icon={faPlus} />
                    Add Category
                </div>
                <Searchbar placeholder={`Search Categories`} change={(e) => setCategorySearch(e.target.value)} />
            </div>
            <div className="categories-admin-body">
                {isSuccess &&
                    categories.map((el) => {
                        return (<CategoreisAdminCard category={el} />)
                    })
                }
            </div>
        </div>
    )
}
