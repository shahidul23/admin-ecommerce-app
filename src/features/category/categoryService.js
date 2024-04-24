import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig"


const createCategory = async(category) =>{
    const response = await axios.post(`${base_url}category`, category, config);
    return response.data;
}
const getCategory = async() =>{
    const response = await axios.get(`${base_url}category`, config);
    return response.data;
}

const categoryService = {
    createCategory,
    getCategory
}

export default categoryService;