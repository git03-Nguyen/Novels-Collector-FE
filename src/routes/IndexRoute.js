import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import ListNovelPage from '../pages/ListNovelPage/ListNovelPage';
import AdminPage from '../pages/AdminPage/AdminPage';
import PageNotFound from '../pages/PageNotFound/PageNotFound';
function IndexRoute(props) {
    return (
        <div>
            <Routes>
                {/* Public */}
                <Route path='/' element={<HomePage />} />
                <Route path='/novel-list' element={<ListNovelPage />} />
                <Route path='/novel' element="Novel page. TODO: add Novel Detail Page" />
                <Route path='/novel/:chapterID' element={<HomePage />} />

                {/* Private */}
                <Route path='/admin' element={<AdminPage/>} />
                
                {/* Not Found */}
                {/* TODO: Add NotFoundPage "Có vẻ bạn đã bị lạc? Hãy trở về trang chủ của chúng tôi" */}
                <Route path='*' element={<PageNotFound/>}/>
            </Routes>
        </div>
    );
}

export default IndexRoute;