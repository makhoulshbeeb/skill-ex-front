import Navbar from "../components/common/Navbar"
import Display from "../components/home/Display"
import HeroSection from "../components/home/HeroSection"
import "../components/home/Home.css"

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="home-page">
                <HeroSection />
                <Display displayTitle={"Categories"} />

            </div>
        </>
    )
}
