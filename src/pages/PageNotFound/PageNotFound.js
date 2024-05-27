import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css'

function PageNotFound(props) {
    return (
        <>
        <div className="page-not-found">
        <div className="error-content">
            <p className="error-message">Oops! The page you're looking for doesn't exist</p>
            <a href="/" className="home-link">Go back to Home</a>
        </div>
        </div>
        </>
    );
}

export default PageNotFound;