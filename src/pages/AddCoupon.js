import React,{useEffect} from 'react'
import { CustomInput } from '../components/CustomInput'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createCoupon, getOneCoupon, resetState, updateCoupon } from '../features/coupons/couponSlice';


let CouponSchema = Yup.object({ 
    name: Yup.string().required("Brand Name is Required"),
    expiry: Yup.date().required("Expiry Date is Required"),
    discount: Yup.number().required("Discount is Required"),
  });


const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCouponId = location.pathname.split('/')[3];
  const newCoupon = useSelector((state) => state.coupon);
  const { isError, isLoading, isSuccess, createCoupons, CouponName, CouponExpiry, CouponDiscount, updateCoupons } = newCoupon;

  const changeDateFormat = (date) => {
    // Parse the input date string into a Date object
    const parsedDate = new Date(date);
    
    // Format the date into the required format
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const hours = String(parsedDate.getHours()).padStart(2, '0');
    const minutes = String(parsedDate.getMinutes()).padStart(2, '0');
  
    // Combine the formatted date components into the required format
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
  
    return formattedDate;
  };

  const formik = useFormik({
    enableReinitialize:true,
    initialValues:{
        name: CouponName || '',
        expiry: changeDateFormat(CouponExpiry) ||'',
        discount: CouponDiscount ||'',
    },
    validationSchema:CouponSchema ,
    onSubmit: values => {
      if (getCouponId !== undefined) {
        const date = {id: getCouponId, couponDate: values}
        dispatch(updateCoupon(date))
      }else{
        dispatch(createCoupon(values))
      }
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState())
        navigate('/admin/coupon-list')
      }, 3000);
      //alert(JSON.stringify(values));
    },
  });
  useEffect(() =>{
    if (getCouponId !== undefined) {
      dispatch(getOneCoupon(getCouponId))
    }else{
      dispatch(resetState());
    }
  },[dispatch, getCouponId])
  useEffect(() => {
    if (isSuccess && createCoupons) {
      toast.success("Coupon has been created successfully.", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (isSuccess && updateCoupons) {
      toast.success("Coupon has been update successfully.", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (isError) {
      toast.error('Something went wrong! Please try again later', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isError, isSuccess, isLoading, createCoupons, updateCoupons]);
  return (
    <div style={{padding:"30px"}}>
      <h3 className='mb-4 title'>{ getCouponId !== undefined ? "Edit" : "Add"} Coupon</h3>
      <div>
        <form action='' onSubmit={formik.handleSubmit}>
            <CustomInput 
                type="text" 
                placeholder="Enter Coupon Name" 
                id="name"
                name="name"
                onCh={formik.handleChange("name")}
                val={formik.values.name}
                />
                <div className='error'>
                  {formik.touched.name && formik.errors.name}
                </div>
            <CustomInput 
                type="datetime-local" 
                placeholder="Enter Coupon Expiry Date" 
                id="expiry"
                name="expiry"
                onCh={formik.handleChange("expiry")}
                val={formik.values.expiry}
                />
                <div className='error'>
                  {formik.touched.expiry && formik.errors.expiry}
                </div>
            <CustomInput 
                type="number" 
                placeholder="Enter Coupon Discount Amount" 
                id="discount"
                name="discount"
                onCh={formik.handleChange("discount")}
                val={formik.values.discount}
                />
                <div className='error'>
                  {formik.touched.discount && formik.errors.discount}
                </div>        
            <button type='submit' className='btn  btn-success border-0 rounded-3 my-5'>{ getCouponId !== undefined ? "Edit" : "Add"} Coupon</button>
        </form>
      </div>
    </div>
  )
}

export default AddCoupon
