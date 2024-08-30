import "./Chat.css"

import Searchbar from "../common/Searchbar";
import ChatPanel from "./ChatPanel";

import { useState } from "react";
import { useGetChatsQuery } from "../../api/ChatsApi";
import { useDispatch } from "react-redux";
import { setReceiver } from "../../app/slices/receiverSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function ChatSidebar() {
    const [chatSearch, setChatSearch] = useState('');
    const { data, isLoading, isSuccess, isError, error } = useGetChatsQuery();
    console.log(data);

    var chats = data;

    if (data) {
        chats = data.filter(function (el) {
            return `.*${chatSearch}.*`.match(el.participants[0].displayName);
        })
    }

    const dispatch = useDispatch();
    return (
        <dv className="chat-sidebar">
            <div className="chat-search">
                <FontAwesomeIcon
                    icon={faSearch}
                    fontSize={"1.2rem"}
                    color="var(--text-light)"
                    onClick={() => navigate(`search/${search}`)}
                ></FontAwesomeIcon>
                <Searchbar placeholder={"Search..."} change={(e) => setChatSearch(e.target.value)} />
            </div>
            <div className="chat-list">
                {chats ? chats.map((chat) => {
                    <>
                        <ChatPanel chat={chat} onClick={() => dispatch(setReceiver(chat.participants[0]))} />
                        <hr />
                    </>
                }) : <FontAwesomeIcon icon={faSpinner} spinPulse />}
            </div>
        </dv>
    )
}
