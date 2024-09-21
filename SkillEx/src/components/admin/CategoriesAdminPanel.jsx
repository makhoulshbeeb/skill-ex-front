import { useRef, useState } from "react";
import { useAddCategoryMutation, useDeleteCategoryMutation, useEditCategoryMutation, useGetCategoriesQuery } from "../../api/CategoriesApi";
import Searchbar from "../common/Searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CategoreisAdminCard from "./CategoreisAdminCard";
import toast from "react-hot-toast";


var isFalseAdd = false;
var isFalseEdit = false;
var isFalseDelete = false;
export default function CategoriesAdminPanel() {

    const [categoryId, setCategoryId] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [categoryPicture, setCategoryPicture] = useState("");

    const [addPopup, setAddPopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);

    const [addCategory, { data: addedCategory, isLoading: addLoading, isSuccess: addSuccess, isError: addError, error: addErrorMessage }] = useAddCategoryMutation();
    const [editCategory, { data: editedCategory, isLoading: editLoading, isSuccess: editSuccess, isError: editError, error: editErrorMessage }] = useEditCategoryMutation();
    const [deleteCategory, { data: deletedCategory, isLoading: deleteLoading, isSuccess: deleteSuccess, isError: deleteError, error: deleteErrorMessage }] = useDeleteCategoryMutation();

    const addNameRef = useRef();
    const addPictureRef = useRef();

    const editNameRef = useRef();
    const editPictureRef = useRef();

    const [categorySearch, setCategorySearch] = useState('');
    const { data, isLoading, isSuccess, isError, error } = useGetCategoriesQuery();

    var categories = data;

    if (categories) {
        categories = categories.filter(function (el) {
            return el.name.match(new RegExp(String.raw`.*${categorySearch.trim()}.*`, "i"));
        })
    }

    if (addLoading) {
        toast.loading("Loading...", {
            id: "loading"
        });
        isFalseAdd = false;
    }
    if (addSuccess && addSuccess != isFalseAdd) {
        toast.dismiss("loading");
        toast.success("Category Addd!", {
            id: "success"
        });
        isFalseAdd = true;
        dispatch(usersApi.util.invalidateTags(['Information']));
    }
    if (addError && addError != isFalseAdd) {
        toast.dismiss("loading");
        toast.error(addErrorMessage.data.error, {
            id: "error"
        });
        isFalseAdd = true;
    }

    if (editLoading) {
        toast.loading("Loading...", {
            id: "loading"
        });
        isFalseEdit = false;
    }
    if (editSuccess && editSuccess != isFalseEdit) {
        toast.dismiss("loading");
        toast.success("Category Editd!", {
            id: "success"
        });
        isFalseEdit = true;
        dispatch(usersApi.util.invalidateTags(['Information']));
    }
    if (editError && editError != isFalseEdit) {
        toast.dismiss("loading");
        toast.error(editErrorMessage.data.error, {
            id: "error"
        });
        isFalseEdit = true;
    }

    if (deleteLoading) {
        toast.loading("Loading...", {
            id: "loading"
        });
        isFalseDelete = false;
    }
    if (deleteSuccess && deleteSuccess != isFalseDelete) {
        toast.dismiss("loading");
        toast.success("Category Deleted!", {
            id: "success"
        });
        isFalseDelete = true;
        dispatch(usersApi.util.invalidateTags(['Information']));
    }
    if (deleteError && deleteError != isFalseDelete) {
        toast.dismiss("loading");
        toast.error(deleteErrorMessage.data.error, {
            id: "error"
        });
        isFalseDelete = true;
    }

    return (
        <div className="categories-admin-panel">
            <div className="categories-admin-header">
                <div className="categories-admin-title">
                    <h2 className="underline">Categories</h2>
                </div>
                <div className="add-categories-button" onClick={() => setAddPopup(true)}>
                    <FontAwesomeIcon
                        icon={faPlus} />
                    Add Category
                </div>
                <Searchbar placeholder={`Search Categories`} change={(e) => setCategorySearch(e.target.value)} />
            </div>
            <div className="categories-admin-body">
                {isSuccess &&
                    categories.map((el) => {
                        return (<CategoreisAdminCard
                            category={el}
                            setCategoryId={setCategoryId}
                            setCategoryName={setCategoryName}
                            setCategoryPicture={setCategoryPicture}
                            setEditPopup={setEditPopup}
                            setDeletePopup={setDeletePopup} />)
                    })
                }
                <dialog open={addPopup} >
                    <div className="add-endorsement">
                        <label>
                            Name
                            <input type="text" ref={addNameRef} placeholder="Name" defaultValue={categoryName} />
                        </label>
                        <label>
                            Picture
                            <input type="text" ref={addPictureRef} placeholder="Picture" defaultValue={categoryPicture} />
                        </label>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <div className='add-reviews-button' style={{ backgroundColor: "var(--background-light)", color: "var(--primary-color)", scale: "0.9" }} onClick={() => setAddPopup(false)}>Cancel</div>
                            <div className='add-reviews-button' style={{ scale: "0.9" }}
                                onClick={() => { addCategory({ name: addNameRef.current.value, picture: addPictureRef.current.value }); setAddPopup(false); }}
                            >Submit
                            </div>
                        </div>
                    </div>
                </dialog>
                <dialog open={editPopup} >
                    <div className="add-endorsement">
                        <label>
                            Name
                            <input type="text" ref={editNameRef} placeholder="Name" defaultValue={categoryName} />
                        </label>
                        <label>
                            Picture
                            <input type="text" ref={editPictureRef} placeholder="Picture" defaultValue={categoryPicture} />
                        </label>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <div className='add-reviews-button' style={{ backgroundColor: "var(--background-light)", color: "var(--primary-color)", scale: "0.9" }} onClick={() => setEditPopup(false)}>Cancel</div>
                            <div className='add-reviews-button' style={{ scale: "0.9" }}
                                onClick={() => { editCategory({ id: categoryId, name: editNameRef.current.value, picture: editPictureRef.current.value }); setEditPopup(false); }}
                            >Submit
                            </div>
                        </div>
                    </div>
                </dialog>
                <dialog open={deletePopup} >
                    <div className="add-endorsement">
                        <p>Are you sure you want to delete {categoryName}?</p>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <div className='add-reviews-button' style={{ backgroundColor: "var(--background-light)", color: "var(--primary-color)", scale: "0.9" }} onClick={() => setDeletePopup(false)}>Cancel</div>
                            <div className='add-reviews-button' style={{ scale: "0.9" }}
                                onClick={() => { deleteCategory({ id: categoryId }); setDeletePopup(false); }}
                            >Submit
                            </div>
                        </div>
                    </div>
                </dialog>
            </div >
        </div >
    )
}
