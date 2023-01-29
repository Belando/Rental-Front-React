//REACT
import React, {useEffect, useState} from 'react'
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
import { useSelector, useDispatch } from "react-redux"
import { userData, modify } from '../userSlice'

//COMPONENT
export const Profile = () => {

    const dispatch = useDispatch();
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
        dni:""
    })
    
    useEffect(()=>{
        if(userRDX.userPass.token === ''){
            navigate("/");
        } else {
            console.log(userRDX.userPass);
        }
    },[])

    useEffect(() => {
        if (allRentals.length===0){
            allRentalsUser(userRDX.userPass.token.data.token,userRDX.userPass.user._id)
            .then(resultado => {
                setAllRentals(resultado.data)
            }).catch(error => console.log(error))
        }
    },[allRentals])

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
                    let decodificado = Decoder(resultado.data.token);
                    let userPass = {
                        token : resultado,
                        user: decodificado.usuario[0]
                    }
                    dispatch(modify({userPass: userPass}));
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
            <InputText type={'text'} name={'dni'} placeholder={'DNI'} functionHandler={modifyInputHandler} />
            <div className='modifyButtonDesign' onClick={() => Modificame()}>Modificar</div>
            <div className='deleteButtonDesign' onClick={() => Eliminame()}>Eliminar</div>
            
            <div className='rosterDesign'>
            <div><h2>ALQUILERES REALIZADOS</h2></div>
            <div>
                {allRentals.length >0 &&
                
                allRentals.map(
                    rental=>{
                        return (
                            <div>
                                <div key={rental._id}>

                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Fecha Inicio</th>
                                                <th>Fecha Fin</th>
                                                <th>Nombre de la Serie</th>
                                                <th>Valor del Alquiler</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{rental.fechaInicio}</td>
                                                <td>{rental.fechaFin}</td>
                                                <td>{rental.nameserie}</td>
                                                <td>{rental.importe} €</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    }
                )
                }
            </div>
            </div>
        </div>
    )
}