import "./styles/Search.css"

import { useSearchParams } from "react-router-dom";
import { useGetCategoriesQuery } from "../api/CategoriesApi";
import { useGetUsersBySearchQuery } from "../api/UsersApi";
import SearchSidebar from "../components/search/SearchSidebar";
import { useState } from "react";
import SearchResults from "../components/search/SearchResults";

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams({ search: '', filters: [] });
    const [search, setSearch] = useState(searchParams.get("search"));
    var filters = searchParams.get("filters")?.replace("+", " ").split(',') || [];

    const { data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersBySearchQuery({ search: searchParams.get("search") }, { refetchOnMountOrArgChange: true })

    var searchResults = [];
    if (isSuccess) {
        console.log(filters);
        searchResults = filters.length > 1 ? data.filter(el => {
            var categoryNames = [''];
            for (var i = 0; i < el.teach.length; i++) {
                categoryNames.push(el.teach[i].category.name);
            }
            console.log(categoryNames, filters)
            return filters.every(val => categoryNames.includes(val));
        }) : data;
    }
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
                <SearchResults results={searchResults} />
            </div>
        </>
    )
}
