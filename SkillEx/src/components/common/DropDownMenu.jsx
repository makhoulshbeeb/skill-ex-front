import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./styles/DropDownMenu.css"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"

export default function DropDownMenu({ menuItems, open }) {
    return (
        <div className="dropdown-menu-container" style={{ height: open ? `${menuItems.length * 3.6}rem` : 0 }}>
            {menuItems.map((item, index) => {
                return (
                    <div key={index}
                        className="dropdown-menu-item"
                        onClick={item.action}>
                        <span>{item.icon}{item.title}</span>
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            fontSize={"0.8rem"} />
                    </div>
                )
            })}
        </div>
    )
}
