import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useSignupMutation } from "../../api/AuthApi";

import toast from 'react-hot-toast';
import SubmitButton from "../common/SubmitButton";
import AddCategories from "../common/AddCategories";
import { useUpdateUserMutation } from "../../api/UsersApi";
import { useState } from "react";


export default function Signup() {
    const navigate = useNavigate();
    const form = useForm();

    const { register, handleSubmit } = form;

    const [signup, { data: res, isSuccess, isLoading, isError, error }] = useSignupMutation();

    const [addcategories, {
        data: resCategories,
        isSuccess: isSuccessCategories,
        isLoading: isLoadingCategories,
        isError: isErrorCategories,
        error: errorCategories
    }] = useUpdateUserMutation();

    const [openCategoriesTab, setOpenCategoriesTab] = useState(true);

    if (isLoading || isLoadingCategories) {
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
        toast.success("One step left to go!", {
            id: "success"
        });
        setTimeout(() => { setOpenCategoriesTab(true) }, 1000)
    }
    if (isSuccessCategories) {
        toast.dismiss("loading");
        toast.success("Welcome to SkillEx!", {
            id: "success"
        });
        setTimeout(() => { navigate("/") }, 1000)
    }
    if (isErrorCategories) {
        toast.dismiss("loading");
        toast.error(error.data.error, {
            id: "error"
        });
    }

    const signupHandler = async (data, e) => {
        e.preventDefault();
        signup(data);
    }

    return (

        openCategoriesTab
            ? <AddCategories title={"Start your Journey!"} submit={addcategories} />
            : <div className="form-container">
                <div className="form-top">
                    <h2 className="title">Sign Up</h2>
                    <form className="input-form" onSubmit={handleSubmit(signupHandler)}>
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
                        <div>
                            <label>Gender</label>
                            <select {...register('gender')}>
                                <option >Gender</option>
                                <option value={"male"}>Male</option>
                                <option value={"female"}>Female</option>
                                <option value={"other"}>Other</option>
                            </select>
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" id={'password'} placeholder={'Password'} {...register('password')} required />
                        </div>
                        <div>
                            <label>Confirm Password</label>
                            <input type="password" id={'confirmPassword'} placeholder={'Confirm Password'} {...register('confirmPassword')} required />
                        </div>
                        <SubmitButton text={"Sign Up"} isLoading={isLoading}></SubmitButton>
                    </form>
                </div>

                <div className="have-account">Don't have an account? <span onClick={() => navigate('/auth/login')}>Login</span></div>
            </div>

    )
}
