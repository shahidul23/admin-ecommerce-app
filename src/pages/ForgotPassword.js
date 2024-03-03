import React from 'react'
import { CustomInput } from '../components/CustomInput'

const ForgotPassword = () => {
  return (
    <div className='py-5' style={{background:"#ffd333", minHeight:"100vh"}}>
      <br />
      <br />
      <br />
      <div className='my-5 w-30 bg-white rounded-3 mx-auto p-4'>
      <h3 className='text-center'>Forgot Password</h3>
      <p className='text-center'>Please enter email to get reset your password</p>
        <form action=''>
          <CustomInput type="email" placeholder="Email Address" id="email"/>
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

export default ForgotPassword
