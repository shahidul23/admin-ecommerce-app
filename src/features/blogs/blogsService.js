import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig"

const createBlogService = async(blog) =>{
    const response = await axios.post(`${base_url}blog`,blog,config);
    return response.data;
}
const getABlog = async(id) =>{
    const response = await axios.get(`${base_url}blog/${id}`,config);
    return response.data;
}
const updateBlog = async(data) =>{
    const response = await axios.put(`${base_url}blog/${data.id}`,{
        title: data.blogData.title,
        description: data.blogData.description,
        category: data.blogData.category,
        images: data.blogData.images
    },config);
    return response.data;
}
const getBlogs = async() =>{
    const response = await axios.get(`${base_url}blog`,config);
    return response.data;
}
const deleteBlog = async(id) =>{
    const response = await axios.delete(`${base_url}blog/${id}`,config);
    return response.data;
}
const blogsService = {
    createBlogService,
    getABlog,
    updateBlog,
    getBlogs,
    deleteBlog
};

export default blogsService;