import axios from '../configs/axios';

const sortChapterListByCustomID = (chapterListResponse) => {
    let newChapterList = chapterListResponse.data.map((chapter, index) => {
        return {
            ...chapter,
            id: parseInt((parseInt(chapterListResponse.meta.page) - 1) * chapterListResponse.data.length) + parseInt(index) + 1,
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
                meta: response?.meta ?? {}
            }

            const chapterListResponse = await fetchChapterList(source, novelSlug, page);
            if (chapterListResponse) {
                returnedData.data.chapters = chapterListResponse.data;
                returnedData.data.totalPage = chapterListResponse.meta.totalPage;
                returnedData.data.page = chapterListResponse.meta.page;
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
                data: response?.data ? sortChapterListByCustomID(response) : {},
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


const exportChapters = async (source, novelSlug, exporterPluginName, dataForRequesting) => {
    try {
        const response = await axios.post(`/api/v1/novel/${source}/${novelSlug}/export/${exporterPluginName}`,
            dataForRequesting,
        );

        if (response) {
            return {
                statusCode: response.statusCode ?? 200,
                message: response?.message ?? '',
                data: response?.data ?? {},
                meta: response?.meta ?? {},
            }
        }
    } catch (error) {
        console.log("Error exporting chapters data: " + error.message);
        return {
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!"
        }
    }
}

const fetchOtherSources = async (sourceSlug, novelSlug, requestingData) => {
    try {
        const response = await axios.post(`/api/v1/novel/${sourceSlug}/${novelSlug}/others`,
            requestingData,
        );

        if (response) {
            return {
                statusCode: response.statusCode ?? 200,
                message: response?.message ?? '',
                data: response?.data ?? {},
                meta: response?.meta ?? {},
            }
        }
    } catch (error) {
        console.log("Error fetching other sources for novel: " + error.message);
        return {
            statusCode: 500,
            data: null,
            message: "Cannot connect to server!"
        }
    }
}

const DetailNovelService = {
    fetchDetailNovel,
    fetchChapterList,
    exportChapters,
    fetchOtherSources,
}

export default DetailNovelService;