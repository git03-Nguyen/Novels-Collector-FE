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

const PluginSourceService = {
    fetchPluginSources,
}

export default PluginSourceService;