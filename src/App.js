import './App.css';
import { Link } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import IndexRoute from './routes/IndexRoute';

//Toastify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Header />

      <div className='app-breadcrumb'>
        <Link to="/">
          Trang chủ
        </Link>
      </div>
      <div className='app-container'>
        <IndexRoute />
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
