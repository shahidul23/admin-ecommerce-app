import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

export const createCategory = createAsyncThunk("categories/add-categories", async(category,thunkAPI) =>{
  try {
      return await  categoryService.createCategory(category);
  } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
  }
});

export const getCategories = createAsyncThunk(
  "categories/get-categories",
  async (thunkAPI) => {
    try {
        return await categoryService.getCategory();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const resetState = createAction("categories/resetState");

const initialState = {
    categories:[],
    isError: false,
    isSuccess:false,
    isLoading:false,
    message:""
}
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(getCategories.pending, (state) => {
          state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess=true;
          state.isError= false;
          state.categories = action.payload;
        })
        .addCase(getCategories.rejected, (state,action)=>{
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(createCategory.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createCategory.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess=true;
          state.isError= false;
          state.createCategories = action.payload 
        })
        .addCase(createCategory.rejected, (state,action)=>{
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    },
});
export default categoriesSlice.reducer;