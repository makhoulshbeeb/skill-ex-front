import "./styles/Auth.css"

import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";

import { useNavigate, useParams } from "react-router-dom";
import { useGetUserByTokenQuery } from "../api/UsersApi";


export default function Auth() {
    const { sign } = useParams()
    const navigate = useNavigate();
    const { data: user, isSuccess: loggedIn } = useGetUserByTokenQuery();
    if (loggedIn) {
        navigate('/');
    }
    return (
        <div className="auth-container" style={{ flexDirection: `${sign == 'login' ? 'row' : 'row-reverse'}` }}>
            <img className="auth-logo" src="/SkillEx Logo with Text.png"></img>
            <div className="auth-form">{sign == 'login' ? <Login ></Login> : <Signup></Signup>}</div>
            {sign == 'login'
                ? <img src="/SkillEx Background 2.png" alt="Login Background" className="bg" />
                : <img src="/SkillEx Background 3.png" alt="Signup Background" className="bg" />}
        </div>

    )
}
