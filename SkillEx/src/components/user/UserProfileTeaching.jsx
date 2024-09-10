
export default function UserProfileTeaching({ teach }) {
    return (
        <div className="user-categories-display">
            <h2>Categories Teaching</h2>
            <div>
                {teach.map(subject => {
                    return (
                        <div>
                            <p>{subject.category.name}</p>
                            <span>{subject.endorsements.length}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
