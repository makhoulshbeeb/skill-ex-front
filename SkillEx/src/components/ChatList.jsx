import { useState } from "react";
import Searchbar from "./Searchbar";
import { useGetChatsQuery } from "../api/ChatsApi";
import ChatPanel from "./ChatPanel";
import { useDispatch } from "react-redux";
import { setReceiver } from "../app/slices/receiverSlice";

export default function ChatList() {
    const [chatSearch, setChatSearch] = useState('');
    const { data, isLoading, isSuccess, isError, error } = useGetChatsQuery();

    const chats = data.filter(function (el) {
        return `.*${chatSearch}.*`.match(el.participants[0].displayName);
    })

    const dispatch = useDispatch();
    return (
        <dv className="chat-list">
            <div className="chat-search">
                <FontAwesomeIcon
                    icon={faSearch}
                    fontSize={"1.2rem"}
                    color="var(--background-light)"
                    onClick={() => navigate(`search/${search}`)}
                ></FontAwesomeIcon>
                <Searchbar placeholder={"Search..."} change={(e) => setChatSearch(e.target.value)} />
            </div>
            <div>
                {chats.map((chat) => {
                    <>
                        <ChatPanel chat={chat} onClick={() => dispatch(setReceiver(chat.participants[0]))} />
                        <hr />
                    </>
                })}
            </div>
        </dv>
    )
}
