import axios from '../configs/axios';
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const useFetchListUsers = () => {
    const { user } = useContext(UserContext);

    const fetchListUsers = async () => {
        try {
            console.log('User:', user.token);
            const response = await axios.get(`${process.env.REACT_APP_SERVER_HTTPS_URL}api/v1/user/`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response?.statusCode === 200) {
                return {
                    statusCode: response.statu ?? 200,
                    message: response.message,
                    data: response?.data ?? {},
                }
            } else if (response?.statusCode === 401) {
                return {
                    statusCode: response.status,
                    message: "Lỗi chưa đăng nhập",
                    data: null,
                }
            }
        } catch (error) {
            console.log("Error fetching list users: " + error.message);
            return {
                statusCode: 401,
                data: null,
                message: "Chưa đăng nhập!"
            }
        }
    };

    return fetchListUsers;
};

const fetchAPILogin = async (email, password) => {
    try {
        const response = await axios.post(`/api/v1/auth/login`, { email, password });
        console.log('Response:', response)
        if (response.statusCode === 200) {
            return {
                statusCode: response.statusCode,
                message: response.message,
                data: response ? response : {},
            }
        }
        else if (response.statusCode === 500) {
            return {
                statusCode: response.statusCode,
                message: "Email hoặc mật khẩu không đúng!",
            }
        }
    } catch (error) {
        console.log("Error login: " + error.message);
        return {
            statusCode: 500,
            data: null,
            message: "Email hoặc mật khẩu không đúng!",
        }
    }
}

const UserServices = {
    useFetchListUsers,
    fetchAPILogin
}

export default UserServices;