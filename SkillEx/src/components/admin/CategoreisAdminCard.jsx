import { faPenSquare, faPenToSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CategoreisAdminCard({ category, setDeletePopup, setEditPopup }) {
    return (
        <div className="categories-admin-card">
            <div>
                <img src={category.picture} />
                <div className="categories-admin-card-info">
                    <h3>{category.name}</h3>
                    <p>id: ({category._id})</p>
                </div>
            </div>
            <div>
                <div className="svg" onClick={() => setEditPopup(true)}>
                    <FontAwesomeIcon icon={faPenToSquare} color="var(--primary-color)" />
                </div>
                <div className="svg" onClick={() => setDeletePopup(true)}>
                    <FontAwesomeIcon icon={faTrashAlt} color="tomato" />
                </div>
            </div>
        </div>
    )
}
