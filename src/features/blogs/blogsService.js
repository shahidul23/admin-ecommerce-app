import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig"
const getBlogs = async() =>{
    const response = await axios.get(`${base_url}blog`,config);
    return response.data;
}
const blogsService = {
    getBlogs
};

export default blogsService;