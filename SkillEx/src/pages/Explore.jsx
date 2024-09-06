import "./styles/Explore.css"

import { useParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Searchbar from "../components/common/Searchbar";

export default function Explore() {
    const { type } = useParams();
    return (
        <>
            <img src="/SkillEx Background 4.png" alt="Explore Page Background" className="bg" />
            <Navbar />
            <div className="explore-page">
                <div>
                    <div className="explore-header">
                        <h1>{type}</h1>
                        <Searchbar placeholder={`Search ${type}`} />
                    </div>
                    <hr />
                </div>

            </div>
        </>
    )
}
