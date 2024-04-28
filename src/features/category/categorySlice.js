import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

export const createCategory = createAsyncThunk("categories/add-categories", async(category,thunkAPI) =>{
  try {
      return await  categoryService.createCategory(category);
  } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
  }
});

export const getOneCategory = createAsyncThunk("categories/get-one-category" ,async(id, thunkAPI) =>{
  try {
    return await categoryService.getOneCategory(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const updateCategory = createAsyncThunk("categories/update-category", async(category, thunkAPI) =>{
  try {
    return await categoryService.updateCategory(category);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
})

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
export const deleteCategory = createAsyncThunk("categories/delete-category",(id,thunkAPI) =>{
  try {
    return categoryService.deleteCategory(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
})

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
        .addCase(getOneCategory.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getOneCategory.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess=true;
          state.isError= false;
          state.oneCategory = action.payload.title;
        })
        .addCase(getOneCategory.rejected, (state,action)=>{
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(updateCategory.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateCategory.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess=true;
          state.isError= false;
          state.updateCategories = action.payload;
        })
        .addCase(updateCategory.rejected, (state, action) =>{
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message= action.error;
        })
        .addCase(deleteCategory.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess=true;
          state.isError= false;
          state.deleteCategories = action.payload;
        })
        .addCase(deleteCategory.rejected, (state, action) =>{
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message= action.error;
        })
        .addCase(resetState, () => initialState);
    },
});
export default categoriesSlice.reducer;