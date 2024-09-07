import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/UserDisplayPanel.css";
import { useNavigate } from 'react-router-dom';
import { faStar, faStarHalf, faStarHalfAlt, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";


export default function UserDisplayPanel({ user }) {
    const navigate = useNavigate();
    return (

        <div onClick={() => { navigate(`/user/${user.username}`) }} className="user-panel">
            <div className="user-picture" style={{ backgroundImage: 'url(/User Panel Background.png)' }}>
                <img src={`${user.picture}`} />
            </div>
            <div>
                <h2>{user.displayName}</h2>
                <div>
                    {[1, 2, 3, 4, 5].map((el) => {
                        if (user.avgRating - el >= 0) {
                            return (<FontAwesomeIcon icon={faStar} color="gold" />)
                        } else if (user.avgRating - el <= -1) {
                            return (<FontAwesomeIcon icon={faStarOutline} color="gold" />)
                        } else {
                            return (<FontAwesomeIcon icon={faStarHalfStroke} color="gold" />)
                        }

                    })}
                    <span>{user.avgRating}</span>
                </div>
            </div>
        </div>

    );
}
