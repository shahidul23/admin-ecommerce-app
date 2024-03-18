import axios from "axios";
import { base_url } from "../../utils/base_url";

const getCategory = async() =>{
    const response = await axios.get(`${base_url}category/`);
    return response.data;
}

const categoryService = {
    getCategory
}

export default categoryService;