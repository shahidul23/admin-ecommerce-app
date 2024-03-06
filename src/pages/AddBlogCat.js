import React from 'react'
import { CustomInput } from '../components/CustomInput'

const AddBlogCat = () => {
  return (
    <div style={{padding:"30px"}}>
      <h3 className='mb-4'>Add Blog Category</h3>
      <div>
        <form action=''>
            <CustomInput type="text" placeholder="Enter Blog Category" id="BlogCategory"/>
            <button className='btn  btn-success border-0 rounded-3 my-5'>Add Blog Category</button>
        </form>
      </div>
    </div>
  )
}

export default AddBlogCat
