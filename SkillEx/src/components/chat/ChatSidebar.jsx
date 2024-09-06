import Searchbar from "../common/Searchbar";
import ChatPanel from "./ChatPanel";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetChatsQuery } from "../../api/ChatsApi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useSocketContext } from "../../context/SocketContext";

export default function ChatSidebar() {
    const { onlineUsers } = useSocketContext();

    console.log(onlineUsers)

    const [chatSearch, setChatSearch] = useState('');
    const { data, isLoading, isSuccess, isError, error } = useGetChatsQuery({}, { refetchOnMountOrArgChange: true });
    const navigate = useNavigate();

    var chats = data;

    if (data) {
        chats = data.filter(function (el) {
            return el.participants[0].displayName.match(new RegExp(String.raw`.*${chatSearch}.*`, "i"));
        })
    }


    return (
        <div className="chat-sidebar">
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
                {isLoading
                    ? <FontAwesomeIcon
                        icon={faSpinner}
                        fontSize={"1.2rem"}
                        color="var(--text-light)"
                        spinPulse />
                    : chats.map((chat) => {
                        return (
                            <div key={chat._id}>
                                <hr />
                                <ChatPanel chat={chat} online={onlineUsers.includes(chat.participants[0]._id)} />
                            </div>)
                    })
                }
            </div>
        </div>
    )
}
