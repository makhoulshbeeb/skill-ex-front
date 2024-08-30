import "./Chat.css"

import Searchbar from "../common/Searchbar";
import ChatPanel from "./ChatPanel";

import { useState } from "react";
import { useGetChatsQuery } from "../../api/ChatsApi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function ChatSidebar() {
    const [chatSearch, setChatSearch] = useState('');
    const { data, isLoading, isSuccess, isError, error } = useGetChatsQuery();

    var chats = data;

    if (data) {
        chats = data.filter(function (el) {
            return el.participants[0].displayName.match(`.*${chatSearch}.*`);
        })
    }
    console.log('chats: ', chats);
    return (
        <dv className="chat-sidebar">
            <div className="chat-search">
                <FontAwesomeIcon
                    icon={faSearch}
                    fontSize={"1.2rem"}
                    color="var(--text-light)"
                    onClick={(e) => setChatSearch(e.target.value)}
                ></FontAwesomeIcon>
                <Searchbar placeholder={"Search..."} change={(e) => setChatSearch(e.target.value)} />
            </div>
            <div className="chat-list">
                {chats
                    ? chats.map((chat) => {
                        return (
                            <>
                                <hr />
                                <ChatPanel chat={chat} />
                            </>)
                    })
                    : <FontAwesomeIcon icon={faSpinner} spinPulse />}
            </div>
        </dv>
    )
}
