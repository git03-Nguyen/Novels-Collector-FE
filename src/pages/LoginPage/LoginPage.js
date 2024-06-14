import React from 'react';
import Login, { Email, Password, Title, Submit, Logo, Reset } from '@react-login-page/page4';

import logo from '../../assets/images/logo.png';
// Check the imported components
import './LoginPage.css'
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

const LoginPage = () => (
    <Login style={{ height: "100vh", ...css }}>
        <Login.Password>
            <div></div>
        </Login.Password>
        <Submit>Đăng nhập</Submit>
        <Email name="Email" label="Email" />
        <Password label="Mật khẩu" name="userPassword" />
        <Logo>
            <img src={logo} height={20} />
        </Logo>
        <Title label="Đăng nhập">Đăng nhập</Title>

    </Login>
);


export default LoginPage;
