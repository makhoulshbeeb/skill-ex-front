import "./styles/CategoryDisplayPanel.css";
import { useNavigate } from 'react-router-dom';

export default function CategoryDisplayPanel({ category }) {
    const navigate = useNavigate();
    return (

        <div onClick={() => { navigate(`/search/?search=&filters=%2C${[category.name.replace('&', '%26')]}`) }} className="category-panel">
            <img src={`${category.picture}`} />
            <h3>{category.name}</h3>
        </div>

    );
}
