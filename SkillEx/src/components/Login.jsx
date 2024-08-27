import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../api/AuthApi";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import toast from 'react-hot-toast';


export default function Login() {
    const navigate = useNavigate();
    const form = useForm();

    const { register, handleSubmit } = form;

    const [login, { isSuccess, isLoading, isError, error }] = useLoginMutation();

    if (isLoading) {
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
        setTimeout(() => { navigate('/') }, 1000)
    }

    const loginHandler = async (data, e) => {
        e.preventDefault();
        login(data);
    }

    return (
        <div className="form-container" onSubmit={handleSubmit(loginHandler)}>
            <h2 className="title">Log in</h2>
            <hr />
            <form className="input-form">
                <input type="text" id={'credential'} placeholder={'Email or Username'} {...register('credential')} required />
                <input type="password" id={'password'} placeholder={'Password'} {...register('password')} required />
                <a>Forgot password?</a>
                {isLoading
                    ? <input type="submit" disabled value={<FontAwesomeIcon icon={faSpinner} />} />
                    : <input type="submit" value={"Log in"} />}
            </form>



            <div className="have-account">Don't have an account?<span onClick={() => navigate('/auth/login')}>Log in</span></div>

        </div>
    )
}
