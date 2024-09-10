import { useState } from "react";
import { useGetUserByTokenQuery } from "../../api/UsersApi";

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
        <div>AddCategories</div>
    )
}
