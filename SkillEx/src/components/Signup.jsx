import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Signup() {
    const navigate = useNavigate();


    return (
        <div className="form-container">
            <h2 className="title">Sign up</h2>
            <hr />
            <form className="input-form">
                <input type="text" id={'displayName'} placeholder={'Display Name'} required />
                <input type="text" id={'username'} placeholder={'Username'} required />
                <input type="text" id={'email'} placeholder={'email@example.com'} required />
                <input type="date" id={'date'} required />
                <div>
                    <input type="radio" id={'male'} value={'male'} required />
                    <input type="radio" id={'female'} value={'female'} required />
                </div>
                <input type="password" id={'password'} placeholder={'Password'} required />
                <input type="password" id={'confirmPassword'} placeholder={'Confirm Password'} required />

            </form>
            <Button
                bgColor="--primary-color"
                text="Sign Up"
                textColor="--background-color"
                borderRadius="1rem"
                borderColor="--primary-color"
                onClick={() => {
                    navigate("/auth/signup");
                }}
            ></Button>
            <div className="have-account">Don't have an account?<span onClick={() => navigate('/auth/signup')}>Sign up</span></div>
        </div>
    )
}
