//REACT
import React, { useState, useEffect } from 'react'
import { InputText } from '../../../common/InputText/InputText'
import { postLogin } from '../../../services/apiCalls'
import { Decoder, errorCheck } from '../../../services/utiles'
//ROUTER-DOM
import { useNavigate } from 'react-router-dom'
//CSS
import './Login.css'
//RDX
import { useSelector, useDispatch } from "react-redux"
import { userData, login } from '../userSlice'

//COMPONENT
export const Login = () => {
    const dispatch = useDispatch();
    const datosReduxUsuario = useSelector(userData);
    const navigate = useNavigate();

    const [credenciales, setCredenciales] = useState({
        email: '',
        password: ''
    })

    const [credencialesError, setErrorCredenciales] = useState({
        emailError: '',
        passwordError: ''
    })

    const InputHandler = (e) => {
        setCredenciales((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const Logeame = () => {

        for (const property in credencialesError) {
            if (credencialesError[property] !== '') {
                return;
            }
        }

        postLogin(credenciales)
            .then(
                resultado => {
                    let decodificado = Decoder(resultado.data.token);
                    console.log(decodificado)
                    let userPass = {
                        token: resultado,
                        user: decodificado.usuario
                    }
                    
                    dispatch(login({ userPass: userPass }));
                    setTimeout(() => {
                        navigate("/")
                    }, 750);
                })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        if (datosReduxUsuario.userPass.token !== '') {
            navigate("/");
        }
    }, [])

    const loginErrorHandler = (e) => {
        let error = '';
        error = errorCheck(e.target.name, e.target.value);
        
        setErrorCredenciales((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error
        }));
    }

    return (
        <div className='loginDesign'>
            <pre>Accede a tu perfil</pre>
            <InputText
                type={"email"}
                name={"email"}
                className={credencialesError.emailError === '' ? 'inputDesign' : 'inputDesign inputDesignError'}
                placeholder={"Escribe tu email"}
                functionHandler={InputHandler}
                errorHandler={loginErrorHandler} />

            <div className='errorText'>{credencialesError.emailError}</div>

            <InputText
                type={"password"}
                name={"password"}
                className={credencialesError.passwordError === '' ? 'inputDesign' : 'inputDesign inputDesignError'}
                placeholder={"Escribe tu contraseña"}
                functionHandler={InputHandler}
                errorHandler={loginErrorHandler} />

            <div className='errorText'>{credencialesError.passwordError}</div>

            <div className='loginButtonDesign' onClick={() => Logeame()}>LOGIN</div>
        </div>
    )
}