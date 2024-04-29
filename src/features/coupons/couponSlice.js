import { createSlice,createAsyncThunk, createAction } from "@reduxjs/toolkit";
import couponService from "./couponService";

export const createCoupon = createAsyncThunk("coupon/create-coupon", async(couponData, thunkAPI) =>{
    try {
        return await couponService.createCoupon(couponData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const getOneCoupon = createAsyncThunk("coupon/get-one-coupon", async(id, thunkAPI) =>{
    try {
        return await couponService.getOneCoupon(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const updateCoupon = createAsyncThunk("coupon/update-coupon", async(data, thunkAPI) =>{
    try {
        return await couponService.updateCoupon(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})
export const getCoupon = createAsyncThunk("coupon/get-coupon", async(thunkAPI) =>{
    try {
        return await couponService.getCoupon();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const deleteCoupon = createAsyncThunk("coupon/delete-coupon", async(id, thunkAPI) =>{
    try {
        return await couponService.deleteCoupon(id);
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
        .addCase(getOneCoupon.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(getOneCoupon.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.CouponName = action.payload.name;
            state.CouponExpiry = action.payload.expiry;
            state.CouponDiscount = action.payload.discount;
        })
        .addCase(getOneCoupon.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(updateCoupon.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(updateCoupon.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.updateCoupons = action.payload;
        })
        .addCase(updateCoupon.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteCoupon.pending, (state) =>{
            state.isLoading = true;
        })
        .addCase(deleteCoupon.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.deleteCoupons = action.payload;
        })
        .addCase(deleteCoupon.rejected, (state, action) =>{
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