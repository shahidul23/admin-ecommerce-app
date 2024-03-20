import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

export const  getUploads = createAsyncThunk("uploads/getUploads", async (data, thunkAPI) => {
    try {
        const formData = new FormData();
        for (let index = 0; index < data.length; index++) {
            formData.append("images",data[index])
        }
        return await uploadService.uploadImg(formData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const  deleteImg = createAsyncThunk("delete/getUploads", async (id, thunkAPI) => {
    try {
        return await uploadService.deleteImg(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const initialState = {
    images:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const  uploadImagesSlice=createSlice({
    name:'uploadImages',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getUploads.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(getUploads.fulfilled,(state,action)=> {
            state.isLoading = false;
            state.isSuccess = true;
            state.images = action.payload;
            state.isError = false;
            state.message="Image uploaded successfully"
        }).addCase(getUploads.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error;
            state.isSuccess = false
        })
        .addCase(deleteImg.pending, (state)=>{
            state.isLoading=true;
        })
        .addCase(deleteImg.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading =false;
            state.isSuccess = true;
            state.images = [];
        })
        .addCase(deleteImg.rejected, (state, action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess=false;
            state.message = action.error
        })
    },
})

// exporting the actions and the reducer to be used in our components
export default uploadImagesSlice.reducer
