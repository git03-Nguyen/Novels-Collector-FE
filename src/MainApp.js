// src/MainApp.js
import React, { useContext } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import BreadCrumb from './Components/BreadCrumb/BreadCrumb';
import IndexRoute from './routes/IndexRoute';
import { NovelContext } from './context/NovelContext';

function MainApp() {
    const { isLoadingNovel } = useContext(NovelContext);

    return (
        <div className="App">
            <Header />
            <BreadCrumb />
            <div className="app-container">
                {isLoadingNovel === true ?
                    <h1 className='loading-message'>... Loading Data ...</h1>
                    : <IndexRoute />}
            </div>
            <Footer />
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default MainApp;
