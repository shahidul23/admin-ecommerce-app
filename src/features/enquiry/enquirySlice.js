import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";

export const getEnquirys = createAsyncThunk("enquiry/get-enquiry", async(thunkAPI)=>{
    try {
        return await enquiryService.getEnquirys();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const initialState = {
    enquirys:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:""
};
export const enquirySlice = createSlice({
    name:"enquiry",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder.addCase(getEnquirys.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(getEnquirys.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.enquirys = action.payload;
        })
        .addCase(getEnquirys.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        });
    },
});

export default enquirySlice.reducer;