import "./Chat.css"

import Searchbar from "../common/Searchbar";
import ChatPanel from "./ChatPanel";

import { useState } from "react";
import { useGetChatsQuery } from "../../api/ChatsApi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

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
            <Searchbar placeholder={"Search..."} change={(e) => setChatSearch(e.target.value)} />
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
