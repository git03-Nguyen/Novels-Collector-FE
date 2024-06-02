import axios from '../configs/axios';

const sortChapterListByCustomID = (chapterList) => {
    let newChapterList = chapterList.map((chapter, index) => {
        return {
            ...chapter,
            id: index,
        }
    })
    newChapterList = newChapterList.sort((a, b) => a.id - b.id);

    return newChapterList;
}

const fetchDetailNovel = async (source, novelSlug, page) => {
    try {
        const response = await axios.get(`/api/v1/novel/${source}/${novelSlug}`);
        if (response) {


            let returnedData = {
                statusCode: response.statusCode ?? 200,
                message: "Fetch detail novel info successfully!",
                data: response?.data ?? {},
                meta: response?.meta
            }

            const chapterListResponse = await fetchChapterList(source, novelSlug, page);
            if (chapterListResponse) {
                let chapterList = chapterListResponse.data;

                returnedData.data.chapters = sortChapterListByCustomID(chapterList);
                returnedData.data.totalPage = chapterListResponse.meta.totalPage;
            }
            return returnedData;
        }
    } catch (error) {
        console.log("Error fetching detail novel info: " + error.message);
        return {
            statusCode: 500,
            data: null,
            message: "Error fetching detail novel info: " + error.message
        }
    }
}

const fetchChapterList = async (source, novelSlug, page) => {
    try {
        const response = await axios.get(`/api/v1/novel/${source}/${novelSlug}/chapters?page=${page}`);
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
            message: "Chapter list not found !"
        }
    } catch (error) {
        console.log("Error fetching chapter list: " + error.message);
        return {
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!"
        }
    }
}


const NovelService = {
    fetchDetailNovel,
}

export default NovelService;