import React, { useEffect } from 'react'
import { CustomInput } from '../components/CustomInput'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice'


let userSchema = Yup.object({ 
  email: Yup.string().email("Email Should be Valid").required("Email is Required"),
  password: Yup.string().required("Password is Required"),
}); 

const Login = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validationSchema:userSchema ,
    onSubmit: values => {
      dispatch(login(values))
    },
  });
  const {user, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth);

  useEffect(() =>{
    if (!user == null || isSuccess) {
      navigate('admin');
    }else{
      navigate(""); 
    }
  },[user, isLoading, isSuccess, isError, message, navigate])

  return (
    <div className='py-5' style={{background:"#ffd333", minHeight:"100vh"}}>
      <br />
      <br />
      <div className='my-5 w-30 bg-white rounded-3 mx-auto p-4'>
      <h3 className='text-center title'>Login</h3>
      <p className='text-center'>Login to your account to continue</p>
      <div className='error text-center'>
        {message.message === "Rejected" ? "You are not an admin":""}
      </div>
        <form action='' onSubmit={formik.handleSubmit}>
          <CustomInput type="email" name="email" val={formik.values.email} onCh={formik.handleChange('email')} placeholder="Email Address" id="email"/>
          <div className='error'>
          {formik.touched.email && formik.errors.email ? (
         <div>{formik.errors.email}</div>
       ) : null}
          </div>
          <CustomInput type="password" name="password" val={formik.values.password} onCh={formik.handleChange('password')} placeholder="Password" id="password"/>
          <div className='error'>
          {formik.touched.password && formik.errors.password ? (
         <div>{formik.errors.password}</div>
       ) : null}
          </div>
          <div className='mb-3 text-end'>
            <Link to="/forgot-password" className='text-decoration-none text-dark'>
              Forgot Password
            </Link>
          </div>
          <button
          className='border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none'
          style={{background:"#ffd333"}}
          type='submit'>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
