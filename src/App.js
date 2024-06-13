// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainApp from './MainApp';
import AdminApp from './pages/AdminPage/AdminApp';


function App() {

  return (
    <Routes>
      <Route path="/admin/*" element={
        <AdminApp />} />
      <Route path="/*" element={<MainApp />} />
    </Routes>

  );

}

export default App;
