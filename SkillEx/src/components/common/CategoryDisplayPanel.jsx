import "./styles/CategoryDisplayPanel.css";
import { useNavigate } from 'react-router-dom';

export default function CategoryDisplayPanel({ category }) {
    const navigate = useNavigate();
    return (

        <div onClick={() => { navigate(`/category/${category.name}`) }} className="category-panel">
            <img src={`${category.picture}`} />
            <h3>{category.name}</h3>
        </div>

    );
}
