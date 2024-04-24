import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig"

const createCatBlog = async(bCat) =>{
    const response = await axios.post(`${base_url}blog-category`,bCat,config);
    return response.data;
}
const getBlogCat = async() =>{
    const response = await axios.get(`${base_url}blog-category`,config);
    return response.data;
}
const blogsCatService = {
    createCatBlog,
    getBlogCat
};

export default blogsCatService;