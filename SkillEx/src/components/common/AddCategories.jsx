import "./styles/AddCategories.css"

import { useState } from "react";
import { useGetUserByTokenQuery } from "../../api/UsersApi";
import { useGetCategoriesQuery } from "../../api/CategoriesApi"

import UserAuthCategories from "./UserAuthCategories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function AddCategories({ title, submit, learnInitialState, teachInitialState }) {
    const [learn, setLearn] = useState(learnInitialState);
    const [teach, setTeach] = useState(teachInitialState);

    console.log(learnInitialState)

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

    const submitHandler = (oldLearn, oldTeach) => {
        const learn = [];
        const teach = [];
        oldLearn.forEach(el => learn.push({ category: el._id }));
        oldTeach.forEach(el => teach.push({ category: el._id }));
        submit({ learn, teach });
    }

    return (
        <div className="add-categories">
            <h1>{title}</h1>
            {isSuccessTeachCategories && <UserAuthCategories dataList={teachCategories} categories={teach} setCategories={setTeach} title={"Teach"} />}
            {isSuccessLearnCategories && <UserAuthCategories dataList={learnCategories} categories={learn} setCategories={setLearn} title={"Learn"} />}
            <div
                className="add-categories-submit"
                onClick={() => submitHandler(learn, teach)}
            >Continue
                <FontAwesomeIcon
                    icon={faArrowRight}
                />
            </div>
        </div>
    )
}
