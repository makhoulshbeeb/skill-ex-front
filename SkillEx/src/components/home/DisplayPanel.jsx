import { useNavigate } from 'react-router-dom';
import './styles/DisplayPanel.css'

export default function DisplayPanel({course}) {
    const navigate = useNavigate();
    return (

        <div onClick={() => { navigate(`/course/${course['_id']}`)}} className="panel">
            <img src={`${course['thumbnail']}`} />
            <div className="course-panel-row">
                <span>{course['name']}</span>
            </div>
            <div className="course-panel-row">
                <span>{course['lessons'].length} Lessons</span>
                <span>{course['time']}</span>
            </div>
        </div>

    );
}
