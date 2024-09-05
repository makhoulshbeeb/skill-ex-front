import CategoryDisplayPanel from './CategoryDisplayPanel';



export default function Display({ displayTitle, items, type }) {

    if (items) {
        return (
            <div className="display">
                <h2>{displayTitle}</h2>
                <div className="scroll-display">
                    {items.map(item => {
                        if (type == 'category') {
                            return (
                                <CategoryDisplayPanel category={item} key={item.id} />
                            )
                        }
                    }

                    )}
                </div>
            </div>
        );
    }
}