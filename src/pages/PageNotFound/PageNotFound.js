import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css'

function PageNotFound(props) {
    return (
        <div className="page-not-found">
            <div className="error-content">
                <p className="error-message">Oops! Trang bạn đang tìm kiếm không tồn tại ...</p>
                <Link to="/" className="home-link">Về trang chủ thôi nào</Link>
            </div>
        </div>
    );
}

export default PageNotFound;