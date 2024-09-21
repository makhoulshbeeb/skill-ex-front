import { faMessage, faMicrophone, faMicrophoneSlash, faPhone, faShareSquare, faVideo, faVideoSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useCallContext } from '../../context/CallContext';
import VideoTextMessages from './VideoTextMessages';
import { useSelector } from 'react-redux';

export default function VideoBar() {
    const { audio, video, leaveCall, toggleMedia } = useCallContext();
    const [screenShare, setScreenShare] = useState(false);
    const [chat, setChat] = useState(false);
    const videoReceiver = useSelector(state => state.videoReceiver);

    return (
        <>
            <div className='video-bar'>
                <div style={{ backgroundColor: audio ? 'var(--shadow-color)' : 'tomato' }} onClick={() => toggleMedia('audio')}>
                    <FontAwesomeIcon icon={audio ? faMicrophone : faMicrophoneSlash} />
                </div>
                <div style={{ backgroundColor: video ? 'var(--shadow-color)' : 'tomato' }} onClick={() => toggleMedia('video')}>
                    <FontAwesomeIcon icon={video ? faVideo : faVideoSlash} />
                </div>
                <div style={{ backgroundColor: screenShare ? 'var(--primary-color)' : 'var(--shadow-color)' }} onClick={() => setScreenShare(!screenShare)} >
                    <FontAwesomeIcon icon={faShareSquare} />
                </div>
                <div style={{ backgroundColor: chat ? 'var(--primary-color)' : 'var(--shadow-color)' }} onClick={() => setChat(!chat)} >
                    <FontAwesomeIcon icon={faMessage} />
                </div>

                <div style={{ backgroundColor: 'tomato' }} onClick={() => leaveCall(videoReceiver)} >
                    <FontAwesomeIcon icon={faPhone} />
                </div>
            </div>
            <VideoTextMessages open={chat} />
        </>
    )
}
