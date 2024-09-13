import { faCamera, faMessage, faMicrophone, faMicrophoneSlash, faPhone, faShareSquare, faVideo, faVideoSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useCallContext } from '../../context/CallContext';
import { useNavigate } from 'react-router-dom';

export default function VideoBar() {
    const { audio, setAudio, video, setVideo, leaveCall } = useCallContext();
    const [screenShare, setScreenShare] = useState(false);
    const [chat, setChat] = useState(false);
    const navigate = useNavigate();

    const endCall = () => {
        setAudio(false);
        setVideo(false);
        navigate(-1);
        leaveCall();
    }
    return (
        <div className='video-bar'>
            <div style={{ backgroundColor: audio ? 'var(--text-light)' : 'tomato' }} onClick={() => setAudio(!audio)}>
                <FontAwesomeIcon icon={audio ? faMicrophone : faMicrophoneSlash} />
            </div>
            <div style={{ backgroundColor: video ? 'var(--text-light)' : 'tomato' }} onClick={() => setVideo(!video)}>
                <FontAwesomeIcon icon={video ? faVideo : faVideoSlash} />
            </div>
            <div style={{ backgroundColor: screenShare ? 'var(--primary-color)' : 'var(--text-light)' }} onClick={() => setScreenShare(!screenShare)} >
                <FontAwesomeIcon icon={faShareSquare} />
            </div>
            <div style={{ backgroundColor: chat ? 'var(--primary-color)' : 'var(--text-light)' }} onClick={() => setChat(!chat)} >
                <FontAwesomeIcon icon={faMessage} />
            </div>

            <div style={{ backgroundColor: 'tomato' }} onClick={() => endCall()} >
                <FontAwesomeIcon icon={faPhone} />
            </div>
        </div>
    )
}
