import React from 'react'
import { CustomInput } from '../components/CustomInput'

const Category = () => {
  return (
    <div style={{padding:"30px"}}>
      <h3 className='mb-4 title'>Add Category</h3>
      <div>
        <form action=''>
            <CustomInput type="text" placeholder="Enter Category" id="Category"/>
            <button className='btn  btn-success border-0 rounded-3 my-5'>Add Category</button>
        </form>
      </div>
    </div>
  )
}

export default Category
