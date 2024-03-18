import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

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
        });
    },
});
export default categoriesSlice.reducer;