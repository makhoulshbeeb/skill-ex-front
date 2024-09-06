import CategoryDisplayPanel from "../common/CategoryDisplayPanel"

export default function ExploreDisplay({ items, type }) {
    return (
        <div className="grid-display">
            {items.map((item) => {
                if (type == 'Categories') {
                    return (
                        <CategoryDisplayPanel category={item} key={item.id} />
                    )
                }
            }

            )}
        </div>
    )
}
