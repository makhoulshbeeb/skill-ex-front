import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useGetUserByTokenQuery } from "../api/UsersApi";
import { useSocketContext } from "./SocketContext";
import { useSelector } from "react-redux";

const CallContext = createContext();

export const useCallContext = () => {
    return useContext(CallContext);
};

export const CallContextProvider = ({ children }) => {
    const { socket } = useSocketContext();
    const receiver = useSelector(state => state.receiver);
    const [call, setCall] = useState({ receivingCall: false, caller: '', callerSignal: '' });
    const { data: user, isSuccess } = useGetUserByTokenQuery();

    useEffect(() => {
        if (isSuccess) {

            socket.on("callUser", (data) => {
                setCall({ receivingCall: true, caller: data.from, callerSignal: 'data.signal' });
            })

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
            }
        }
    }, [user]);

    return <CallContext.Provider value={{ call }}>{children}</CallContext.Provider>;
};