import React from 'react'
import { useCallContext } from '../../context/CallContext';

export default function VideoStream() {
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useCallContext();
    return (
        <div className='video-stream'>
            <div className='pinned-stream'>
                <video playsInline ref={userVideo} autoPlay className='video-stream-panel' />
            </div>
            <div>
                <video playsInline muted ref={myVideo} autoPlay className='video-stream-panel' />
            </div>
            <div>Video 3</div>
            <div>Video 4</div>
        </div>
    )
}
