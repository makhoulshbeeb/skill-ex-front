import CategoryDisplayPanel from "../common/CategoryDisplayPanel"
import UserDisplayPanel from "../common/UserDisplayPanel";

export default function ExploreDisplay({ items, type }) {
    return (
        <div className="grid-display">
            {items.map((item) => {
                if (type == 'Categories') {
                    return (
                        <CategoryDisplayPanel category={item} key={item.id} />
                    );
                }
                if (type == "Matches") {
                    return (
                        <UserDisplayPanel user={item} key={item.id} />
                    );
                }
            }

            )}
        </div>
    )
}
