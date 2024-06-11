import axios from '../configs/axios'

const fetchPluginSources = async () => {
    try {
        const response = await axios.get('/api/v1/source');
        if (response) {
            return {
                statusCode: response.statusCode ?? 200,
                message: response.message,
                data: response?.data ?? {},
            }
        }
    } catch (error) {
        console.log("Error fetching plugin sources: " + error.message);
        return {
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!"
        }
    }
}

const unloadPluginSource = async (sourceName) => {
    try {
        const response = await axios.get(`/api/v1/source/unload/${sourceName}`);
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
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!"
        }
    }
}

const reloadAllSources = async () => {
    try {
        const response = await axios.get('/api/v1/source/reload');
        if (response) {
            return {
                statusCode: response.statusCode ?? 200,
                message: response.message,
                data: response?.data ?? {},
            }
        }
    } catch (error) {
        console.log("Error reloading all plugin sources: " + error.message);
        return {
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!"
        }
    }
}


const uploadPluginSource = async (url) => {
    try {
        console.log("Uploading plugin source: " + url);
        const response = await axios.post(`/api/v1/source/add`, { url }
        );
        if (response) {
            return {
                statusCode: response.statusCode ?? 200,
                message: response.message,
                data: response?.data ?? {},
                meta: response?.meta ?? {}
            };
        }
    } catch (error) {
        console.log("Error uploading plugin source: " + error.message);
        return {
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!"
        };
    }
};
const PluginSourceService = {
    fetchPluginSources,
    unloadPluginSource,
    reloadAllSources,
    uploadPluginSource
}

export default PluginSourceService;