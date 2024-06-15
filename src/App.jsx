// src/App.js
import React, {useState, useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import MainApp from './MainApp';
import AdminApp from './pages/AdminPage/AdminApp';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {

  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    if (isDarkMode) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}, [isDarkMode])

  return (
    <Routes>
      <Route path="/admin/*" element={
        <AdminApp />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<MainApp 
      isDarkMode={isDarkMode}
      setIsDarkMode={setIsDarkMode}/>} />
    </Routes>

  );

}

export default App;
