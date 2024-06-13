import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//Font Awesome
import 'font-awesome/css/font-awesome.min.css';
import { UserProvider } from './context/UserContext';
import { NovelProvider } from './context/NovelContext';
import { LoadingProvider } from './context/LoadingContext';
import 'core-js'




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <LoadingProvider>
      <NovelProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </NovelProvider>
    </LoadingProvider>
  </BrowserRouter>
  // </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
