export default function UserProfileLearning({ learn }) {
    return (
        <div className="user-categories-display">
            <h2>Categories Learning</h2>
            <div>
                {learn.map(subject => {
                    return (
                        <div>
                            <p>{subject.category.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}