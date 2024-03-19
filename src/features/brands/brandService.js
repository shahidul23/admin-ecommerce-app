import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig"

const getBrands = async() =>{
    const response = await axios.get(`${base_url}brand`,config);
    return response.data;
}

const brandService = {
    getBrands
};
export default brandService;
