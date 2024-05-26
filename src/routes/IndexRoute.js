import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import ListNovelPage from '../pages/ListNovelPage/ListNovelPage';
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
                <Route path='/admin' element="Admin page. TODO: add admin Page" />


                {/* Not Found */}
                {/* TODO: Add NotFoundPage */}
                <Route path='*' element="Có vẻ bạn đã bị lạc? Hãy trở về trang chủ của chúng tôi" />
            </Routes>
        </div>
    );
}

export default IndexRoute;