import { useState } from "react";
import { useGetUserByTokenQuery } from "../../api/UsersApi";
import { useGetCategoriesQuery } from "../../api/CategoriesApi"

import UserAuthCategories from "./UserAuthCategories";

export default function AddCategories() {

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
            <h1>Start your Journey!</h1>
            {isSuccessTeachCategories && <UserAuthCategories dataList={teachCategories} categories={teach} setCategories={setTeach} title={"Teach"} />}
            {isSuccessLearnCategories && <UserAuthCategories dataList={learnCategories} categories={learn} setCategories={setLearn} title={"Learn"} />}
        </div>
    )
}
