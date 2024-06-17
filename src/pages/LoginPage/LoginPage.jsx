import React, { useState, useContext } from 'react';
import Login, { Title, Logo, Submit, Email, Password } from '@react-login-page/page2';

import logo from '../../assets/images/logo.png';
import './LoginPage.scss'
import { UserContext } from '../../context/UserContext';
import UserServices from '../../services/user.s';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';


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
        <Login style={{ height: "100vh" }}>
            <Title label="Đăng nhập">Đăng nhập<br /><h5 className="login-subtitle">Với vai trò Quản trị viên</h5></Title>
            <Login.Banner>
                <h1 className="app-name">NOVEL COLLECTOR</h1>
                <img className="logo-img" src={logo} />
                {/* <a href="/" className="return-home">Về trang chủ</a> */}
            </Login.Banner>
            <Email name="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Password label="Mật khẩu" name="userPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Submit onClick={handleLogin} className="login-submit-btn">Đăng nhập</Submit>
            <Logo>  </Logo>

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
        </Login >
    );
};


export default LoginPage;
