import React from 'react'
import { useCallContext } from '../../context/CallContext';
import { useSelector } from 'react-redux';
import { useGetUserByTokenQuery } from '../../api/UsersApi';

export default function VideoStream() {
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useCallContext();
    const videoReceiver = useSelector(state => state.videoReceiver);
    const { data: me, isSuccess } = useGetUserByTokenQuery();
    return (
        <div className='video-stream'>
            <div className='pinned-stream'>
                <video playsInline ref={userVideo} autoPlay className='video-stream-panel' />
                <img src={videoReceiver.picture} />
            </div>
            <div>
                <video playsInline muted ref={myVideo} autoPlay className='video-stream-panel' />
                <img src={isSuccess && me.picture} />
            </div>
            <div>Video 3</div>
            <div>Video 4</div>
        </div>
    )
}
