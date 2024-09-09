import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./styles/DropDownMenu.css"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"

export default function DropDownMenu({ menuItems, open }) {
    return (
        <div className="dropdown-menu-container" style={{ height: open ? 'fit-content' : 0 }}>
            {menuItems.map((item, index) => {
                return (
                    <div
                        className="dropdown-menu-item"
                        onClick={item.action}>
                        <span>{item.title}</span>
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            fontSize={"0.8rem"} />
                    </div>
                )
            })}
        </div>
    )
}
