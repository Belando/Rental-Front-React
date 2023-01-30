//REACT
import React, { useEffect, useState } from 'react'
import { InputText } from '../../../common/InputText/InputText'
import { Decoder } from '../../../services/utiles';
import { modifyUser } from '../../../services/apiCalls';
import { deleteUser } from '../../../services/apiCalls';
import { allRentalsUser } from '../../../services/apiCalls';

//CSS
import './Profile.css';

//ROUTER-DOM
import { useNavigate } from 'react-router-dom'

//RDX
import { useSelector } from "react-redux"
import { userData, modify } from '../userSlice'

//COMPONENT
export const Profile = () => {

    const navigate = useNavigate();
    const userRDX = useSelector(userData);
    const [allRentals, setAllRentals] = useState([]);

    const [usuario, setUsuario] = useState({
        name: '',
        surname: "",
        password: '',
        email: '',
        phone: '',
        country: '',
        dni: ""
    })

    useEffect(() => {
        if (userRDX.userPass.token.data.token === '') {
            navigate("/");
        }
    }, [])

    useEffect(() => {
        if (allRentals.length === 0) {
            allRentalsUser(userRDX.userPass.token.data.token, userRDX.userPass.user._id)
                .then(resultado => {
                    setAllRentals(resultado.data)
                }).catch(error => console.log(error))
        }
    }, [allRentals])

    const modifyInputHandler = (e) => {
        setUsuario((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const Modificame = () => {
        modifyUser(usuario)
            .then(
                resultado => {
                    console.log(resultado)
                    let decodificado = Decoder(resultado.data);
                    let userPass = {
                        token: resultado,
                        user: decodificado.usuario
                    }
                    dispatch(modify({ userPass: userPass }));
                    setTimeout(() => {
                        navigate("/profile")
                    }, 750);
                }
            )
            .catch(error => console.log(error));
    }

    const Eliminame = () => {
        deleteUser(usuario)
            .then(
                deletedUser => {
                    console.log(deletedUser)
                    setTimeout(() => {
                        navigate("/")
                    }, 750);
                }
            )
            .catch(error => console.log(error));
    }

    return (
        <div className='profileDesign'>
            <div className="welcomeDesign"> Bienvenido de nuevo {userRDX.userPass.user.name} </div>
            <div>Datos de usuario:</div>
            <div>{userRDX.userPass.user.name} {userRDX.userPass.user.surname}</div>
            <div>{userRDX.userPass.user.phone}</div>
            <div>{userRDX.userPass.user.country}</div>
            <div>{userRDX.userPass.user.email}</div>
            <div>{userRDX.userPass.user.dni}</div>
            <InputText type={'text'} name={'name'} placeholder={'Nombre'} functionHandler={modifyInputHandler} />
            <InputText type={'text'} name={'surname'} placeholder={'Apellido'} functionHandler={modifyInputHandler} />
            <InputText type={'password'} name={'password'} placeholder={'Contraseña'} functionHandler={modifyInputHandler} />
            <InputText type={'number'} name={'phone'} placeholder={'Teléfono'} functionHandler={modifyInputHandler} />
            <InputText type={'text'} name={'country'} placeholder={'País'} functionHandler={modifyInputHandler} />
            <InputText type={'email'} name={'email'} placeholder={'Email'} functionHandler={modifyInputHandler} />
            
            <div className='modifyButtonDesign' onClick={() => Modificame()}>Modificar</div>
            <div className='deleteButtonDesign' onClick={() => Eliminame()}>Eliminar</div>

            <h3 className='titulo'>Series alquiladas por el usuario</h3>
            <div className='Table'>
                
                <table>
                    <th>Serie</th>
                    <th>Inicio Alquiler</th>
                    <th>Fin Alquiler </th>
                    <th>Precio </th>
                    </table>
                {allRentals.length > 0 && allRentals.map(
                    rental => {
                        return (
                            <div key={rental._id}>
                                <table>
                                    <th>{rental.nameSerie}</th>
                                    <th>{rental.rentalDate}</th>
                                    <th>{rental.returnDate}</th>
                                    <th>{rental.price}</th>
                                    </table>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}