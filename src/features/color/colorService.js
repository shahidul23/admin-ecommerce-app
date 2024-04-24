import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig"

const createColor = async(color) =>{
    const response = await axios.post(`${base_url}color`, color, config);
    return response.data;
}
const getColor = async() =>{
    const response = await axios.get(`${base_url}color`, config);
    return response.data;
}
const colorService = {
    createColor,
    getColor
}
export default colorService;