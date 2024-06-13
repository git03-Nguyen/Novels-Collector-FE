import axios from '../configs/axios';

const fetchPluginExporters = async () => {
    try {
        const response = await axios.get('/api/v1/exporter');
        if (response) {
            return {
                statusCode: response.statusCode ?? 200,
                message: response.message,
                data: response?.data ?? {},
            };
        }
    } catch (error) {
        console.log("Error fetching plugin exporters: " + error.message);
        return {
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!",
        };
    }
};

const unloadPluginExporter = async (exporterName) => {
    try {
        const response = await axios.get(`/api/v1/exporter/unload/${exporterName}`);
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
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!",
        };
    }
};

const reloadPluginExporter = async (exporterName) => {
    try {
        const response = await axios.get(`/api/v1/exporter/load/${exporterName}`);
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
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!",
        };
    }
};

const reloadAllExporters = async () => {
    try {
        const response = await axios.get('/api/v1/exporter/reload');
        if (response) {
            return {
                statusCode: response.statusCode ?? 200,
                message: response.message,
                data: response?.data ?? {},
            };
        }
    } catch (error) {
        console.log("Error reloading all plugin exporters: " + error.message);
        return {
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!",
        };
    }
};

const deletePluginExporter = async (exporterName) => {
    try {
        const response = await axios.delete(`/api/v1/exporter/delete/${exporterName}`);
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
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!",
        };
    }
};

const uploadPluginExporter = async (formData) => {
    try {
        const response = await axios.post('/api/v1/exporter/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
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
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!",
        };
    }
};

const PluginExporterService = {
    fetchPluginExporters,
    unloadPluginExporter,
    reloadPluginExporter,
    reloadAllExporters,
    deletePluginExporter,
    uploadPluginExporter,
};

export default PluginExporterService;
