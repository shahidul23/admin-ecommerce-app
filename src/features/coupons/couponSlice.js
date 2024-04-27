import { createSlice,createAsyncThunk, createAction } from "@reduxjs/toolkit";
import couponService from "./couponService";

export const createCoupon = createAsyncThunk("coupon/create-coupon", async(couponData, thunkAPI) =>{
    try {
        return await couponService.createCoupon(couponData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const getCoupon = createAsyncThunk("coupon/get-coupon", async(thunkAPI) =>{
    try {
        return await couponService.getCoupon();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const resetState = createAction("coupon/resetState");

const initialState = {
    coupon: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(getCoupon.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(getCoupon.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.coupon = action.payload;
        })
        .addCase(getCoupon.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(createCoupon.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(createCoupon.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.createCoupons = action.payload;
        })
        .addCase(createCoupon.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetState, () =>{
            return initialState;
        })
    }
});
export default couponSlice.reducer;