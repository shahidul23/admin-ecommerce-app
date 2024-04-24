import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import brandService from "./brandService";

export const getBrands = createAsyncThunk("brand/get-brand", async(thunkAPI) =>{
    try {
        return await  brandService.getBrands();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const createBrand = createAsyncThunk("brand/add-brand", async(brand,thunkAPI) =>{
    try {
        return await  brandService.createBrand(brand);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const initialState = {
    brands:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const  brandSlice=createSlice({
    name:'brand',
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder.addCase(getBrands.pending,(state)=>{
            state.isError= false;
            state.isLoading= true;
            state.isSuccess= false;
        })
        .addCase(getBrands.fulfilled,(state,action)=> {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.brands = action.payload;
        })
        .addCase(getBrands.rejected ,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(createBrand.pending,(state)=>{
            state.isError= false;
            state.isLoading= true;
            state.isSuccess= false;
        })
        .addCase(createBrand.fulfilled,(state,action)=> {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createBrands = action.payload;
        })
        .addCase(createBrand.rejected, (state,action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        ;
    },
})
// exporting the actions and the reducer to be used in other parts of our application
export default brandSlice.reducer;