//REACT
import React, { useState, useEffect } from 'react';
import { InputText } from '../../../common/InputText/InputText';
import { postRegister } from '../../../services/apiCalls';
import { useNavigate } from 'react-router-dom';
import { errorCheck } from '../../../services/utiles';

//CSS
import './Register.css';

//COMPONENT
export const Register = () => {

    const [usuario, setUsuario] = useState({
        name: '',
        surname: "",
        password: '',
        email: '',
        phone: '',
        country: '',
        dni: ""
    })

    const [usuarioError, setUsuarioError] = useState({
        nameError: '',
        surnameError: "",
        passwordError: '',
        emailError: '',
        phoneError: '',
        countryError: '',
        dniError: ""
    })

    const navigate = useNavigate();

    const registerInputHandler = (e) => {
        setUsuario((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const registerErrorHandler = (e) => {
        let error = '';
        error = errorCheck(e.target.name, e.target.value);
        setUsuarioError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error
        }));
    }


    const Registrame = () => {
        postRegister(usuario)
            .then(
                newUser => {
                    console.log(newUser)
                    setTimeout(() => {
                        navigate("/login")
                    }, 750);
                }
            )
            .catch(error => console.log(error));
    }

    return (
        <div className='registerDesign'>
            <pre>Registrate para acceder a todas las funcionalidades</pre>

            <InputText type={'text'} name={'name'} placeholder={'Nombre'} 
            className={usuarioError.nameError === '' ? 'inputDesign' : 'inputDesign inputDesignError'} functionHandler={registerInputHandler}
            errorHandler={registerErrorHandler}/>
            <div className='errorText'>{usuarioError.nameError}</div>

            <InputText type={'text'} name={'surname'} placeholder={'Apellido'} 
            className={usuarioError.surnameError === '' ? 'inputDesign' : 'inputDesign inputDesignError'} functionHandler={registerInputHandler} 
            errorHandler={registerErrorHandler}/>
            <div className='errorText'>{usuarioError.surnameError}</div>

            <InputText type={'password'} name={'password'} placeholder={'Contraseña'} 
            className={usuarioError.passwordError === '' ? 'inputDesign' : 'inputDesign inputDesignError'} functionHandler={registerInputHandler} 
            errorHandler={registerErrorHandler}/>
            <div className='errorText'>{usuarioError.passwordError}</div>

            <InputText type={'number'} name={'phone'} placeholder={'Teléfono'} 
            className={usuarioError.phoneError === '' ? 'inputDesign' : 'inputDesign inputDesignError'} functionHandler={registerInputHandler} 
            errorHandler={registerErrorHandler}/>
            <div className='errorText'>{usuarioError.phoneError}</div>

            <InputText type={'text'} name={'country'} placeholder={'País'} 
            className={usuarioError.countryError === '' ? 'inputDesign' : 'inputDesign inputDesignError'} functionHandler={registerInputHandler} 
            errorHandler={registerErrorHandler}/>
            <div className='errorText'>{usuarioError.countryError}</div>

            <InputText type={'email'} name={'email'} placeholder={'Email'} 
            className={usuarioError.emailError === '' ? 'inputDesign' : 'inputDesign inputDesignError'} functionHandler={registerInputHandler}
            errorHandler={registerErrorHandler} />
            <div className='errorText'>{usuarioError.emailError}</div>

            <InputText type={'text'} name={'dni'} placeholder={'DNI'} 
            className={usuarioError.dniError === '' ? 'inputDesign' : 'inputDesign inputDesignError'} functionHandler={registerInputHandler} 
            errorHandler={registerErrorHandler}/>
            <div className='errorText'>{usuarioError.dniError}</div>

            <div className='registerButtonDesign' onClick={() => Registrame()}>Register</div>
        </div>
    )
}
