import { useState } from "react";
import { useEndorseUserMutation, useGetUserByTokenQuery } from "../../api/UsersApi"

var categoryToEndorse = { category: { _id: '', name: '' }, endorsements: [] };
export default function UserProfileTeaching({ user }) {
    const [endorse, setEndorse] = useState(false);
    const [endorseUser, { data, isLoading, isSuccess, isError, error }] = useEndorseUserMutation();
    const { data: viewer, isSuccess: viewerVerified } = useGetUserByTokenQuery();
    return (
        <>
            <div className="user-categories-display">
                <h2>Categories Taught</h2>
                <div>
                    {user.teach.map(subject => {
                        console.log(subject.endorsements)
                        return (
                            <div>
                                <p>{subject.category.name}</p>
                                <span onClick={() => { categoryToEndorse = subject; setEndorse(true); }}>{subject.endorsements.length}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <dialog open={endorse} >
                <div className="add-endorsement">
                    {viewerVerified && categoryToEndorse.endorsements.includes(viewer._id.toString())
                        ? <p>You already endorsed {user.displayName} for {categoryToEndorse.category.name}, do you want to remove it?</p>
                        : <p>Would you like to endorse {user.displayName} for {categoryToEndorse.category.name}?</p>}
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <div className='add-reviews-button' style={{ backgroundColor: "var(--background-light)", color: "var(--primary-color)", scale: "0.9" }} onClick={() => setEndorse(false)}>Cancel</div>
                        <div className='add-reviews-button' style={{ scale: "0.9" }}
                            onClick={() => { endorseUser({ receiverId: user._id, categoryId: categoryToEndorse.category._id }); setEndorse(false); }}
                        >Submit
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    )
}
