import React from 'react'

export default function AdminSideBar({ setPanel }) {
    return (
        <div className='admin-sidebar'>
            <div className="admin-sidebar-header">
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    fontSize={"1.5rem"}
                    color="var(--background-color)"
                    style={{ backgroundColor: "var(--primary-color)", padding: "0.5rem 0.6rem", borderRadius: "1.5rem", cursor: "pointer" }}
                    onClick={(e) => navigate(-1)}
                />
                <div>Admin</div>
            </div>
        </div>
    )
}
