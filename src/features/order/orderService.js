import axios from "axios";
import { base_url } from "../../utils/base_url";

const getOrders = async() =>{
    const response = await axios.get(`${base_url}orders/:id`);
    return response.data;
}
const orderService = {
    getOrders
};

export default orderService;