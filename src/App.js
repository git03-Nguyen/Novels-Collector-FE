// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainApp from './MainApp';
import AdminApp from './pages/AdminPage/AdminApp';
import store from './pages/AdminPage/store';
import { Provider } from 'react-redux';


function App() {

  return (
    <Routes>
      <Route path="/admin/*" element={<Provider store={store}>
        <AdminApp />
      </Provider>} />
      <Route path="/*" element={<MainApp />} />
    </Routes>

  );

}

export default App;
