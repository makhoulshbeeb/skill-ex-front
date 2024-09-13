import './styles/Video.css'
import VideoBar from "../components/video/VideoBar";
import VideoStream from '../components/video/VideoStream';

export default function Video() {
    return (
        <div className='video-page'>
            <VideoStream />
            <VideoBar />
        </div>
    )
}
