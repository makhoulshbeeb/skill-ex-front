import Button from "./Button";
import Input from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


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
                </nav>
            </div>
            <div className="right">
                <FontAwesomeIcon icon={faSearch} fontSize={"1.2rem"} color="var(--background-light)"></FontAwesomeIcon>
                <Input name={"nav-search"} id={"nav-search"} placeholder={"Search . . ."}></Input>
                <Button
                    bgColor="--primary-light"
                    text="Log In"
                    textColor="--background-color"
                    borderRadius="2rem"
                    onClick={() => {
                        navigate("/form/login");
                    }}
                ></Button>
                <Button
                    bgColor="--primary-color"
                    text="Sign Up"
                    textColor="--background-color"
                    borderRadius="2rem"
                    onClick={() => {
                        navigate("/form/signup");
                    }}
                ></Button>
            </div>
        </header>
    )
}

