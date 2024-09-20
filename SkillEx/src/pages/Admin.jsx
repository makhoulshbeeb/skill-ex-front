import { useState } from 'react'
import AdminSideBar from '../components/admin/AdminSideBar'
import './styles/Admin.css'
import CategoriesAdminPanel from '../components/admin/CategoriesAdminPanel'
import UsersAdminPanel from '../components/admin/UsersAdminPanel'
import { useGetAdminByTokenQuery } from '../api/UsersApi'

export default function Admin() {
    const [panel, setPanel] = useState();
    const { data: admin, isLoading, isSuccess, isError, error } = useGetAdminByTokenQuery();

    return (
        <>
            <img src={'/SkillEx Background 5.png'} alt="SkillEx Admin Background" className="bg" />

            <div className='admin-page'>
                {isSuccess
                    ? <><AdminSideBar panel={panel} setPanel={setPanel} />
                        <hr></hr>
                        {panel == 'Categories' && <CategoriesAdminPanel />}
                        {panel == 'Users' && <UsersAdminPanel me={admin} />}</>
                    : isError && <h2>{error.data.error}</h2>}
            </div>
        </>
    )
}
