import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

export default function AdminSideBar({ panel, setPanel }) {
    const navigate = useNavigate();
    return (
        <div className='admin-sidebar'>
            <div className="admin-sidebar-header">
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    fontSize={"1.25rem"}
                    color="var(--background-color)"
                    style={{ backgroundColor: "var(--primary-color)", padding: "0.5rem 0.6rem", borderRadius: "1.5rem", cursor: "pointer" }}
                    onClick={(e) => navigate(-1)}
                />
                <h1>Admin</h1>
            </div>
            <hr></hr>
            <div className={`admin-sidebar-tab ${panel == 'Categories' && 'selected'}`} onClick={() => setPanel('Categories')}>
                <h3>Categories</h3>
            </div>
            <div className={`admin-sidebar-tab ${panel == 'Users' && 'selected'}`} onClick={() => setPanel('Users')}>
                <h3>Users</h3>
            </div>
        </div>
    )
}
