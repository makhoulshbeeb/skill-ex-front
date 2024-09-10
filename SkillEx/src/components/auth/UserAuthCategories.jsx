import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function UserAuthCategories({ categories, setCategories, title }) {
    return (
        <div className="auth-categories-display">
            <h2>{title}</h2>
            <div>
                {categories.map(categories => {
                    return (
                        <div>
                            <p>{category.name}</p>
                            <FontAwesomeIcon
                                icon={faClose}
                                onClick={setCategories([...categories].filter(el => el._id == category._id))} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
