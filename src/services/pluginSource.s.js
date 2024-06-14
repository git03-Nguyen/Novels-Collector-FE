
import axios from '../configs/axios'

// Helper function to get user token from context
const getUserToken = () => {
    // get user token from local storage
    return localStorage.getItem('token') ?? '';
};

const fetchPluginSources = async () => {
    try {
        const token = getUserToken();
        const response = await axios.get('/api/v1/source', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (response.statusCode === 200) {
            return {
                statusCode: response.statusCode ?? 200,
                message: response.message,
                data: response?.data ?? {},
            }
        }
        else if (response.statusCode === 401) {
            return {
                statusCode: 401,
                data: null,
                message: "Unauthorized!"
            }
        }
    } catch (error) {
        console.log("Error fetching plugin sources: " + error?.message ?? {});
        return {
            statusCode: 401,
            data: null,
            message: "Unauthorized!"
        }
    }
}

const unloadPluginSource = async (sourceName) => {
    try {
        const token = getUserToken();
        const response = await axios.get(`/api/v1/source/unload/${sourceName}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        console.log("Response: " + response.message);
        if (response) {
            return {
                statusCode: response.statusCode ?? 200,
                message: response.message,
                data: response?.data ?? {},
            }
        }

    } catch (error) {
        console.log("Error while unloading source: " + error.message);
        return {
            statusCode: 401,
            data: null,
            message: "Unauthorized!"
        }
    }
}

const reloadPluginSource = async (sourceName) => {
    try {
        const token = getUserToken();
        const response = await axios.get(`/api/v1/source/load/${sourceName}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
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
        console.log("Error while reloading source: " + error.message);
        return {
            statusCode: 401,
            data: null,
            message: "Unauthorized!"
        }
    }
}

const deletePluginSource = async (sourceName) => {
    try {
        const token = getUserToken();
        const response = await axios.delete(`/api/v1/source/delete/${sourceName}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
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
        console.log("Error while removing source: " + error.message);
        return {
            statusCode: 401,
            data: null,
            message: "Unauthorized!"
        }
    }
}

const uploadPluginSource = async (formData) => {
    try {
        const token = getUserToken();
        const response = await axios.post('/api/v1/source/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            }
        });
        if (response) {
            return {
                statusCode: response.statusCode ?? 200,
                message: response?.message ?? {},
                data: response?.data ?? {},
                meta: response?.meta ?? {}
            }
        }
    } catch (error) {
        console.log("Error while uploading source: " + error.message);
        return {
            statusCode: 401,
            data: null,
            message: "Unauthorized!"
        }
    }
};
const PluginSourceService = {
    fetchPluginSources,
    unloadPluginSource,
    reloadPluginSource,
    deletePluginSource,
    uploadPluginSource
}

export default PluginSourceService;