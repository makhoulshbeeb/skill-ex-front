import { createContext, useState, useEffect, useContext } from "react";
import { useGetUserByTokenQuery } from "../api/UsersApi";
import { useSocketContext } from "./SocketContext";
import Peer from 'simple-peer';

import { useNavigate } from "react-router-dom";

const CallContext = createContext();

export const useCallContext = () => {
    return useContext(CallContext);
};

export const CallContextProvider = ({ children }) => {
    const { socket } = useSocketContext();
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [call, setCall] = useState({});
    const [video, setVideo] = useState(false);
    const [audio, setAudio] = useState(false);
    const { data: me, isSuccess: verifiedMe } = useGetUserByTokenQuery();

    const navigate = useNavigate();

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
            .then((currentStream) => {
                setStream(currentStream);

                myVideo.current.srcObject = currentStream;
            });

        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
    }, [video, audio]);

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    };

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, from: me._id, name: me.displayName });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();

        navigate(-1);
    };

    return <CallContext.Provider value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
    }}>{children}</CallContext.Provider>;
};