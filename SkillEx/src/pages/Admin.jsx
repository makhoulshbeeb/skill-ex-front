import { useState } from 'react'
import AdminSideBar from '../components/admin/AdminSideBar'
import './styles/Admin.css'
import CategoriesAdminPanel from '../components/admin/CategoriesAdminPanel'
import UsersAdminPanel from '../components/admin/UsersAdminPanel'

export default function Admin() {
    const [panel, setPanel] = useState()
    return (
        <>
            <img src={'/SkillEx Background 5.png'} alt="SkillEx Admin Background" className="bg" />

            <div className='admin-page'>
                <AdminSideBar panel={panel} setPanel={setPanel} />
                <hr></hr>
                {panel == 'Categories' && <CategoriesAdminPanel />}
                {panel == 'Users' && <UsersAdminPanel />}
            </div>
        </>
    )
}
