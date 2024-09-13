import Searchbar from "../common/Searchbar";

import { replace, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function SearchSidebar({ setSearchParams, search, categories, filters, isLoading }) {

    const navigate = useNavigate();
    console.log(filters);

    const handleChangeFilter = (category) => {
        const index = filters.indexOf(category.toString());
        console.log(filters.includes(category));
        if (index != -1) {
            filters.splice(index, 1);
            setSearchParams(prev => { prev.set('filters', filters); return prev }, { replace: true });
        } else {
            filters.push(category);
            setSearchParams(prev => { prev.set('filters', filters); return prev }, { replace: true });
        }
    };

    return (
        <div className="chat-sidebar">
            <div className="chat-search">
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    fontSize={"1.5rem"}
                    color="var(--background-color)"
                    style={{ backgroundColor: "var(--primary-color)", padding: "0.5rem 0.6rem", borderRadius: "1.5rem", cursor: "pointer" }}
                    onClick={(e) => navigate(-1)}
                />
                <Searchbar placeholder={"Search..."} search={search} change={(e) => setSearchParams(prev => { prev.set("search", e.target.value); return prev; }, { replace: true })} />
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
                                    value={filters.includes(category)}
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
