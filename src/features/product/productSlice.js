import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";

export const getProducts = createAsyncThunk("products/get-products", async(thunkAPI) =>{
    try {
        return await productService.getProducts();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createProducts = createAsyncThunk("products/create-products", async(data,thunkAPI) =>{
    try {
        return await productService.postProducts(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const getAProduct = createAsyncThunk("products/get-one-product", async(id, thunkAPI) =>{
    try {
        return await productService.getAProduct(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const productDelete = createAsyncThunk("product/delete-product", async(id, thunkAPI) =>{
    try {
        return await productService.productDelete(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const resetState = createAction("products/reset-state");

const initialState = {
    products:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}
export const productSlice = createSlice({
    name:"users",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getProducts.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(getProducts.fulfilled,(state,action)=> {
            state.isLoading= false;
            state.isError = false;
            state.isSuccess =true;
            state.products = action.payload;
            })
        .addCase(getProducts.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false
            state.message = action.error;
        })
        .addCase(createProducts.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(createProducts.fulfilled, (state, action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.createProduct = action.payload;
        })
        .addCase(createProducts.rejected, (state, action) =>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error
        })
        .addCase(getAProduct.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(getAProduct.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.productTitle = action.payload.findProduct.title;
            state.productCode = action.payload.findProduct.code;
            state.productDescription = action.payload.findProduct.description;
            state.productPrice = action.payload.findProduct.price;
            state.productQuantity = action.payload.findProduct.quantity;
            state.productColor = action.payload.findProduct.color;
            state.productTag = action.payload.findProduct.tags;
            state.productBrand = action.payload.findProduct.brand;
            state.productCategory = action.payload.findProduct.category;
            state.productImage = action.payload.findProduct.images;
        })
        .addCase(getAProduct.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(productDelete.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(productDelete.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.deleteProducts = action.payload;
        })
        .addCase(productDelete.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetState, () =>{
            return initialState;
        });
    }
});
export default productSlice.reducer;