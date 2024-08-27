import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useSignupMutation } from "../api/AuthApi";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import toast from 'react-hot-toast';

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
            <h2 className="title">Sign up</h2>
            <hr />
            <form className="input-form" onSubmit={handleSubmit(signupHandler)}>
                <input type="text" id={'displayName'} placeholder={'Display Name'} {...register('displayName')} required />
                <input type="text" id={'username'} placeholder={'Username'} {...register('username')} required />
                <input type="text" id={'email'} placeholder={'email@example.com'} {...register('email')} required />
                <div>
                    <input type="radio" id={'male'} value={'male'} {...register('gender')} required />
                    <input type="radio" id={'female'} value={'female'} {...register('gender')} required />
                </div>
                <input type="password" id={'password'} placeholder={'Password'} {...register('password')} required />
                <input type="password" id={'confirmPassword'} placeholder={'Confirm Password'} {...register('confirmPassword')} required />
                {isLoading
                    ? <input type="submit" disabled value={<FontAwesomeIcon icon={faSpinner} />} />
                    : <input type="submit" value={"Sign up"} />}
            </form>
            <div className="have-account">Don't have an account?<span onClick={() => navigate('/auth/signup')}>Sign up</span></div>
        </div>
    )
}
