import axios from '../configs/axios';

// Helper function to get user token from context
const getUserToken = () => {
    // get user token from local storage
    return localStorage.getItem('token') ?? '';
}

const fetchPluginExporters = async () => {
    try {
        const token = getUserToken();
        const response = await axios.get('/api/v1/exporter', {
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
            };
        }
        else if (response.statusCode === 401) {
            return {
                statusCode: 401,
                data: null,
                message: "Unauthorized!"
            }
        }
    } catch (error) {
        console.log("Error fetching plugin exporters: " + error.message);
        return {
            statusCode: 401,
            data: null,
            message: "Unauthorized",
        };
    }
};

const unloadPluginExporter = async (exporterName) => {
    try {
        const token = getUserToken();
        const response = await axios.get(`/api/v1/exporter/unload/${exporterName}`, {
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
            };
        }
    } catch (error) {
        console.log("Error while unloading exporter: " + error.message);
        return {
            statusCode: 401,
            data: null,
            message: "Unauthorized!"
        };
    }
};

const reloadPluginExporter = async (exporterName) => {
    try {
        const token = getUserToken();
        const response = await axios.get(`/api/v1/exporter/load/${exporterName}`, {
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
            };
        }
    } catch (error) {
        console.log("Error while reloading exporter: " + error.message);
        return {
            statusCode: 401,
            data: null,
            message: "Unauthorized!"
        };
    }
};


const deletePluginExporter = async (exporterName) => {
    try {
        const token = getUserToken();
        const response = await axios.delete(`/api/v1/exporter/delete/${exporterName}`, {
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
            };
        }
    } catch (error) {
        console.log("Error while removing exporter: " + error.message);
        return {
            statusCode: 401,
            data: null,
            message: "Unauthorized!"
        };
    }
};

const uploadPluginExporter = async (formData) => {
    try {
        const token = getUserToken();
        const response = await axios.post('/api/v1/exporter/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response) {
            return {
                statusCode: response.statusCode ?? 200,
                message: response.message,
                data: response?.data ?? {},
                meta: response?.meta ?? {},
            };
        }
    } catch (error) {
        console.log("Error while uploading exporter: " + error.message);
        return {
            statusCode: 401,
            data: null,
            message: "Unauthorized!"
        };
    }
};

const PluginExporterService = {
    fetchPluginExporters,
    unloadPluginExporter,
    reloadPluginExporter,
    deletePluginExporter,
    uploadPluginExporter,
};

export default PluginExporterService;
