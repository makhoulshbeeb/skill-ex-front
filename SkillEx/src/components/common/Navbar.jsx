import Button from "./Button";
import Seachbar from "./Searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox, faSearch } from "@fortawesome/free-solid-svg-icons";


import "./styles/Navbar.css"

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetUserByTokenQuery } from "../../api/UsersApi";
import UserTag from "./UserTag";

export default function Navbar() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const { data: user, isSuccess } = useGetUserByTokenQuery({}, { refetchOnMountOrArgChange: true });
    return (
        <header>
            <div className="left">
                <nav>
                    <img src={'/SkillEx Logo Light with Text.png'} className="logo" onClick={() => navigate('/')}></img>
                    <Link to={'/'}>Home</Link>
                    <Link to={'/explore/Matches'}>Matches</Link>
                    <Link to={'/explore/Categories'}>Categories</Link>
                    {/* <Link to={'/about'}>About Us</Link> */}
                </nav>
            </div>
            <div className="right">
                <Seachbar
                    placeholder={"Search . . ."}
                    change={(e) => { setSearch(e.target.value) }}
                    navigate={() => navigate(`/search/?search=${search}&filters=`)}
                ></Seachbar>
                {isSuccess
                    ? ""
                    : <Button
                        bgColor="--primary-light"
                        text="Log In"
                        textColor="--background-color"
                        borderRadius="1.5rem"
                        onClick={() => {
                            navigate("/auth/login");
                        }}
                    ></Button>}
                {isSuccess
                    ? <UserTag user={user} />
                    : <Button
                        bgColor="--primary-color"
                        text="Sign Up"
                        textColor="--background-color"
                        borderRadius="1.5rem"
                        onClick={() => {
                            navigate("/auth/signup");
                        }}
                    ></Button>}
            </div>
        </header>
    )
}

