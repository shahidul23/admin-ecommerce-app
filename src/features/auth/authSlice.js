import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService';

const getUserFromLocalstorage = localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')):null;
const initialState = {
    user:getUserFromLocalstorage,
    orders:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
};

export const login = createAsyncThunk('auth/admin-login', async (user, thunkAPI) =>{
    try {
        return await authService.login(user)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});
export const getOrders = createAsyncThunk('orders/get-orders', async (thunkAPI) =>{
    try {
        return await authService.getOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:  (builder) => {
        builder
        .addCase(login.pending,
        (state) =>{
            state.isLoading = true;
        })
        .addCase(login.fulfilled,
        (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.user = action.payload;
            state.message = "success";
        })
        .addCase(login.rejected,
        (state, action) =>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(getOrders.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getOrders.fulfilled, (state, action)=>{
            state.isError =false;
            state.isLoading = false;
            state.isSuccess= true;
            state.orders = action.payload;
        })
        .addCase(getOrders.rejected, (state, action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error
        })
    },
});

export default authSlice.reducer;
