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
                            <a class="button" href="/admin/account">Quản lý sub-admin</a>
                        </li>
                        <li class="col ">
                            <a class="button" href="/admin/category">Quản lý các nguồn API tiểu thuyết,</a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
export default AdminPage;