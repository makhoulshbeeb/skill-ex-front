import "./styles/AddCategories.css"

import { useState } from "react";
import { useGetUserByTokenQuery } from "../../api/UsersApi";
import { useGetCategoriesQuery } from "../../api/CategoriesApi"

import UserAuthCategories from "../auth/UserAuthCategories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function AddCategories({ title, submit }) {

    const [learn, setLearn] = useState([]);
    const [teach, setTeach] = useState([]);

    const user = useGetUserByTokenQuery();

    const {
        data: learnCategories,
        isLoading: isLoadingLearnCategories,
        isSuccess: isSuccessLearnCategories,
        isError: isErrorLearnCategories,
        error: errorLearnCategories
    } = useGetCategoriesQuery({}, { refetchOnMountOrArgChange: true });

    const {
        data: teachCategories,
        isLoading: isLoadingTeachCategories,
        isSuccess: isSuccessTeachCategories,
        isError: isErrorTeachCategories,
        error: errorTeachCategories
    } = useGetCategoriesQuery({}, { refetchOnMountOrArgChange: true });


    return (
        <div className="signup-add-categories">
            <div className="add-categories-title">
                <h1>{title}</h1>
                <div>Continue
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        fontSize={"1.5rem"}
                    />
                </div>
            </div>
            {isSuccessTeachCategories && <UserAuthCategories dataList={teachCategories} categories={teach} setCategories={setTeach} title={"Teach"} />}
            {isSuccessLearnCategories && <UserAuthCategories dataList={learnCategories} categories={learn} setCategories={setLearn} title={"Learn"} />}
        </div>
    )
}
