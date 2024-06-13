import axios from '../configs/axios';

const fetchTestAPI = async () => {
    try {
        const response = await axios.get('/api/v1');
        if (response) {
            return {
                statusCode: response.statusCode ?? 200,
                message: response.message,
                data: response?.data ?? {},
            }
        }

        return {
            statusCode: 404,
            data: null,
            message: "Test API not found !"
        }
    } catch (error) {
        console.log("Error fetching test API: " + error.message);
        return {
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!"
        }
    }
}

const fetchCategories = async (source) => {
    try {
        const response = await axios.get(`/api/v1/category/${source}`);
        if (response) {
            return {
                statusCode: response.statusCode ?? 200,
                message: response.message,
                data: response?.data ?? {},
                meta: response?.meta ?? {},
            }
        }
        return {
            statusCode: 404,
            data: null,
            message: "Category list not found !"
        }
    } catch (error) {
        console.log("Error fetching category list: " + error.message);
        return {
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!"
        }
    }
}

const fetchNovelListByCategory = async (source, categorySlug, page) => {
    try {
        const response = await axios.get(`/api/v1/category/${source}/${categorySlug}?page=${page}`);
        if (response) {
            return {
                statusCode: response.statusCode ?? 200,
                message: response.message,
                data: response?.data ?? {},
                meta: response?.meta ?? {},
            }
        }
        return {
            statusCode: 404,
            data: null,
            message: "Novel list by category not found !"
        }
    } catch (error) {
        console.log("Error fetching novel list by category: " + error.message);
        return {
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!"
        }
    }
}

const CategoryService = {
    fetchTestAPI,
    fetchCategories,
    fetchNovelListByCategory,
}


export default CategoryService;