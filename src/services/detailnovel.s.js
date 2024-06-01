import axios from '../configs/axios';

const fetchDetailNovel = async (source, slug) => {
    try {
        const response = await axios.get(`/api/v1/novel/${source}/${slug}`);
        if (response) {


            let returnedData = {
                statusCode: response.statusCode ?? 200,
                message: response.message,
                data: response?.data ?? {},
                meta: response?.meta
            }

            const sub_response = await axios.get(`/api/v1/novel/${source}/${slug}/chapters`);
            if (sub_response) {
                let chapterList = sub_response.data;
                chapterList = chapterList.map((chapter, index) => {
                    return {
                        ...chapter,
                        id: index,
                    }
                })
                chapterList = chapterList.sort((a, b) => b.id - a.id);
                returnedData.data.chapters = chapterList;
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


const NovelService = {
    fetchDetailNovel,
}

export default NovelService;