import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig"

const getColor = async() =>{
    const response = await axios.get(`${base_url}color`, config);
    return response.data;
}
const colorService = {
    getColor
}
export default colorService;