import React from 'react'

export const CustomInput = (props) => {
    const {type, id, Class, placeholder} = props
  return (
    <div className="form-floating mb-3">
        <input 
        type={type} 
        className={`form-control ${Class}` }
        id={id} 
        placeholder={placeholder}/>
        <label htmlFor={id}>{placeholder}</label>
    </div>
  )
}
