import { faMicrophone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

export default function VideoBar() {
    const [mic, setMic] = useState(false);
    const [camera, setCamera] = useState(false);
    const [screenShare, setScreenShare] = useState(false);
    return (
        <div className='video-bar'>
        </div>
    )
}
