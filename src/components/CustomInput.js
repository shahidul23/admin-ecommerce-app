import React from 'react'

export const CustomInput = (props) => {
    const {type, id, Class, placeholder, name, val, onCh } = props
  return (
    <div className="form-floating mt-3">
        <input 
        type={type} 
        className={`form-control ${Class}` }
        id={id} 
        name={name}
        value={val}
        onChange={onCh}
        onBlur={onCh}
        placeholder={placeholder}/>
        <label htmlFor={id}>{placeholder}</label>
    </div>
  )
}
