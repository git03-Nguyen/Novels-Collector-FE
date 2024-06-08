import axios from '../configs/axios';

const fetchHotNovels = async (source, page) => {
    try {
        const response = await axios.get(`/api/v1/category/${source}/hot?page=${page}`);
        if (response) {
            return {
                statusCode: response.statusCode ?? 200,
                message: response.message,
                data: response?.data.slice(0, 10) ?? {},
                meta: response?.meta ?? {},
            }
        }
        return {
            statusCode: 404,
            data: null,
            message: "Hot novel list not found !"
        }
    } catch (error) {
        console.log("Error fetching hot novel list: " + error.message);
        return {
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!"
        }
    }
}

const fetchLatestNovels = async (source, page) => {
    try {
        const response = await axios.get(`/api/v1/category/${source}/latest?page=${page}`);
        if (response) {
            return {
                statusCode: response.statusCode ?? 200,
                message: response.message,
                data: response?.data.slice(0, 10) ?? {},
                meta: response?.meta ?? {},
            }
        }
        return {
            statusCode: 404,
            data: null,
            message: "Latest novel list not found !"
        }
    } catch (error) {
        console.log("Error fetching latest novel list: " + error.message);
        return {
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!"
        }
    }
}

const fetchCompletedNovels = async (source, page) => {
    try {
        const response = await axios.get(`/api/v1/category/${source}/completed?page=${page}`);
        if (response) {
            return {
                statusCode: response.statusCode ?? 200,
                message: response.message,
                data: response?.data.slice(0, 10) ?? {},
                meta: response?.meta ?? {},
            }
        }
        return {
            statusCode: 404,
            data: null,
            message: "Completed novel list not found !"
        }
    } catch (error) {
        console.log("Error fetching completed novel list: " + error.message);
        return {
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!"
        }
    }
}

const fetchNovelListData = async (source, keyword, page = 1, filter) => {
    let realKeyword = (keyword === '' ? 'anh' : keyword);

    let APIUrl = `/api/v1/search/${source}?keyword=${realKeyword}&page=${page}`;
    // TODO: ask for filter in server's API

    try {
        const response = await axios.get(APIUrl);
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
            message: "Search novel list not found !"
        }
    } catch (error) {
        console.log("Error fetching search novel list: " + error.message);
        return {
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!"
        }
    }
}

const ListNovelService = {
    fetchHotNovels,
    fetchLatestNovels,
    fetchCompletedNovels,
    fetchNovelListData,
}


export default ListNovelService;