import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef } from "react";
import toast from "react-hot-toast";

export default function UserAuthCategories({ dataList, categories, setCategories, title }) {
    const ref = useRef();

    var newDataList = dataList.filter((data) => {
        return !categories.includes(data);
    });
    return (
        <div className="auth-categories">
            <div className="auth-categories-selector">
                <h2 className="underline">{title}</h2>
                <div className="input-form">
                    <select ref={ref}>
                        {newDataList.map(data => {
                            return (
                                <option value={data._id} >{data.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div
                    onClick={() => {
                        ref.current.value
                            ? setCategories([...categories, newDataList.filter(el => el._id == ref.current.value)[0]])
                            : toast.error("Sorry, we're out of Categories", {
                                id: "error"
                            });
                    }}
                    className="auth-categories-selector-add">
                    <FontAwesomeIcon
                        icon={faPlus}
                        color="var(--primary-color)"
                        fontSize={"1.5rem"}
                    />
                </div>
            </div>
            <div className="auth-categories-display">
                {categories.map(category => {
                    return (
                        <div>
                            <p>{category.name}</p>
                            <FontAwesomeIcon
                                icon={faClose}
                                onClick={() => setCategories([...categories].filter(el => el._id != category._id))}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
