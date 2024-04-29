import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const createCoupon = async(coupon) =>{
    const response = await axios.post(`${base_url}coupon`,coupon,config)
    return response.data;
}

const getOneCoupon = async(id)=>{
    const response = await axios.get(`${base_url}coupon/${id}`,config);
    return response.data;
}

const updateCoupon = async(coupon) =>{
    const response = await axios.put(`${base_url}coupon/update/${coupon.id}`,
    {
        name:coupon.couponDate.name,
        expiry:coupon.couponDate.expiry,
        discount:coupon.couponDate.discount,
    },config)
    return response.data;
}

const getCoupon = async() =>{
    const response = await axios.get(`${base_url}coupon`,config)
    return response.data;
}

const deleteCoupon = async (id) =>{
    const response = await axios.delete(`${base_url}coupon/${id}`,config)
    return response.data;
}

const couponService = {
    createCoupon,
    getOneCoupon,
    updateCoupon,
    getCoupon,
    deleteCoupon
}

export default couponService;