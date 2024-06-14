import axios from '../configs/axios';
import { UserContext } from '../context/UserContext';

// Helper function to get user token from context
const getUserToken = () => {
    // get user token from local storage
    return localStorage.getItem('token') ?? '';
};

const fetchListUsers = async () => {
    try {
        const token = getUserToken();

        const response = await axios.get(`/api/v1/user/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        if (response) {
            return {
                statusCode: response.status ?? 200,
                message: response.message ?? "",
                data: response.data ?? [],
            };
        }
    } catch (error) {
        console.log("Error fetching list users: " + error.message);
        return {
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!"
        };
    }
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
            message: "Cannot connect to server!"
        }
    }
}

const fetchAddUser = async (email, password, role) => {
    const token = getUserToken();

    try {
        if (!email || !password || !role) {
            return {
                statusCode: 400,
                data: null,
                message: "Missing required fields!"
            };
        }

        const token = getUserToken();
        const response = await axios.post(`/api/v1/auth/register`, { email, password, role }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        return response;

    } catch (error) {
        console.log("Error adding user: " + error.message);
        return {
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!"
        };
    }
};

const fetchDeleteUser = async (id) => {
    const token = getUserToken();

    try {
        if (!id) {
            return {
                statusCode: 400,
                data: null,
                message: "Missing required fields!"
            };
        }

        const response = await axios.delete(`/api/v1/user/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        console.log('fetchDeleteUser::Response:', response);
        if (response) {
            return {
                statusCode: response.status ?? 200,
                message: response.message,
                data: response.data,
            };
        }
    } catch (error) {
        console.log("Error deleting user: " + error.message);
        return {
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!"
        };
    }
};


const UserServices = {
    fetchListUsers,
    fetchToLogin,
    fetchAddUser,
    fetchDeleteUser
}

export default UserServices;