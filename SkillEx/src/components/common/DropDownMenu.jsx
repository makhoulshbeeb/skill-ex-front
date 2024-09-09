import "./styles/DropDownMenu.css"

export default function DropDownMenu({ menuItems, open }) {
    return (
        <div className={"dropdown-menu-container"}>
            {menuItems.map((item) => {
                return (
                    <div
                        className="dropdown-menu-item"
                        onClick={item.action}>
                        {item.title}
                    </div>
                )
            })}
        </div>
    )
}
