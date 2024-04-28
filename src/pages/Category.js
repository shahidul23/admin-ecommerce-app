import React,{useEffect} from 'react'
import { CustomInput } from '../components/CustomInput'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createCategory, getOneCategory, resetState,updateCategory } from '../features/category/categorySlice';

let categorySchema = Yup.object({ 
  title: Yup.string().required("Category Name is Required"),
});

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCategoryId = location.pathname.split('/')[3];
  const newCategory = useSelector(state => state.category);
  const { isError, isLoading, isSuccess, createCategories, oneCategory, updateCategories } = newCategory;
  const formik = useFormik({
    enableReinitialize:true,
    initialValues:{
      title: oneCategory || "",
    },
    validationSchema: categorySchema,

    onSubmit: (values) => {
      if(getCategoryId !== undefined){
        const data = {
          id:getCategoryId,
          category:values
      };
      dispatch(updateCategory(data));
      }else{
        dispatch(createCategory(values));
      }
      setTimeout(()=>{
        dispatch(resetState());
        navigate('/admin/category-list')
      },3000)
      formik.resetForm();
    }
  });

  useEffect(() =>{
    if (getCategoryId !== undefined) {
      dispatch(getOneCategory(getCategoryId))
    }else{
      dispatch(resetState());
    }
  },[getCategoryId,dispatch])

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
    if (isSuccess && updateCategories) {
      toast.success("Category Updated successfully.", {
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
  }, [isError, isSuccess, isLoading, createCategories,updateCategories]);
  return (
    <div style={{padding:"30px"}}>
      <h3 className='mb-4 title'>{getCategoryId !== undefined ? "Edit" : "Add"} Category</h3>
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
            <button type='submit' className='btn  btn-success border-0 rounded-3 my-5'>{getCategoryId !== undefined ? "Edit" : "Add"} Category</button>
        </form>
      </div>
    </div>
  )
}

export default Category
