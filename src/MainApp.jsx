// src/MainApp.js
import React, { useContext, useEffect, useState } from 'react';
import './App.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import BreadCrumb from './Components/BreadCrumb/BreadCrumb';
import IndexRoute from './routes/IndexRoute';
import { NovelContext } from './context/NovelContext';
import LoadingLayer from './Components/LoadingLayer/LoadingLayer';
import { LoadingContext } from './context/LoadingContext';

function MainApp({isDarkMode, setIsDarkMode}) {
    const { isLoadingContext } = useContext(LoadingContext);
    

    const [isLoadingApp, setIsLoadingApp] = useState(isLoadingContext);


    useEffect(() => {
        if (isLoadingContext === true) {
            console.log("loading ... ");
        } else {
            console.log('Loaded !');
        }
        setIsLoadingApp(isLoadingContext);
    }, [isLoadingContext])

    
    return (
        <div className={`App ${isDarkMode ? 'dark-mode' : ''} `}>
            <Header
                darkMode={isDarkMode}
                setdarkMode={setIsDarkMode}
            />
            <BreadCrumb darkMode={isDarkMode}/>
            <div className="app-container">
                {isLoadingApp === true && <LoadingLayer darkMode={isDarkMode} />}
                <IndexRoute darkMode={isDarkMode}/>
            </div>
            <Footer darkMode={isDarkMode}/>
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