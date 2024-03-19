import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig"
const getEnquirys = async() =>{
    const response = await axios.get(`${base_url}enquiry`, config);
    return response.data;
}
const enquiryService = {
    getEnquirys
};

export default enquiryService;