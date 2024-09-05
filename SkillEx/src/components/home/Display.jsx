import DisplayPanel from './DisplayPanel';



export default function Display({ displayTitle }) {
    // const { data: categories } = ;

    if (categories) {
        return (
            <div className="display">
                <h2>{displayTitle}</h2>
                <div className="scroll-display">
                    {categories.map(course => {
                        return (
                            <DisplayPanel course={course} key={course.id}></DisplayPanel>
                        )
                    }

                    )}
                </div>
            </div>
        );
    }
}