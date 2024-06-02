import axios from '../configs/axios';

const fetchDetailNovel = async (source, slug) => {
    try {
        const response = await axios.get(`/api/v1/novel/${source}/${slug}`);
        console.log(response);
        if (response) {


            let returnedData = {
                statusCode: response.statusCode ?? 200,
                message: "Fetch detail novel info successfully!",
                data: response?.data ?? {},
                meta: response?.meta
            }

            const sub_response = await axios.get(`/api/v1/novel/${source}/${slug}/chapters`);
            if (sub_response) {
                let allChapters = [];
                let totalPage = sub_response.meta.totalPage;
                console.log("Total page: " + totalPage);
                for (let i = 1; i <= totalPage; i++) {
                    let sub_response = await axios.get(`/api/v1/novel/${source}/${slug}/chapters?page=${i}`);
                    allChapters.push(...sub_response.data);
                }
                allChapters = allChapters.map((chapter, index) => {
                    return {
                        ...chapter,
                        id: index,
                    }
                })
                allChapters = allChapters.sort((a, b) => a.id - b.id);
                returnedData.data.chapters = allChapters;
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