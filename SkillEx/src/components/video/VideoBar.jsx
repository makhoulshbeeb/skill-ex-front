import { faCamera, faMessage, faMicrophone, faMicrophoneSlash, faPhone, faShareSquare, faVideo, faVideoSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

export default function VideoBar() {
    const [mic, setMic] = useState(false);
    const [camera, setCamera] = useState(false);
    const [screenShare, setScreenShare] = useState(false);
    const [chat, setChat] = useState(false);

    const endCall = () => { }
    return (
        <div className='video-bar'>
            <div style={{ backgroundColor: mic ? 'var(--text-light)' : 'tomato' }} onClick={() => setMic(!mic)}>
                <FontAwesomeIcon icon={mic ? faMicrophone : faMicrophoneSlash} />
            </div>
            <div style={{ backgroundColor: camera ? 'var(--text-light)' : 'tomato' }} onClick={() => setCamera(!camera)}>
                <FontAwesomeIcon icon={camera ? faVideo : faVideoSlash} />
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
