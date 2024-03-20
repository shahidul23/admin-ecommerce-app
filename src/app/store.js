import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import customerReducer from '../features/customers/customerSlice';
import productReducer from '../features/product/productSlice';
import brandReducer from '../features/brands/brandSlice';
import categoryReducer from '../features/category/categorySlice';
import colorReducer from '../features/color/colorSlice';
import blogsReducer from '../features/blogs/blogsSlice';
import blogCatReducer from '../features/blogCat/blogCatSlice';
import enquiryReducer from '../features/enquiry/enquirySlice';
import uploadReducer from '../features/upload/uploadSlice';

export const store = configureStore({
    reducer: {
        auth : authReducer, 
        customer: customerReducer, 
        product: productReducer,  
        brand: brandReducer,
        category: categoryReducer,
        color: colorReducer,
        blog:blogsReducer,
        blogCat: blogCatReducer,
        enquiry: enquiryReducer,
        upload: uploadReducer
    },
});
