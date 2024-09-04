import Navbar from "../components/common/Navbar"
import HeroSection from "../components/home/HeroSection"
import "../components/home/Home.css"

export default function Home() {
    return (
        <>
            <Navbar />
            <div>
                <HeroSection />
            </div>
        </>
    )
}
