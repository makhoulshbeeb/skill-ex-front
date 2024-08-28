import "../styles/Auth.css"

import Login from "../components/Login";
import Signup from "../components/Signup";

import { useParams } from "react-router-dom";


export default function Auth() {
    const { sign } = useParams()
    return (
        <div className="auth-container">
            <img src="/SkillEx Logo with Text.png"></img>
            <div className="auth-form">{sign == 'login' ? <Login ></Login> : <Signup></Signup>}</div>
        </div>

    )
}
