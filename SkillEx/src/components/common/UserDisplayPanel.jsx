import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/UserDisplayPanel.css";
import { useNavigate } from 'react-router-dom';
import { faStar, faStarHalf, faStarHalfAlt, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";


export default function UserDisplayPanel({ user }) {
    const navigate = useNavigate();
    return (

        <div className="user-panel" onClick={() => { navigate(`/user/${user.username}`) }} >
            <div className="user-panel-picture" style={{ backgroundImage: 'url(/User Panel Background.png)' }}>
                <img src={`${user.picture}`} alt={`${user.username}'s Picture`} />
            </div>
            <div className="user-panel-details">
                <div>
                    <h2>{user.displayName}</h2>
                    <h3>{user.teach[0].category.name}</h3>
                </div>
                <div className="user-panel-rating">
                    {[1, 2, 3, 4, 5].map((el) => {
                        if (user.avgRating - el >= 0) {
                            return (<FontAwesomeIcon icon={faStar} color="gold" />)
                        } else if (user.avgRating - el <= -1) {
                            return (<FontAwesomeIcon icon={faStarOutline} color="gold" />)
                        } else {
                            return (<FontAwesomeIcon icon={faStarHalfStroke} color="gold" />)
                        }

                    })}
                    <span>&nbsp;&nbsp;{Math.round(user.avgRating * 10) / 10}</span>
                </div>
                <p>{user.bio}</p>
            </div>
        </div>

    );
}
