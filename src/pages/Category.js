import React,{useEffect} from 'react'
import { CustomInput } from '../components/CustomInput'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCategory } from '../features/category/categorySlice';

let categorySchema = Yup.object({ 
  title: Yup.string().required("Category Name is Required"),
});

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newCategory = useSelector(state => state.category);
  const { isError, isLoading, isSuccess, createCategories } = newCategory;
  const formik = useFormik({
    initialValues:{
      title: "",
    },
    validationSchema: categorySchema,

    onSubmit: (values) => {
      dispatch(createCategory(values));
      setTimeout(()=>{
        navigate('/admin/category-list')
      },3000)
      formik.resetForm();
    }
  });
  useEffect(() => {
    if (isSuccess && createCategories) {
      toast.success("Category Add successfully.", {
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
  }, [isError, isSuccess, isLoading, createCategories]);
  return (
    <div style={{padding:"30px"}}>
      <h3 className='mb-4 title'>Add Category</h3>
      <div>
        <form action='' onSubmit={formik.handleSubmit}>
        <CustomInput 
                type="text" 
                placeholder="Enter Category Name" 
                id="title"
                name="title"
                onCh={formik.handleChange("title")}
                val={formik.values.title}
                />
                <div className='error'>
                  {formik.touched.title && formik.errors.title}
                </div>
            <button type='submit' className='btn  btn-success border-0 rounded-3 my-5'>Add Category</button>
        </form>
      </div>
    </div>
  )
}

export default Category
