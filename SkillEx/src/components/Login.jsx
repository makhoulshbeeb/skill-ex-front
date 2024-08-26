import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Login() {
    const navigate = useNavigate();

    return (
        <div className="form-container">
            <h2 className="title">Log in</h2>
            <hr />
            <form className="input-form">
                <input type="text" id={'email'} placeholder={'email@example.com'}></input>
                <input type="password" id={'password'} placeholder={'Password'}></input>

            </form>
            <a>Forgot password?</a>
            <Button
                bgColor="--primary-color"
                text="Log In"
                textColor="--background-color"
                borderRadius="1rem"
                borderColor="--primary-color"
                onClick={() => {
                    navigate("/auth/login");
                }}
            ></Button>
            <div className="have-account">Don't have an account?<span onClick={() => navigate('/auth/login')}>Log in</span></div>

        </div>
    )
}
