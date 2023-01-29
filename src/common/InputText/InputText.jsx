//REACT
import React from 'react'

//CSS
import "./InputText.css"

//COMPONENT
export const InputText = ({type, name, placeholder, functionHandler, errorHandler}) => {

    return (
        <input 
            type={type} 
            name={name} 
            placeholder={placeholder} 
            onChange={(e)=>functionHandler(e)} 
            onBlur={(e)=>errorHandler(e)} 
            className='inputDesign'
        />
    )
}

export const registerInputText = ({type, name, placeholder, functionHandler, errorHandler}) => {

    return (
        <input 
            type={type} 
            name={name} 
            placeholder={placeholder} 
            onChange={(e)=>functionHandler(e)}
            onBlur={(e)=>errorHandler(e)}  
            className='inputDesign' 
        />
    )
}

export const modifyInputText = ({type, name, placeholder, functionHandler, errorHandler}) => {

    return (
        <input 
            type={type} 
            name={name} 
            placeholder={placeholder} 
            onChange={(e)=>functionHandler(e)} 
            onBlur={(e)=>errorHandler(e)} 
            className='inputDesign' 
        />
    )
}

export const deleteInputText = ({type, name, placeholder, functionHandler, errorHandler}) => {

    return (
        <input 
            type={type} 
            name={name} 
            placeholder={placeholder} 
            onChange={(e)=>functionHandler(e)} 
            onBlur={(e)=>errorHandler(e)} 
            className='inputDesign' 
        />
    )
}