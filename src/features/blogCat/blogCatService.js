import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig"

const createCatBlog = async(bCat) =>{
    const response = await axios.post(`${base_url}blog-category`,bCat,config);
    return response.data;
}
const getOneBlogCategory = async(id) =>{
    const response = await axios.get(`${base_url}blog-category/${id}`,config);
    return response.data;
}
const updateBlogCategory = async(data) =>{
    const response = await axios.put(`${base_url}blog-category/${data.id}`,{title:data.bloCat.title},config);
    return response.data;
}
const getBlogCat = async() =>{
    const response = await axios.get(`${base_url}blog-category`,config);
    return response.data;
}
const deleteBlogCat = async(id) =>{
    const response = await axios.delete(`${base_url}blog-category/${id}`,config);
    return response.data;
}
const blogsCatService = {
    createCatBlog,
    getOneBlogCategory,
    updateBlogCategory,
    getBlogCat,
    deleteBlogCat
};

export default blogsCatService;