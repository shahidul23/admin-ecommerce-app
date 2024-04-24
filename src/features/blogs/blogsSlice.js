import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogsService from "./blogsService";

export const createBlog = createAsyncThunk("blogs/add-blogs", async(blog, thunkAPI)=>{
    try {
        return await blogsService.createBlogService(blog)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const getBlogs = createAsyncThunk("blogs/get-blogs", async(thunkAPI)=>{
    try {
        return await blogsService.getBlogs();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const initialState = {
    blogs:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:""
};
export const blogSlice = createSlice({
    name:"blogs",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder.addCase(getBlogs.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(getBlogs.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.blogs = action.payload;
        })
        .addCase(getBlogs.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(createBlog.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(createBlog.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.createBlogs = action.payload;
        })
        .addCase(createBlog.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        });
    },
});

export default blogSlice.reducer;