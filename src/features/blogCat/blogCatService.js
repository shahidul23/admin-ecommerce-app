import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig"

const getBlogCat = async() =>{
    const response = await axios.get(`${base_url}blog-category`,config);
    return response.data;
}
const blogsCatService = {
    getBlogCat
};

export default blogsCatService;