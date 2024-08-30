import "../components/auth/Auth.css"

import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";

import { useParams } from "react-router-dom";


export default function Auth() {
    const { sign } = useParams()
    return (
        <div className="auth-container" style={{ flexDirection: `${sign == 'login' ? 'row' : 'row-reverse'}` }}>
            <img src="/SkillEx Logo with Text.png"></img>
            <div className="auth-form">{sign == 'login' ? <Login ></Login> : <Signup></Signup>}</div>
            {sign == 'login'
                ? <img src="/SkillEx Background 2.png" alt="Login Background" className="bg" />
                : <img src="/SkillEx Background 3.png" alt="Signup Background" className="bg" />}
        </div>

    )
}
