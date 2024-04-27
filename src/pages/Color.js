import React,{useEffect} from 'react'
import { CustomInput } from '../components/CustomInput'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createColor, resetState } from '../features/color/colorSlice';

let colorSchema = Yup.object({ 
  title: Yup.string().required("Color Name is Required"),
});

const Color = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newColor = useSelector((state) => state.color);
  const { isLoading, isError, isSuccess, createColors } = newColor;

  const formik = useFormik({
    initialValues:{
      title:'',
    },
    validationSchema:colorSchema ,
    onSubmit: values => {
      dispatch(createColor(values))
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate('/admin/color-list')
      }, 3000);
      //alert(JSON.stringify(values));
    },
  });
  useEffect(() => {
    if (isSuccess && createColors) {
      toast.success("Color Add successfully.", {
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
  }, [isError, isSuccess, isLoading, createColors]);
  return (
    <div style={{padding:"30px"}}>
      <h3 className='mb-4 title'>Add Color</h3>
      <div>
        <form action='' onSubmit={formik.handleSubmit}>
        <CustomInput 
                type="color" 
                placeholder="Enter Product Color" 
                id="title"
                name="title"
                onCh={formik.handleChange("title")}
                val={formik.values.title}
                />
                <div className='error'>
                  {formik.touched.title && formik.errors.title}
                </div>
            <button type='submit' className='btn  btn-success border-0 rounded-3 my-5'>Add Color</button>
        </form>
      </div>
    </div>
  )
}

export default Color
