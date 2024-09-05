import CategoryDisplayPanel from './CategoryDisplayPanel';



export default function Display({ displayTitle, items, type }) {
    const categories = [{ name: "Category 1", picture: "https://e7.pngegg.com/pngimages/75/866/png-clipart-category-management-organization-retail-management-miscellaneous-text-thumbnail.png" }];

    if (categories) {
        return (
            <div className="display">
                <h2>{displayTitle}</h2>
                <div className="scroll-display">
                    {categories.map(category => {
                        return (
                            <CategoryDisplayPanel category={category} key={category.id} />
                        )
                    }

                    )}
                </div>
            </div>
        );
    }
}