import './App.css';
import { Link } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import IndexRoute from './routes/IndexRoute';

//Toastify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import BreadCrumb from './Components/BreadCrumb/BreadCrumb';
import { useContext, useEffect, useState } from 'react';
import { NovelContext } from './context/NovelContext';

function App() {
  const { isLoadingNovel } = useContext(NovelContext);

  return (
    <div className="App">
      <Header />

      <BreadCrumb />

      <div className='app-container'>
        {/* {isLoadingNovel === true && <h1>Loading Novel Data ...</h1>} */}
        {isLoadingNovel === true ?
          <h1 className='loading-message'>... Loading Data ...</h1>
          : <IndexRoute />}
        {/* <IndexRoute /> */}

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

export default App;
