import UserDisplayPanel from "../common/UserDisplayPanel"

export default function SearchResults({ results }) {
    return (
        <div className="search-results">
            {results.map(result => {
                return (
                    <UserDisplayPanel user={result} key={result._id} />
                )
            })}
        </div>
    )
}
