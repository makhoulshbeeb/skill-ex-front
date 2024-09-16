import { createContext, useState, useEffect, useContext, useRef } from "react";
import { useGetUserByTokenQuery } from "../api/UsersApi";
import { useSocketContext } from "./SocketContext";
import Peer from 'simple-peer';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
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
    const [stream, setStream] = useState();
    const [video, setVideo] = useState(false);
    const [audio, setAudio] = useState(false);
    const { data: me, isSuccess: verifiedMe } = useGetUserByTokenQuery();

    const navigate = useNavigate();

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    const dispatch = useDispatch();
    const videoReceiver = useSelector(state => state.videoReceiver);

    useEffect(() => {
        socket && socket.on('streamUpdate', (stream) => {
            userVideo.current.srcObject = stream;
        });

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
                            <div className="decline-button" onClick={() => { toast.dismiss(t.id); ringtone.pause(); ringtone.currentTime = 0; socket.emit('callEnded', { to: from }); }}>Decline</div>
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

        socket && socket.on('callEnded', () => {
            setCallAccepted(false);
            connectionRef.current && connectionRef.current.destroy();
            setAudio(false);
            setVideo(false);
            navigate(-1, { replace: true });
        });
        return () => socket && socket.close();

    }, [socket]);

    useEffect(() => {
        if (video || audio) {
            navigator.mediaDevices.getUserMedia({
                video: video,
                audio: audio && {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                    channelCount: 1
                }
            }).then((currentStream) => {

                console.log(currentStream.getTracks())
                setStream(currentStream);
                if (myVideo.current) myVideo.current.srcObject = currentStream;
                // if (connectionRef.current.streams) {
                //     connectionRef.current.streams[0] && connectionRef.current.removeStream(connectionRef.current.streams[0]);
                //     connectionRef.current.addStream(currentStream);
                // }
            })
        }
        if (stream) {
            stream.getTracks().forEach((track) => {
                if (!video && track.readyState == 'live' && track.kind === 'video') {
                    track.stop();
                }
                if (!audio && track.readyState == 'live' && track.kind === 'audio') {
                    track.stop();
                }
            });
        }


    }, [video, audio, setVideo, setAudio]);

    useEffect(() => {
        if (stream) {

            stream.getTracks().forEach((track) => {
                if (track.readyState == 'live' && track.kind === 'video') {
                    connectionRef.current
                        && connectionRef.current.streams.length >= 1
                        && connectionRef.current.replaceTrack(connectionRef.current.streams[0].getVideoTracks()[0], track, connectionRef.current.streams[0])
                }
                if (track.readyState == 'live' && track.kind === 'audio') {
                    connectionRef.current
                        && connectionRef.current.streams.length >= 1
                        && connectionRef.current.replaceTrack(connectionRef.current.streams[0].getAudioTracks()[0], track, connectionRef.current.streams[0])
                }

            });

            !video
                && connectionRef.current
                && connectionRef.current.streams.length >= 1
                && connectionRef.current.streams[0].getVideoTracks()[0].stop();


            !audio
                && connectionRef.current
                && connectionRef.current.streams.length >= 1
                && connectionRef.current.streams[0].getAudioTracks()[0].stop();


            connectionRef.current
                && connectionRef.current.streams.length >= 1
                && console.log(connectionRef.current.streams);

            connectionRef.current
                && connectionRef.current.streams.length >= 1
                && socket.emit('streamUpdate', { to: videoReceiver, stream: connectionRef.current.streams[0] });

        }
    }, [stream, setStream])

    const answerCall = () => {
        console.log(stream)
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, streams: stream && [stream] });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
        });
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;

        navigate(`sessions/`, { replace: callAccepted });
        dispatch(setVideoReceiver(call.from));
    };

    const callUser = (user) => {
        const peer = new Peer({ initiator: true, trickle: false, streams: stream && [stream] });

        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: user, signalData: data, from: me, name: me.displayName });
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
        dispatch(setVideoReceiver(user));
    };

    const leaveCall = (videoReceiver) => {
        callAccepted && socket.emit('callEnded', { to: videoReceiver });
        setCallAccepted(false);
        connectionRef.current && connectionRef.current.destroy();
        setAudio(false);
        setVideo(false);
        navigate(-1, { replace: true });
    };

    return <CallContext.Provider value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
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