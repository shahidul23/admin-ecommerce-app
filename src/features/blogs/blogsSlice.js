import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogsService from "./blogsService";

export const createBlog = createAsyncThunk("blogs/add-blogs", async(blog, thunkAPI)=>{
    try {
        return await blogsService.createBlogService(blog)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const getABlog = createAsyncThunk("blogs/get-one-blog", async(id, thunkAPI) =>{
    try {
        return await blogsService.getABlog(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const updateBlog = createAsyncThunk("blogs/update-blog", async(blog, thunkAPI) =>{
    try {
        return await blogsService.updateBlog(blog);
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

export const deleteBlog = createAsyncThunk("blogs/delete-blogs", async(id, thunkAPI) =>{
    try {
        return await blogsService.deleteBlog(id);
    }   catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const resetState = createAction("blogs/resetState");

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
        })
        .addCase(getABlog.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(getABlog.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.blogTitle = action.payload.title;
            state.blogDescription = action.payload.description;
            state.blogCategory = action.payload.category;
            state.blogImages = action.payload.images;  
        })
        .addCase(getABlog.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(updateBlog.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(updateBlog.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.updateBlogs = action.payload;
        })
        .addCase(updateBlog.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteBlog.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(deleteBlog.fulfilled, (state,action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.deleteBlogs = action.payload;
        })
        .addCase(deleteBlog.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetState,()=> initialState);
    },
});

export default blogSlice.reducer;