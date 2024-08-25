import "./styles/Navbar.css"
import { Link } from "react-router-dom";

export default function Navbar() {
    const logo = '/SkillEx Logo Light with Text.png'
    return (
        <header>
            <div className="left">
                <nav>
                    <img src={logo} className="logo"></img>
                    <Link>Home</Link>
                    <Link>Discover</Link>
                    <Link>Community</Link>
                    <Link>About Us</Link>
                    <Link>Contact Us</Link>
                </nav>
            </div>
            <div className="right">

            </div>
        </header>
    )
}

