import { useSearchParams } from "react-router-dom";
import { useGetCategoriesQuery } from "../api/CategoriesApi";
import { useGetUsersBySearchQuery } from "../api/UsersApi";

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams({ search: '', filters: [] });
    const { data: searchResults,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersBySearchQuery({ search: searchParams.get("search") }, { refetchOnMountOrArgChange: true })

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
            categoriesList.push(categories.name);
        });
    }
    return (
        <div className="search-page"></div>
    )
}
