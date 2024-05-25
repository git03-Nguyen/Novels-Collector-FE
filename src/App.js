import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import IndexRoute from './routes/IndexRoute';

function App() {
  return (
    <div className="App">
      <Header />

      <div className='app-container'>
        <IndexRoute />
      </div>

      <Footer />
    </div>
  );
}

export default App;
