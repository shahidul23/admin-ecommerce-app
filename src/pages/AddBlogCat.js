import React,{useEffect} from 'react'
import { CustomInput } from '../components/CustomInput'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCatBlog } from '../features/blogCat/blogCatSlice';

let blogCatSchema = Yup.object({
  title: Yup.string().required("Blog Category is Required"),
});

const AddBlogCat = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newBlogCat = useSelector((state) => state.blogCat);
  const { isError, isLoading, isSuccess, createCatBlogs } = newBlogCat;

  const formik = useFormik({
    initialValues:{
      title:'',
    },
    validationSchema: blogCatSchema,
    onSubmit: values =>{
      dispatch(createCatBlog(values))
      setTimeout(() =>{
        navigate('/admin/blog-category-list')
      },3000)
      formik.resetForm();
    }
  });

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
  }, [isError, isSuccess, isLoading, createCatBlogs]);

  return (
    <div style={{padding:"30px"}}>
      <h3 className='mb-4'>Add Blog Category</h3>
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
            <button type='submit' className='btn  btn-success border-0 rounded-3 my-5'>Add Blog Category</button>
        </form>
      </div>
    </div>
  )
}

export default AddBlogCat
