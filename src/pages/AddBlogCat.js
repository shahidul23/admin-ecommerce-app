import React,{useEffect} from 'react'
import { CustomInput } from '../components/CustomInput'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createCatBlog, getOneBlogCategory, resetState, updateBlogCat } from '../features/blogCat/blogCatSlice';

let blogCatSchema = Yup.object({
  title: Yup.string().required("Blog Category is Required"),
});

const AddBlogCat = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogCatId = location.pathname.split('/')[3];
  const newBlogCat = useSelector((state) => state.blogCat);
  const { isError, isLoading, isSuccess, createCatBlogs,oneBlogCat,updateBlogCats } = newBlogCat;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:{
      title: oneBlogCat || '',
    },
    validationSchema: blogCatSchema,
    onSubmit: values =>{
      if (getBlogCatId !== undefined) {
        const data = {id:getBlogCatId, bloCat: values}
        dispatch(updateBlogCat(data))
      }else{
        dispatch(createCatBlog(values))
      }
      setTimeout(() =>{
        dispatch(resetState())
        navigate('/admin/blog-category-list')
      },3000)
      formik.resetForm();
    }
  });

  useEffect(() =>{
    if (getBlogCatId !== undefined) {
      dispatch(getOneBlogCategory(getBlogCatId))
    }else{
      dispatch(resetState())
    }
  },[dispatch, getBlogCatId]);

  useEffect(() => {
    if (isSuccess && createCatBlogs) {
      toast.success("Blog Category added Successfully ", {
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
    if (isSuccess && updateBlogCats) {
      toast.success("Blog Category update Successfully ", {
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
  }, [isError, isSuccess, isLoading, createCatBlogs,updateBlogCats]);

  return (
    <div style={{padding:"30px"}}>
      <h3 className='mb-4'>{getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category</h3>
      <div>
        <form action='' onSubmit={formik.handleSubmit}>
        <CustomInput 
                type="text" 
                placeholder="Enter Blog Category" 
                id="title"
                name="title"
                onCh={formik.handleChange("title")}
                val={formik.values.title}
                />
                <div className='error'>
                  {formik.touched.title && formik.errors.title}
                </div>
            <button type='submit' className='btn  btn-success border-0 rounded-3 my-5'>{getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category</button>
        </form>
      </div>
    </div>
  )
}

export default AddBlogCat
