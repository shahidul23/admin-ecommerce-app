import React, { useEffect, useMemo } from 'react';
import { CustomInput } from '../components/CustomInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';
import { deleteImg, getUploads } from '../features/upload/uploadSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBlog, getABlog, resetState, updateBlog } from '../features/blogs/blogsSlice';
import { getBlogCats } from '../features/blogCat/blogCatSlice';

let blogSchema = Yup.object({ 
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  category: Yup.string().required("Category is Required"),
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogState = useSelector((state) => state.blogCat.blogsCat);
  const imageState = useSelector((state) => state.upload.images.data);
  const newBlogs = useSelector((state) => state.blog);
  const blogImages = useSelector((state) => state.blog.blogImages)
  const { isError, isLoading, isSuccess, createBlogs, blogTitle, blogDescription, blogCategory,updateBlogs } = newBlogs;
  //console.log(blogImages)
  const location = useLocation();
  const getBlogID = location.pathname.split("/")[3]; 
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogTitle || '',
      description: blogDescription || '',
      category: blogCategory || '',
      images: blogImages || '',
    },
    validationSchema: blogSchema,
    onSubmit: values => {
      if (getBlogID !== undefined) {
        const data = {id: getBlogID, blogData: values}
        dispatch(updateBlog(data))
      }else{
        dispatch(createBlog(values))
      }
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate('/admin/blog-list');
      }, 3000);
      // alert(JSON.stringify(values));
    },
  });
  
  // const img = [];
  // imageState && imageState.forEach((i) =>{
  //   img.push({
  //     public_id: i.public_id,
  //     url: i.url,
  //   })
  // })
  const img = useMemo(() => {
      return imageState && imageState.map(i => ({ public_id: i.public_id, url: i.url }));
  }, [imageState]);
  
  useEffect(() => {
    formik.setValues({ ...formik.values, images:img });
  }, [img]);

  useEffect(() => {
    if (getBlogID !== undefined) {
      dispatch(getABlog(getBlogID));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getBlogID]);
  useEffect(() => {
    if (isSuccess && createBlogs) {
      toast.success("Blog has been created successfully.", {
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
    if (isSuccess && updateBlogs) {
      toast.success("Blog has been update successfully.", {
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
  }, [isError, isSuccess, isLoading, createBlogs, updateBlogs]);

  useEffect(() => {
    dispatch(getBlogCats());
  }, [dispatch]);

  return (
    <div style={{ padding: "30px" }}>
      <h3 className='mb-4'>{getBlogID !== undefined ? "Edit" : "Add"} Blog</h3>
      <div className=''>
        <form action='' onSubmit={formik.handleSubmit}>
          <div className='mt-4'>
            <CustomInput 
              type="text" 
              placeholder="Enter Blog Name" 
              id="title"
              name="title"
              onCh={formik.handleChange("title")}
              val={formik.values.title}
            />
            <div className='error'>
              {formik.touched.title && formik.errors.title}
            </div>
          </div>

          <div className='mt-3'>
            <select 
              name='category' 
              id='category'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category} 
              className='form-control py-3'>
              <option value="">Select Blog category</option>
              {blogState.map((item, key) => (
                <option key={key} value={item.title}>{item.title}</option>
              ))}
            </select>
            <div className='error'>
              {formik.touched.category && formik.errors.category}
            </div>
          </div>
          <div className='mt-3'>
            <ReactQuill 
              theme="snow" 
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
            <div className='error'>
              {formik.touched.description && formik.errors.description}
            </div>
          </div>
          <div className='bg-white border-1 py-5 text-center mt-3 rounded-3'>
            <Dropzone onDrop={acceptedFiles => dispatch(getUploads(acceptedFiles))}>
              {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className='show-image d-flex flex-wrap gap-3'>
            {(imageState || blogImages ) && ( imageState || blogImages ).map((item, key) => (
              <div key={key} className='position-relative'>
                <button 
                  type='button'
                  onClick={() => dispatch(deleteImg(item.public_id))}
                  className='btn-close position-absolute'
                  style={{top: "10px", right: "10px"}}
                ></button>
                <img src={item.url} alt="" width={200} height={200}/>
              </div>
            ))}
          </div>
          <button type='submit' className='btn btn-success border-0 rounded-3 my-5'>
            {getBlogID !== undefined ? "Edit" : "Add"} Blog
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddBlog;
