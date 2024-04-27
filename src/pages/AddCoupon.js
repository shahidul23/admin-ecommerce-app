import React,{useEffect} from 'react'
import { CustomInput } from '../components/CustomInput'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCoupon, resetState } from '../features/coupons/couponSlice';


let CouponSchema = Yup.object({ 
    name: Yup.string().required("Brand Name is Required"),
    expiry: Yup.date().required("Expiry Date is Required"),
    discount: Yup.number().required("Discount is Required"),
  });


const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newCoupon = useSelector((state) => state.coupon);
  const { isError, isLoading, isSuccess, createCoupons } = newCoupon;

  const formik = useFormik({
    initialValues:{
        name:'',
        expiry:'',
        discount:'',
    },
    validationSchema:CouponSchema ,
    onSubmit: values => {
      dispatch(createCoupon(values))
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState())
        navigate('/admin/coupon-list')
      }, 3000);
      //alert(JSON.stringify(values));
    },
  });
  useEffect(() => {
    if (isSuccess && createCoupons) {
      toast.success("Brand Name has been created successfully.", {
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
  }, [isError, isSuccess, isLoading, createCoupons]);
  return (
    <div style={{padding:"30px"}}>
      <h3 className='mb-4 title'>Add Coupon</h3>
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
                type="Date" 
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
            <button type='submit' className='btn  btn-success border-0 rounded-3 my-5'>Add Coupon</button>
        </form>
      </div>
    </div>
  )
}

export default AddCoupon
