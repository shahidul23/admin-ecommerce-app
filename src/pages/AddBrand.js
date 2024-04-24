import React,{useEffect} from 'react'
import { CustomInput } from '../components/CustomInput'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createBrand } from '../features/brands/brandSlice';


let BrandSchema = Yup.object({ 
  title: Yup.string().required("Brand Name is Required"),
});


const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newBrand = useSelector(state => state.brand);
  const { isError, isLoading, isSuccess, createBrands } = newBrand;
  const formik = useFormik({
    initialValues:{
      title:'',
    },
    validationSchema:BrandSchema ,
    onSubmit: values => {
      dispatch(createBrand(values))
      formik.resetForm();
      setTimeout(() => {
        navigate('/admin/brand-list')
      }, 3000);
      //alert(JSON.stringify(values));
    },
  });
  useEffect(() => {
    if (isSuccess && createBrands) {
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
  }, [isError, isSuccess, isLoading, createBrands]);
  return (
    <div style={{padding:"30px"}}>
      <h3 className='mb-4 title'>Add Brand</h3>
      <div>
        <form action='' onSubmit={formik.handleSubmit}>
        <CustomInput 
                type="text" 
                placeholder="Enter Brand Title" 
                id="title"
                name="title"
                onCh={formik.handleChange("title")}
                val={formik.values.title}
                />
                <div className='error'>
                  {formik.touched.title && formik.errors.title}
                </div>
            <button type='submit' className='btn  btn-success border-0 rounded-3 my-5'>Add Brand</button>
        </form>
      </div>
    </div>
  )
}

export default AddBrand
