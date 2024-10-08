import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useGetUserByTokenQuery } from "../api/UsersApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setReceiver } from "../app/slices/receiverSlice";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

var notification = new Audio('/audio/iPhone Notification Sound Effect.mp3');
export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { data: user, isSuccess } = useGetUserByTokenQuery({}, { refetchOnMountOrArgChange: true });
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                notification.play();
                setTimeout(() => { notification.pause(); notification.currentTime = 0 }, 1000);
                toast((t) => (
                    <div className="call-notification" onClick={() => { toast.dismiss(t.id); navigate('chats'); dispatch(setReceiver(sender)) }} style={{ cursor: 'pointer' }}>
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
                    duration: 5000
                }
                )
            });
        } else {
            if (socket) {
                socket.off("newMessage");
                setSocket(null);
            }
        }
    }, [user]);

    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};