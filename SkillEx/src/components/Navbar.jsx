import Button from "./Button";
import Input from "./Searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


import "../styles/Navbar.css"

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    return (
        <header>
            <div className="left">
                <nav>
                    <img src={'/SkillEx Logo Light with Text.png'} className="logo" onClick={() => navigate('/')}></img>
                    <Link to={'/'}>Home</Link>
                    <Link to={'/discover'}>Discover</Link>
                    <Link to={'/community'}>Community</Link>
                    <Link to={'/about'}>About Us</Link>
                </nav>
            </div>
            <div className="right">
                <FontAwesomeIcon
                    icon={faSearch}
                    fontSize={"1.2rem"}
                    color="var(--background-light)"
                    onClick={() => navigate(`search/${search}`)}
                ></FontAwesomeIcon>
                <Input
                    name={"nav-search"}
                    id={"nav-search"}
                    placeholder={"Search . . ."}
                    change={(e) => { setSearch(e.target.value) }}
                ></Input>
                <Button
                    bgColor="--primary-light"
                    text="Log In"
                    textColor="--background-color"
                    borderRadius="1rem"
                    onClick={() => {
                        navigate("/auth/login");
                    }}
                ></Button>
                <Button
                    bgColor="--primary-color"
                    text="Sign Up"
                    textColor="--background-color"
                    borderRadius="1rem"
                    onClick={() => {
                        navigate("/auth/signup");
                    }}
                ></Button>
            </div>
        </header>
    )
}

