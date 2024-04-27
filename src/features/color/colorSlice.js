import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import colorService from "./colorService";

export const createColor = createAsyncThunk("color/create-color", async(color, thunkAPI) =>{
    try {
        return await colorService.createColor(color);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})
export const getColors = createAsyncThunk("color/get-color", async(thunkAPI) =>{
    try {
        return await colorService.getColor();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const resetState = createAction("color/reset-state");

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
        })
        .addCase(createColor.pending, (state) =>{
            state.isLoading=true;
            state.isError=false;
        })
        .addCase(createColor.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError = false;
            state.createColors = action.payload;
        })
        .addCase(createColor.rejected, (state, action)=>{
            state.isLoading=false;
            state.isError= true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(resetState, () => {
            return initialState;
        });
    },
});
export default colorsSlice.reducer;