import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import ListNovelPage from '../pages/ListNovelPage/ListNovelPage';
import AdminPage from '../pages/AdminPage/AdminPage';
import NovelPage from '../pages/NovelPage/NovelPage';
import NovelChapterPage from '../pages/NovelChapterPage/NovelChapterPage';
function IndexRoute(props) {
    return (
        <Routes>
            {/* Public */}
            <Route path='/' element={<HomePage />} />
            <Route path='/novel-list' element={<ListNovelPage />} />
            {/* <Route path='/novel' element={<NovelPage />} /> */}
            <Route path='/novel/:novelID' element={<NovelPage />} />
            <Route path='/novel/:novelID/chapter/:chapterID' element={<NovelChapterPage />} />

            {/* Private */}
            <Route path='/admin' element={<AdminPage />} />


            {/* Not Found */}
            {/* TODO: Add NotFoundPage */}
            <Route path='*' element="Có vẻ bạn đã bị lạc? Hãy trở về trang chủ của chúng tôi" />
        </Routes>
    );
}

export default IndexRoute;