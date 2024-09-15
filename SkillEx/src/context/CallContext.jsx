import { createContext, useState, useEffect, useContext, useRef } from "react";
import { useGetUserByTokenQuery } from "../api/UsersApi";
import { useSocketContext } from "./SocketContext";
import Peer from 'simple-peer';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setVideoReceiver } from "../app/slices/videoReceiverSlice";

const CallContext = createContext();

export const useCallContext = () => {
    return useContext(CallContext);
};

var call = {};
var ringtone = new Audio('/audio/iphone 8 Ringtone 2018.mp3');
export const CallContextProvider = ({ children }) => {
    const { socket } = useSocketContext();
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [video, setVideo] = useState(false);
    const [audio, setAudio] = useState(false);
    const { data: me, isSuccess: verifiedMe } = useGetUserByTokenQuery();

    const navigate = useNavigate();

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        socket && socket.on('callUser', ({ from, name: callerName, signal }) => {
            const newCall = { isReceivingCall: true, from, name: callerName, signal };
            call = newCall;
            ringtone.play();
            setTimeout(() => { ringtone.pause(); ringtone.currentTime = 0 }, 10000);
            toast((t) => (
                <div className="call-notification">
                    <img src={from.picture} className="call-notification-caller" />
                    <div>
                        <h3>{from.displayName} is calling...</h3>
                        <div className="call-notification-response">
                            <div className="decline-button" onClick={() => { toast.dismiss(t.id); ringtone.pause(); ringtone.currentTime = 0 }}>Decline</div>
                            <div className="answer-button" onClick={() => { answerCall(); toast.dismiss(t.id); ringtone.pause(); ringtone.currentTime = 0 }}>Answer</div>
                        </div>
                    </div>
                </div>
            ), {
                position: 'bottom-right',
                style: {
                    width: '26rem',
                    maxWidth: 'unset'
                },
                duration: 12000
            }
            )
        });
        return () => socket?.close();
    }, [socket]);
    useEffect(() => {
        if (video || audio) navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
            .then((currentStream) => {
                setStream(currentStream);

                myVideo.current.srcObject = currentStream;
            });

        if (stream) stream.getTracks().forEach((track) => {
            if (!video && track.readyState == 'live' && track.kind === 'video') {
                track.stop();
            }
            if (!audio && track.readyState == 'live' && track.kind === 'audio') {
                track.stop();
            }
        });
    }, [video, audio, setVideo, setAudio]);

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
            dispatch(setVideoReceiver(call.from));
        });

        peer.on('stream', (currentStream) => {
            console.log(currentStream);
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;

        navigate(`sessions/`);
    };

    const callUser = (user) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });
        console.log(peer);

        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: user, signalData: data, from: me, name: me.displayName });
            dispatch(setVideoReceiver(user));
        });

        peer.on('stream', (currentStream) => {
            console.log(currentStream);
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
    };

    return <CallContext.Provider value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        callEnded,
        me,
        audio,
        setAudio,
        video,
        setVideo,
        callUser,
        leaveCall,
        answerCall,
    }}>{children}</CallContext.Provider>;
};