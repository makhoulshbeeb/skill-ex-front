import { useNavigate } from "react-router-dom";

export default function AuthForm({ sign }) {
    const variant = sign == "login";
    const navigate = useNavigate();
    return (
        <div className="form-container">
            <h2 className="title">{sign}</h2>
            <hr />
            <div className="input-form">

            </div>
            {variant && <a>Forgot password?</a>}
            <Button></Button>
            {
                variant
                    ? <div className="have-account">Don't have an account?<span onClick={() => navigate('/auth/login')}>Log in</span></div>
                    : <div className="have-account">Already have an account?<span onClick={() => navigate('/auth/signup')}>Sign up</span></div>
            }
        </div>
    )
}
