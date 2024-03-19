import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig"

const getCategory = async() =>{
    const response = await axios.get(`${base_url}category`, config);
    return response.data;
}

const categoryService = {
    getCategory
}

export default categoryService;