import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig"

const createBlogService = async(blog) =>{
    const response = await axios.post(`${base_url}blog`,blog,config);
    return response.data;
}

const getBlogs = async() =>{
    const response = await axios.get(`${base_url}blog`,config);
    return response.data;
}
const blogsService = {
    createBlogService,
    getBlogs
};

export default blogsService;