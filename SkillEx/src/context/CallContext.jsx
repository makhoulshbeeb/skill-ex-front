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

var ringtone = new Audio('/audio/iphone 8 Ringtone 2018.mp3');
export const CallContextProvider = ({ children }) => {
    const { socket } = useSocketContext();
    const [callAccepted, setCallAccepted] = useState(false);
    const [localStream, setLocalStream] = useState();
    const [remoteStream, setRemoteStream] = useState();
    const [video, setVideo] = useState(false);
    const [audio, setAudio] = useState(false);
    const { data: me, isSuccess: verifiedMe } = useGetUserByTokenQuery();

    const navigate = useNavigate();

    const myVideo = useRef(localStream);
    const userVideo = useRef(remoteStream);
    const connectionRef = useRef();
    const callRef = useRef({});

    const dispatch = useDispatch();

    useEffect(() => {

        socket && socket.on('callUser', ({ from, name: callerName, signal }) => {

            if (!callRef.current.isReceivingCall) {
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
            }
            const newCall = { isReceivingCall: true, from, name: callerName, signal };
            callRef.current = newCall;

        });

        socket && socket.on('callEnded', resetState);
        return () => socket && socket.close();

    }, [socket]);

    useEffect(() => {
        updateMediaStream(video, audio);
    }, [video, audio, setVideo, setAudio]);

    useEffect(() => {
        if (localStream) {
            myVideo.current && (myVideo.current.srcObject = localStream);

            if (connectionRef.current && connectionRef.current._connected) {

                const videoTrack = localStream.getVideoTracks()[0];
                const audioTrack = localStream.getAudioTracks()[0];

                console.log(connectionRef.current.streams.length > 0);
                if (connectionRef.current.streams.length > 0) {
                    if (videoTrack) {
                        console.log(connectionRef.current.streams[0].getVideoTracks()[0]);
                        connectionRef.current.streams[0].getVideoTracks()[0]
                            && connectionRef.current.replaceTrack(connectionRef.current.streams[0].getVideoTracks()[0], videoTrack, connectionRef.current.streams[0]);

                    }
                    if (audioTrack) {
                        connectionRef.current.streams[0].getAudioTracks()[0]
                            && connectionRef.current.replaceTrack(connectionRef.current.streams[0].getAudioTracks()[0], audioTrack, connectionRef.current.streams[0]);

                    }
                } else {
                    connectionRef.current.addStream(localStream);
                }
            }

        }
    }, [localStream, setLocalStream])



    const callUser = (user) => {
        const peer = new Peer({ initiator: true, trickle: false, stream: localStream });

        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: user, signalData: data, from: me, name: me.displayName });
        });
        peer.on('stream', (currentStream) => {
            console.log(currentStream.getTracks());
            setRemoteStream(currentStream);
            userVideo.current.srcObject = currentStream;
        });

        peer.on('track', (track, stream) => {
            console.log('New track added:', track.kind);

            setRemoteStream((prevStream) => {
                if (!prevStream) return stream;

                const newStream = prevStream.clone();

                const existingTrack = newStream.getTracks().find(t => t.kind === track.kind);
                if (existingTrack) {
                    newStream.removeTrack(existingTrack);
                }

                newStream.addTrack(track);

                return newStream;
            });

            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }
        });

        peer.on('removetrack', (track) => {
            console.log('Track removed:', track.kind);
            setRemoteStream((prevStream) => {
                if (!prevStream) return null;

                const newStream = prevStream.clone();
                const trackToRemove = newStream.getTracks().find(t => t.id === track.id);
                if (trackToRemove) {
                    newStream.removeTrack(trackToRemove);
                }

                return newStream;
            });
        });

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;
        dispatch(setVideoReceiver(user));
    };

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream: localStream });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: callRef.current.from });
        });


        peer.on('stream', (currentStream) => {
            console.log(currentStream.getTracks());
            setRemoteStream(currentStream);
            userVideo.current.srcObject = currentStream;
        });

        peer.on('track', (track, stream) => {
            console.log('New track added:', track.kind);

            setRemoteStream((prevStream) => {
                if (!prevStream) return stream;

                const newStream = prevStream.clone();

                const existingTrack = newStream.getTracks().find(t => t.kind === track.kind);
                if (existingTrack) {
                    newStream.removeTrack(existingTrack);
                }

                newStream.addTrack(track);

                return newStream;
            });

            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }
        });

        peer.on('removetrack', (track) => {
            console.log('Track removed:', track.kind);
            setRemoteStream((prevStream) => {
                if (!prevStream) return null;

                const newStream = prevStream.clone();
                const trackToRemove = newStream.getTracks().find(t => t.id === track.id);
                if (trackToRemove) {
                    newStream.removeTrack(trackToRemove);
                }

                return newStream;
            });
        });

        peer.signal(callRef.current.signal);

        connectionRef.current = peer;

        navigate(`sessions/`, { replace: callAccepted });
        dispatch(setVideoReceiver(callRef.current.from));
    };

    const leaveCall = (videoReceiver) => {
        callAccepted && socket.emit('callEnded', { to: videoReceiver });
        resetState();
    };

    const resetState = () => {
        setCallAccepted(false);
        setAudio(false);
        setVideo(false);
        navigate(-1, { replace: true });

        localStream && localStream.getTracks().forEach((track) => {
            track.stop();
        });

        setLocalStream(null);
        setRemoteStream(null);
        connectionRef.current && connectionRef.current.destroy();
        callRef.current = {};
    }

    const toggleMedia = (type) => {
        if (type === 'video') {
            updateMediaStream(!video, audio);
        } else if (type === 'audio') {
            updateMediaStream(video, !audio);
        }
    };

    const updateMediaStream = async (videoEnabled, audioEnabled) => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0];
            const audioTrack = localStream.getAudioTracks()[0];

            if (videoTrack) {
                videoTrack.enabled = videoEnabled;
            }
            if (audioTrack) {
                audioTrack.enabled = audioEnabled;
            }

            if (!videoTrack && videoEnabled) {
                const newVideoTrack = await navigator.mediaDevices.getUserMedia({ video: true })
                    .then(stream => stream.getVideoTracks()[0]);
                localStream.addTrack(newVideoTrack);
            }
            if (!audioTrack && audioEnabled) {
                const newAudioTrack = await navigator.mediaDevices.getUserMedia({ audio: true })
                    .then(stream => stream.getAudioTracks()[0]);
                localStream.addTrack(newAudioTrack);
            }

            setLocalStream(localStream.clone());
        } else {
            const newStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            setLocalStream(newStream);
        }

        setVideo(videoEnabled);
        setAudio(audioEnabled);
    };

    return <CallContext.Provider value={{
        callRef,
        callAccepted,
        myVideo,
        userVideo,
        localStream,
        remoteStream,
        me,
        audio,
        setAudio,
        video,
        setVideo,
        callUser,
        leaveCall,
        answerCall,
        toggleMedia
    }}>{children}</CallContext.Provider>;
};