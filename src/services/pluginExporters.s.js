import axios from '../configs/axios'

const fetchPluginExporters = async () => {
    try {
        const response = await axios.get('/api/v1/exporter');
        if (response) {
            return {
                statusCode: response.statusCode ?? 200,
                message: response.message,
                data: response?.data ?? {},
            }
        }
    } catch (error) {
        console.log("Error fetching plugin exporters: " + error.message);
        return {
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!"
        }
    }
}

const reloadAllExporters = async () => {
    try {
        const response = await axios.get('/api/v1/exporter/reload');
        if (response) {
            return {
                statusCode: response.statusCode ?? 200,
                message: response.message,
                data: response?.data ?? {},
            }
        }
    } catch (error) {
        console.log("Error reloading all plugin exporters: " + error.message);
        return {
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!"
        }
    }
}

const PluginExporterService = {
    fetchPluginExporters,
    reloadAllExporters,
}

export default PluginExporterService;