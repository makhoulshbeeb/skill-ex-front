import { useGetCategoriesQuery } from "../api/CategoriesApi"
import Navbar from "../components/common/Navbar"
import Display from "../components/home/Display"
import HeroSection from "../components/home/HeroSection"
import "./styles/Home.css"

export default function Home() {
    const { data: categories, isLoading, isSuccess, isError, error } = useGetCategoriesQuery({}, { refetchOnMountOrArgChange: true });
    return (
        <>
            <div className="home-page">
                <Navbar />

                <HeroSection />
                {isSuccess && <Display displayTitle={"Categories"} items={categories} type={'Categories'} />}

            </div>
        </>
    )
}
