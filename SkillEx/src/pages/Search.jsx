import "./styles/Search.css"

import { useSearchParams } from "react-router-dom";
import { useGetCategoriesQuery } from "../api/CategoriesApi";
import { useGetUsersBySearchQuery } from "../api/UsersApi";
import SearchSidebar from "../components/search/SearchSidebar";
import { useState } from "react";

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams({ search: '', filters: [] });
    const [search, setSearch] = useState(searchParams.get("search"));
    var filters = searchParams.get("filters")?.replace("+", " ").split(',') || [];

    const { data: searchResults,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersBySearchQuery({ search }, { refetchOnMountOrArgChange: true })

    const {
        data: categories,
        isLoading: isLoadingCategories,
        isSuccess: isSuccessCategories,
        isError: isErrorCategories,
        error: errorCategories
    } = useGetCategoriesQuery({}, { refetchOnMountOrArgChange: true });
    var categoriesList = [];
    if (isSuccessCategories) {
        categories.forEach(category => {
            categoriesList.push(category.name);
        });
    }
    return (
        <>
            <img src="/SkillEx Background 4.png" alt="Explore Page Background" className="bg" />
            <div className="search-page">
                <SearchSidebar setSearchParams={setSearchParams} search={search} setSearch={setSearch} categories={categoriesList} filters={filters} isLoading={isLoadingCategories} />
            </div>
        </>
    )
}
