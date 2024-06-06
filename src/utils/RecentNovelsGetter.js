import axios from '../configs/axios';

const fetchRecentNovels = async (source, page) => {
    // TODO: Replace this with getting data from user's cookie
    try {
        const response = await axios.get(`/api/v1/category/${source}/hot?page=${page}`);
        if (response) {
            let newData = response.data.map((novel) => {
                return {
                    ...novel,
                    recentChapter: {
                        slug: 'chuong-1',
                        title: "Chương 1"
                    },
                    source: source
                }
            })

            return {
                statusCode: response.statusCode ?? 200,
                message: response.message,
                data: newData.slice(0, 5) ?? {},
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

const RecentNovelsGetter = {
    fetchRecentNovels,
}

export default RecentNovelsGetter;