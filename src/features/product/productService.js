import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig"

const getProducts = async() =>{
   const response = await axios.get(`${base_url}product`, config);
   return response.data;
}

const productService = {
    getProducts
}

export default productService;