import AuthForm from "../components/AuthForm";
import { useParams } from "react-router-dom";

export default function Auth() {
    const { sign } = useParams()
    return (
        <AuthForm sign={sign} ></AuthForm>
    )
}
