import categoryList from '../mockData/categoryList.json'

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
    fetchCategories,
}


export default CategoryService;