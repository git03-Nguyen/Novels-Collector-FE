import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import ListNovelPage from '../pages/ListNovelPage/ListNovelPage';
import AdminPage from '../pages/AdminPage/AdminPage';
import PageNotFound from '../pages/PageNotFound/PageNotFound';
import NovelPage from '../pages/NovelPage/NovelPage';
import NovelChapterPage from '../pages/NovelChapterPage/NovelChapterPage';
import PrivateRoute from './PrivateRoute';
function IndexRoute(props) {
    return (
        <Routes>
            {/* Public */}
            <Route path='/' element={<HomePage />} />
            <Route path='/novel-list' element={<ListNovelPage />} />
            {/* <Route path='/novel' element={<NovelPage />} /> */}
            <Route path='/novel/:novelSlug' element={<NovelPage />} />
            <Route path='/novel/:novelSlug/chapter/:chapterID' element={<NovelChapterPage />} />

            {/* Private */}
            <Route path='/admin/' element={<AdminPage />} />
            {/* TODO: Fix it when complete login feature */}
            <Route path="/admin/:adminID" element={<PrivateRoute>
                <AdminPage />
            </PrivateRoute>}
            />

            {/* Not Found */}
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    );
}

export default IndexRoute;