import React, { useEffect, useState } from 'react'
import { CustomInput } from '../components/CustomInput'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brands/brandSlice';
import { getCategories } from '../features/category/categorySlice';
import { getColors } from '../features/color/colorSlice';
import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";
import Dropzone from 'react-dropzone'

let userSchema = Yup.object({ 
  title: Yup.string().required("Title is Required"),
  code: Yup.string().required("Code is Required"),
  price: Yup.number().required("Price is Required"),
  quantity: Yup.number().required("Quantity is Required"),
  description: Yup.string().required("Description is Required"),
});
const AddProduct = () => {
  const dispatch = useDispatch();
  const [color, setColor] = useState([]);
  const formik = useFormik({
    initialValues:{
      title:'',
      code:'',
      price:'',
      quantity:'',
      description:'',
      color:'',
      category:'',
      brand:''
    },
    validationSchema:userSchema ,
    onSubmit: values => {
      alert(JSON.stringify(values));
    },
  });

  //get brand , categories, color
  useEffect(() =>{
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
    formik.values.color = color;
  },[dispatch]);
  const brandState = useSelector((state) => state.brand.brands);
  const categoryState = useSelector((state) =>state.category.categories);
  const colorState = useSelector((state) =>state.color.colors);
  const colors = [];
  colorState.forEach((i) =>{
    colors.push({
      id:i._id,
      color:i.title
    })
  });

  return (
    <div style={{padding:"30px"}}>
      <h3 className='mb-4 title'>Add Product</h3>
      <div>
        <form onSubmit={formik.handleSubmit} className='d-flex gap-3 flex-column'>
            <div className='row d-flex justify-content-between'>
              <div className='col-6'>
                <CustomInput 
                type="text" 
                placeholder="Enter Product Title" 
                id="title"
                name="title"
                onCh={formik.handleChange("title")}
                val={formik.values.title}
                />
                <div className='error'>
                  {formik.touched.title && formik.errors.title}
                </div>
              </div>
              <div className='col-6'>
                <CustomInput 
                type="text" 
                placeholder="Enter Product Code" 
                id="code"
                name="code"
                onCh={formik.handleChange("code")}
                val={formik.values.code}
                />
                <div className='error'>
                  {formik.touched.code && formik.errors.code}
                </div>
              </div>
            </div>
            <div className=''>
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
            <div className='row'>
              <div className='col-6'>
                <CustomInput 
                  type="number" 
                  placeholder="Enter Product Price" 
                  id="price"
                  name="price"
                  onCh={formik.handleChange("price")}
                  val={formik.values.price}
                />
                <div className='error'>
                  {formik.touched.price && formik.errors.price}
                </div>
              </div>
              <div className='col-6'>
                <CustomInput 
                  type="number" 
                  placeholder="Enter Product quantity" 
                  id="quantity"
                  name="quantity"
                  onCh={formik.handleChange("quantity")}
                  val={formik.values.quantity}
                />
                <div className='error'>
                  {formik.touched.quantity && formik.errors.quantity}
                </div>
              </div>
            </div>
            <Multiselect
              dataKey="id"
              textField="color"
              data={colors}
              onChange={(e)=>setColor(e)}
            />
            <div className='d-flex justify-content-between align-items-center gap-3'>
              <div className='d-flex justify-content-between align-items-end gap-3 flex-grow-1'>
                <select 
                name='category' 
                onChange={formik.handleChange("category")}
                onBlur={formik.handleBlur("category")}
                value={formik.values.category}
                className='form-control py-3'
                id='category'>
                  <option value="">Select Category</option>
                  {categoryState.map((item, key)=>{
                    return(
                      <option key={key} value={item.title}>{item.title}</option>
                    )
                  })}
                </select>
                <select 
                name='brand' 
                onChange={formik.handleChange("brand")}
                onBlur={formik.handleBlur("brand")}
                value={formik.values.brand}
                className='form-control py-3'
                id=''>
                  <option value="">Select Brand</option>
                  {brandState.map((item, key) =>{
                    return (
                      <option key={key} value={item.title}>{item.title}</option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div className='bg-white border-1 py-5 text-center rounded-3'>
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
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
            <button type='submit' className='btn  btn-success border-0 rounded-3 my-5'>Add Product</button>
        </form>
      </div>
    </div>
  )
}

export default AddProduct
