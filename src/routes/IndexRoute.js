import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import ListNovelPage from '../pages/ListNovelPage/ListNovelPage';
import PageNotFound from '../pages/PageNotFound/PageNotFound';
import NovelPage from '../pages/NovelPage/NovelPage';
import NovelChapterPage from '../pages/NovelChapterPage/NovelChapterPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import PrivateRoute from './PrivateRoute';

function IndexRoute({ darkMode }) {
    return (
        <Routes>
            {/* Public */}
            <Route path='/' element={<HomePage darkMode={darkMode}/>} />



            <Route path='/novel-list' element={<ListNovelPage darkMode={darkMode}/>} />

            <Route path='/source/:sourceSlug' element={<HomePage darkMode={darkMode}/>} />
            <Route path='/source/:sourceSlug/novel/:novelSlug' element={<NovelPage darkMode={darkMode}/>} />
            <Route path='/source/:sourceSlug/novel/:novelSlug/chapter/:chapterSlug' element={<NovelChapterPage darkMode={darkMode}/>} />

            {/* Private */}
            {/* <Route path='/login/' element={<LoginPage />} /> */}


            {/* TODO: Fix it when complete login feature
            <Route path="/admin/:adminID" element={<PrivateRoute>
                <AdminPage />
            </PrivateRoute>}
            /> */}

            {/* Not Found */}
            <Route path='*' element={<PageNotFound darkMode={darkMode}/>} />
        </Routes>
    );
}

export default IndexRoute;