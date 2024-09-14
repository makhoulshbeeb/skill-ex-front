import Searchbar from "../common/Searchbar";

import { replace, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function SearchSidebar({ setSearchParams, search, setSearch, categories, filters, isLoading }) {

    const navigate = useNavigate();
    console.log(filters);

    const handleChangeFilter = (category) => {
        const index = filters.indexOf(category.toString());
        if (index != -1) {
            filters.splice(index, 1);
            setSearchParams(prev => { prev.set('filters', filters); return prev }, { replace: true });
        } else {
            filters.push(category);
            setSearchParams(prev => { prev.set('filters', filters); return prev }, { replace: true });
        }
    };

    return (
        <div className="search-sidebar">
            <div className="search-sidebar-input">
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    fontSize={"1.5rem"}
                    color="var(--background-color)"
                    style={{ backgroundColor: "var(--primary-color)", padding: "0.5rem 0.6rem", borderRadius: "1.5rem", cursor: "pointer" }}
                    onClick={(e) => navigate(-1)}
                />
                <Searchbar placeholder={"Search..."} search={search} change={(e) => setSearch(e.target.value)} navigate={(e) => setSearchParams(prev => { prev.set("search", search); return prev; }, { replace: true })} />
            </div>
            <div className="category-list">
                {isLoading
                    ? <FontAwesomeIcon
                        icon={faSpinner}
                        fontSize={"1.2rem"}
                        color="var(--text-light)"
                        spinPulse />
                    : categories.map(category => {
                        return (
                            <label key={category} className="search-filter-box" >
                                <input
                                    type="checkbox"
                                    name={category}
                                    checked={filters.includes(category)}
                                    onChange={() => handleChangeFilter(category)}
                                />
                                <span className="checkmark"></span>
                                {category}
                            </label>)
                    })
                }
            </div>
        </div>
    )
}
