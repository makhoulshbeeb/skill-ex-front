import './styles/Searchbar.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Searchbar({ placeholder, change, navigate }) {
    return (
        <div className="search">
            <FontAwesomeIcon
                icon={faSearch}
                fontSize={"1rem"}
                color="var(--text-light)"
                onClick={navigate}
            ></FontAwesomeIcon>
            <input className='search-bar' placeholder={placeholder} onChange={change} />
        </div>

    );
}