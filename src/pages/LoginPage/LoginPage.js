import React, { useState, useContext } from 'react';
import Login, { Email, Password, Title, Submit, Logo, Footer } from '@react-login-page/page4';

import logo from '../../assets/images/logo.png';
import './LoginPage.css'
import { UserContext } from '../../context/UserContext';
import UserServices from '../../services/user.s';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';


const css = {
    '--login-bg': '#f3f2f2',
    '--login-color': '#333',
    '--login-logo': '#fff',
    '--login-inner-bg': '#fff',
    '--login-banner-bg': '#fbfbfb',
    '--login-input': '#333',
    '--login-input-icon': '#dddddd',
    '--login-input-bg': 'transparent',
    '--login-input-border': 'rgba(0, 0, 0, 0.13)',
    '--login-input-placeholder': '#999999',
    '--login-btn': '#fff',
    '--login-btn-bg': '#b08bf8',
    '--login-btn-bg-focus': '#b08bf8',
    '--login-btn-bg-hover': '#b08bf8',
    '--login-btn-bg-active': '#b08bf8',
};

function LoginPage(props) {
    const navigate = useNavigate();
    const { loginContext } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async (event) => {
        event.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);


        try {
            const response = await UserServices.fetchToLogin(email, password);

            if (response.statusCode === 200) {
                console.log('Login success:', response);
                toast.success('Đăng nhập thành công !');
                console.log('Login success:', response.data);
                loginContext(response.data);
                navigate('/admin/dashboard');
            }
            else if (response.statusCode === 500) {
                toast.error(response.message);
                console.log('Login failed:', response.message);
            }

        }
        catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <Login style={{ height: "100vh", ...css }}>
            <Logo>
                <img src={logo} height={20} alt="Logo" />
            </Logo>
            <Title label="Đăng nhập">Đăng nhập</Title>
            <Email name="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Password label="Mật khẩu" name="userPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Submit onClick={handleLogin}>Đăng nhập</Submit>
            <Footer>
                <a href="/">Về trang chủ</a>
            </Footer>
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

        </Login>
    );
};


export default LoginPage;
