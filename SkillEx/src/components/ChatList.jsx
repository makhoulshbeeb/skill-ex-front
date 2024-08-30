import { useState } from "react";
import Searchbar from "./Searchbar";

export default function ChatList() {
    const [chatSearch, setChatSearch] = useState('');
    return (
        <dv className="chat-list">
            <div className="chat-search">
                <FontAwesomeIcon
                    icon={faSearch}
                    fontSize={"1.2rem"}
                    color="var(--background-light)"
                    onClick={() => navigate(`search/${search}`)}
                ></FontAwesomeIcon>
                <Searchbar placeholder={"Search..."} />
            </div>
        </dv>
    )
}
