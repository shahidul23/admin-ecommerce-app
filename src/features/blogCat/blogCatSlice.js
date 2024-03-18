import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogsCatService from "./blogCatService";

export const getBlogCats = createAsyncThunk("blogsCat/get-blogsCat", async(thunkAPI)=>{
    try {
        return await blogsCatService.getBlogCat();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const initialState = {
    blogsCat:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:""
};
export const blogCatSlice = createSlice({
    name:"blogsCat",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder.addCase(getBlogCats.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(getBlogCats.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.blogsCat = action.payload;
        })
        .addCase(getBlogCats.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        });
    },
});

export default blogCatSlice.reducer;