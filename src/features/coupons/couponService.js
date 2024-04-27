import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const createCoupon = async(coupon) =>{
    const response = await axios.post(`${base_url}coupon`,coupon,config)
    return response.data;
}

const getCoupon = async() =>{
    const response = await axios.get(`${base_url}coupon`,config)
    return response.data;
}

const couponService = {
    createCoupon,
    getCoupon
}

export default couponService;