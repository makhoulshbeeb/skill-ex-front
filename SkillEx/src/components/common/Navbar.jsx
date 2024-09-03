import Button from "./Button";
import Seachbar from "./Searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


import "./styles/Navbar.css"

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Navbar() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const user = useSelector(state => state.user);
    return (
        <header>
            <div className="left">
                <nav>
                    <img src={'/SkillEx Logo Light with Text.png'} className="logo" onClick={() => navigate('/')}></img>
                    <Link to={'/app/'}>Home</Link>
                    <Link to={'/app/discover'}>Discover</Link>
                    <Link to={'/app/community'}>Community</Link>
                    <Link to={'/app/about'}>About Us</Link>
                </nav>
            </div>
            <div className="right">
                <Seachbar
                    placeholder={"Search . . ."}
                    change={(e) => { setSearch(e.target.value) }}
                    navigate={() => navigate(`/app/search/${search}`)}
                ></Seachbar>
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

