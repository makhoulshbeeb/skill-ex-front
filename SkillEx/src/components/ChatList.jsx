import { useState } from "react";
import Searchbar from "./Searchbar";
import { useGetChatsQuery } from "../api/ChatsApi";
import ChatPanel from "./ChatPanel";

export default function ChatList() {
    const [chatSearch, setChatSearch] = useState('');
    const { data: chats, isLoading, isSuccess, isError, error } = useGetChatsQuery();
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
            <div>
                {chats.map((chat) => {
                    <>
                        <ChatPanel chat={chat} />
                        <hr />
                    </>
                })}
            </div>
        </dv>
    )
}
