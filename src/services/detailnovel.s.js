import axios from "axios";

const fetchDetailNovel = async (source, slug) => {
    const response = await axios.get(`https://localhost:7085/api/v1/novel/${source}/${slug}`);
    console.log(response);
    const data = response.data;
    return data;
}


const NovelService = {
    fetchDetailNovel,
}

export default NovelService;