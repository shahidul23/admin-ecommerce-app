import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import colorService from "./colorService";

export const getColors = createAsyncThunk("color/get-color", async(thunkAPI) =>{
    try {
        return await colorService.getColor();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
const initialState = {
    colors:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:"",
}

const colorsSlice=createSlice({
    name:"colors",
    initialState,
    reducers:{},
    extraReducers: (builder)=> {
        builder.addCase(getColors.pending, (state) =>{
            state.isLoading=true;
            state.isError=false;
        })
        .addCase(getColors.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError = false;
            state.colors=action.payload;
        }).addCase(getColors.rejected, (state, action)=>{
            state.isLoading=false;
            state.isError= true;
            state.isSuccess=false;
            state.message=action.error;
        });
    },
});
export default colorsSlice.reducer;