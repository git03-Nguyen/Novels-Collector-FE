import axios from '../configs/axios';

// TODO: Delete this after getting server's API to fetch Categories
import categoryList from '../mockData/categoryList.json'

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
    } catch (error) {
        console.log("Error fetching test API: " + error.message);
        return {
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!"
        }
    }
}

const fetchCategories = async () => {
    //This is mock API, replace it with server's API

    let result = categoryList.sort((a, b) => b.rating - a.rating);
    if (result) {
        return {
            statusCode: 200,
            data: result,
            message: "Get all categories successfully !"
        }
    }
    return {
        statusCode: 404,
        data: null,
        message: "Category not found !"
    }
}

const CategoryService = {
    fetchTestAPI,
    fetchCategories,
}


export default CategoryService;