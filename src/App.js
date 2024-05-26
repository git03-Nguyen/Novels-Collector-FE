import './App.css';
import { Link } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import IndexRoute from './routes/IndexRoute';

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
    </div>
  );
}

export default App;
