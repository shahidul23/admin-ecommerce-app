import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig"

const postProducts = async(data) =>{
    const response = await axios.post(`${base_url}product`,data, config);
    return response.data;
 }
const getAProduct = async(id) =>{
    const response = await axios.get(`${base_url}product/${id}`, config);
    return response.data;
} 
const getProducts = async() =>{
   const response = await axios.get(`${base_url}product`, config);
   return response.data;
}

const productDelete = async(id) =>{
    const response = await axios.delete(`${base_url}product/${id}`, config);
    return response.data;
}

const productService = {
    postProducts,
    getAProduct,
    getProducts,
    productDelete
}

export default productService;