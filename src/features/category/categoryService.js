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
const getOneCategory = async(id) =>{
    const response = await axios.get(`${base_url}category/${id}`, config);
    return response.data;
}
const updateCategory = async(data) =>{
    const response = await axios.put(`${base_url}category/${data.id}`, {title: data.category.title}, config);
    return response.data;
}
const deleteCategory = async(id) =>{
    const response = await axios.delete(`${base_url}category/${id}`, config);
    return response.data;
}

const categoryService = {
    createCategory,
    getCategory,
    getOneCategory,
    updateCategory,
    deleteCategory
}

export default categoryService;