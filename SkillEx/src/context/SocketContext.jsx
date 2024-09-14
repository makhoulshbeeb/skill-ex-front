import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useGetUserByTokenQuery } from "../api/UsersApi";
import toast from "react-hot-toast";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { data: user, isSuccess } = useGetUserByTokenQuery({}, { refetchOnMountOrArgChange: true });

    useEffect(() => {
        if (isSuccess) {
            const socket = io("http://localhost:5000", {
                query: {
                    userId: user._id,
                },
            });

            setSocket(socket);

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });
            socket.on("newMessage", ({ newMessage, sender }) => {
                toast((t) => (
                    <div className="call-notification">
                        <img src={sender.picture} className="call-notification-caller" />
                        <div>
                            <h3>{sender.displayName}</h3>
                            <h4>{newMessage.message}</h4>
                        </div>
                    </div>
                ), {
                    position: 'bottom-right',
                    style: {
                        width: '24rem',
                        maxWidth: 'unset',
                    },
                    duration: 8000
                }
                )
            });
            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [user]);

    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};