import axios from '../configs/axios';

import { UserContext } from '../context/UserContext';
const fetchListhUsers = async () => {
    try {
        const response = await axios.get(`/api/v1/user/`, {
            headers: {
                'Authorization': `Bearer ${UserContext.data.token}`,
                'Content-Type': 'application/json',
            }
        });
        if (response) {
            return {
                statusCode: response.statusCode ?? 200,
                message: response.message,
                data: response?.data ?? {},
            }
        }
    } catch (error) {
        console.log("Error fetching list users: " + error.message);
        return {
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!"
        }
    }
}

const fetchToLogin = async (email, password) => {
    try {
        const response = await axios.post(`/api/v1/auth/login`, { email, password });
        console.log('Response:', response)
        if (response) {
            return {
                statusCode: response.statusCode ?? 200,
                message: response.message,
                data: response ? response : {},
            }
        }
    } catch (error) {
        console.log("Error login: " + error.message);
        return {
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!"
        }
    }
}

const UserServices = {
    fetchListhUsers,
    fetchToLogin
}

export default UserServices;