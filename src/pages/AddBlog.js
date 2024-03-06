import React, { useState } from 'react'
import { CustomInput } from '../components/CustomInput'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddBlog = () => {
  const [ desc ,setDesc ] = useState('');
  //const [value, setValue] = useState('');
  const handleDesc = (e) =>{
   setDesc(e)
  }
  return (
    <div style={{padding:"30px"}}>
      <h3 className='mb-4'>Add Blog</h3>
      <div className=''>
        <form action=''>
            <CustomInput type="text" placeholder="Enter Blogs Title" id="blog" />
            <select name='' id='' className='form-control py-3 mb-3'>
                <option value="">Select Blog Category</option>
            </select>
            <ReactQuill 
                theme="snow" 
                value={desc} 
                onChange={(content) => {
                    handleDesc(content);
                }} 
            />
            {/* <ReactQuill theme="snow" value={value} onChange={setValue} /> */}
        </form>
      </div>
    </div>
  )
}

export default AddBlog
