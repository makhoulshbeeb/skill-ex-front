import { useState } from "react";

export default function AddCategories() {

    const [learn, setLearn] = useState([]);
    const [teach, setTeach] = useState([]);

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
