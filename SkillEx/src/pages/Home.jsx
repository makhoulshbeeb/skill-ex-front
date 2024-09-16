import { useGetCategoriesQuery } from "../api/CategoriesApi"
import { useGetUsersByMatchQuery } from "../api/UsersApi"
import Navbar from "../components/common/Navbar"
import Display from "../components/home/Display"
import HeroSection from "../components/home/HeroSection"
import "./styles/Home.css"

export default function Home() {
    const {
        data: categories,
        isLoading: isLoadingCategories,
        isSuccess: isSuccessCategories,
        isError: isErrorCategories,
        error: errorCategories
    } = useGetCategoriesQuery({}, { refetchOnMountOrArgChange: true });

    const {
        data: matches,
        isLoading: isLoadingMatches,
        isSuccess: isSuccessMatches,
        isError: isErrorMatches,
        error: errorMatches
    } = useGetUsersByMatchQuery({}, { refetchOnMountOrArgChange: true });

    return (
        <>
            <div className="home-page">
                <Navbar />

                <HeroSection />
                {isSuccessCategories && <Display displayTitle={"Categories"} items={categories} type={'Categories'} />}
                {isSuccessMatches && <Display displayTitle={"Matches"} items={matches} type={'Matches'} />}

                <footer>
                    <img src="/SkillEx Logo with Text.png" alt="SkillEx Logo Colored" />
                </footer>
            </div>
        </>
    )
}
