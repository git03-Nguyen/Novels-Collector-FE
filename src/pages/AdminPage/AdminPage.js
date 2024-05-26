import React from 'react';
import { Link } from 'react-router-dom';
import './AdminPage.css'

function AdminPage(props) {
    return (
        <>
            <h1>AdminPage</h1>
            <div id="menu" >
                <div class="container text-center ">
                    <ul class="row align-items-start ul-admin ">
                        <li class="col">
                            <Link className='btn btn-primary my-3 py-4' to='/admin/account'>Quản lý sub-admin</Link>
                        </li>
                        <li class="col">
                            <Link className='btn btn-primary my-3 py-4' to='/admin/category'>Quản lý các nguồn API tiểu thuyết</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
export default AdminPage;