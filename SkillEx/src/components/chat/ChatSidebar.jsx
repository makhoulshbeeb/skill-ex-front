import Searchbar from "../common/Searchbar";
import ChatPanel from "./ChatPanel";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetChatsQuery } from "../../api/ChatsApi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function ChatSidebar() {
    const [chatSearch, setChatSearch] = useState('');
    const { data, isLoading, isSuccess, isError, error } = useGetChatsQuery();
    const navigate = useNavigate();

    var chats = data;

    if (data) {
        chats = data.filter(function (el) {
            return el.participants[0].displayName.match(`.*${chatSearch}.*`);
        })
    }
    return (
        <dv className="chat-sidebar">
            <div className="chat-search">
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    fontSize={"1.2rem"}
                    color="var(--background-color)"
                    style={{ backgroundColor: "var(--primary-color)", padding: "0.5rem 0.6rem", borderRadius: "1.5rem" }}
                    onClick={(e) => navigate(-1)}
                ></FontAwesomeIcon>
                <Searchbar placeholder={"Search..."} change={(e) => setChatSearch(e.target.value)} />
            </div>
            <div className="chat-list">
                {chats
                    ? chats.map((chat) => {
                        return (
                            <div key={chat._id}>
                                <hr />
                                <ChatPanel chat={chat} />
                            </div>)
                    })
                    : <FontAwesomeIcon
                        icon={faSpinner}
                        fontSize={"1.2rem"}
                        color="var(--text-light)"
                        spinPulse />
                }
            </div>
        </dv>
    )
}
