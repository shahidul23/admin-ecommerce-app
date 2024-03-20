import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const uploadImg = async(date) =>{
    const response = await axios.post(`${base_url}upload`, date, config);
    return response;
}
const deleteImg = async(id) =>{
    const response = await axios.delete(`${base_url}upload/delete-img/${id}`, config);
    return response;
}

const uploadService = {
    uploadImg,
    deleteImg
};

export default uploadService;
