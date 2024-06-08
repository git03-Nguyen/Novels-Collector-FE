import React from 'react';
import { Link } from 'react-router-dom';
import './AdminPage.css'


function AdminPage(props) {
    return (
        <>
            <h1>Admin</h1>
            <div id="menu" >
                <div className="container text-center ">
                    <ul className="row align-items-start ul-admin ">
                        <li className="col">
                            <Link className='btn btn-primary my-3 py-4' to='/admin/account'>Quản lý sub-admin</Link>
                        </li>
                        <li className="col">
                            <Link className='btn btn-primary my-3 py-4' to='/admin/source'>Quản lý các nguồn API tiểu thuyết</Link>
                        </li>
                        <li className="col">
                            <Link className='btn btn-primary my-3 py-4' to='/admin/exporter'>Quản lý định dạng tiểu thuyết</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
export default AdminPage;