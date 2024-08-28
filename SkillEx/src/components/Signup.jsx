import "../styles/Login.css"

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useSignupMutation } from "../api/AuthApi";

import toast from 'react-hot-toast';
import SubmitButton from "./SubmitButton";

export default function Signup() {
    const navigate = useNavigate();
    const form = useForm();

    const { register, handleSubmit } = form;

    const [signup, { data: res, isSuccess, isLoading, isError, error }] = useSignupMutation();

    if (isLoading) {
        toast.loading("Signing up...", {
            id: "loading"
        });
    }
    if (isError) {
        toast.dismiss("loading");
        toast.error(error.data.error, {
            id: "error"
        });
    }
    if (isSuccess) {
        toast.dismiss("loading");
        toast.success("Welcome to SkillEx!", {
            id: "success"
        });
        setTimeout(() => { navigate('/') }, 1000)
    }

    const signupHandler = async (data, e) => {
        e.preventDefault();
        signup(data);
    }

    return (
        <div className="form-container">
            <form className="input-form" onSubmit={handleSubmit(signupHandler)}>
                <h2 className="title">Sign up</h2>
                <div>
                    <label>Display Name</label>
                    <input type="text" id={'displayName'} placeholder={'Display Name'} {...register('displayName')} required />
                </div>
                <div>
                    <label>Username</label>
                    <input type="text" id={'username'} placeholder={'Username'} {...register('username')} required />
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" id={'email'} placeholder={'email@example.com'} {...register('email')} required />
                </div>
                {/* <div>
                    <input type="radio" id={'male'} value={'male'} {...register('gender')} required />
                    <input type="radio" id={'female'} value={'female'} {...register('gender')} required />
                </div> */}
                <div>
                    <label>Password</label>
                    <input type="password" id={'password'} placeholder={'Password'} {...register('password')} required />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type="password" id={'confirmPassword'} placeholder={'Confirm Password'} {...register('confirmPassword')} required />
                </div>
                <SubmitButton text={"Sign up"} isLoading={isLoading}></SubmitButton>
            </form>
            <div className="have-account">Don't have an account? <span onClick={() => navigate('/auth/login')}>Log in</span></div>
        </div>
    )
}
