import Login from "../components/Login";
import Signup from "../components/Signup";

import { useParams } from "react-router-dom";


export default function Auth() {
    const { sign } = useParams()
    return (
        sign == 'login' ? <Login ></Login> : <Signup></Signup>
    )
}
