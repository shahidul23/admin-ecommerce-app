import React from 'react'
import { CustomInput } from '../components/CustomInput'

const ResetPassword = () => {
  return (
    <div className='py-5' style={{background:"#ffd333", minHeight:"100vh"}}>
      <br />
      <br />
      <div className='my-5 w-30 bg-white rounded-3 mx-auto p-4'>
      <h3 className='text-center'>Reset Password</h3>
      <p className='text-center'>Please Enter New Password</p>
        <form action=''>
          <CustomInput type="password" placeholder="New Password" id="password"/>
          <CustomInput type="password" placeholder="Confirm Password" id="password"/>
          <button 
          className='border-0 px-3 py-2 text-white fw-bold w-100'
          style={{background:"#ffd333"}}
          type='submit'>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
