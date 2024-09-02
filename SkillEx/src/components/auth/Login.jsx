import "./Auth.css"

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../api/AuthApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../app/slices/userSlice";

import toast from 'react-hot-toast';
import SubmitButton from "../common/SubmitButton";


export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const form = useForm();

    const { register, handleSubmit } = form;

    const [login, { data: res, isSuccess, isLoading, isError, error }] = useLoginMutation();

    if (isLoading) {
        toast.dismiss(error);
        toast.loading("Logging in...", {
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
        toast.success("Welcome back!", {
            id: "success"
        });
        dispatch(setUser(res));
        setTimeout(() => { navigate('/app') }, 1000)
    }

    const loginHandler = async (data, e) => {
        e.preventDefault();
        login(data);
    }

    return (
        <div className="form-container" onSubmit={handleSubmit(loginHandler)}>

            <form className="input-form">
                <h2 className="title">Log in</h2>
                <div>
                    <label>Email or Username</label>
                    <input type="text" id={'credential'} placeholder={'Email or Username'} {...register('credential')} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" id={'password'} placeholder={'Password'} {...register('password')} required />
                </div>
                <a>Forgot password?</a>
                <SubmitButton text={"Log in"} isLoading={isLoading}></SubmitButton>
            </form>

            <div className="have-account">Don't have an account? <span onClick={() => navigate('/auth/signup')}>Sign up</span></div>

        </div>
    )
}
