import React from 'react';
import './LoginPage.css';

function LoginPage(props) {

    const handleLogin = async () => {
        // Handle login logic here
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card p-4">
                        <div className="card-body">
                            <form>
                                <h1>Đăng nhập</h1>
                                <p className="text-secondary">Với vai trò Quản trị viên</p>
                                <div className="input-group mb-3">
                                    <div className="input-group-text">
                                        <i className="fa-solid fa-user"></i>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Username"
                                        autoComplete="username"
                                    />
                                </div>
                                <div className="input-group mb-2">
                                    <div className="input-group-text">
                                        <i className="fa-solid fa-lock"></i>
                                    </div>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        autoComplete="current-password"
                                    />
                                </div>
                                <div className="row mb-4 justify-content-center">
                                    <div className="col-xs-6">
                                        <a href="forgot-password">
                                            Quên mật khẩu?
                                        </a>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-xs-6">
                                        <button
                                            type="button"
                                            className="btn btn-primary px-4 login-btn"
                                            onClick={handleLogin}>
                                            Đăng nhập
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
