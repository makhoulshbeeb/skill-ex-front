import { useNavigate } from 'react-router-dom';

export default function DisplayPanel({ category }) {
    const navigate = useNavigate();
    return (

        <div onClick={() => { navigate(`/category/${category.name}`) }} className="category-panel">
            <img src={`${category.picture}`} />
            <h2>{category.name}</h2>
        </div>

    );
}
