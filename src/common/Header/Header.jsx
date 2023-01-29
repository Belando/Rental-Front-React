//REACT
import React, { useState, useEffect } from 'react'
//ROUTER DOM
import { useNavigate } from 'react-router-dom'
//CSS & MEDIA
import './Header.css'
import Logo from './logo.svg'
//RDX READ&MODIFY
import { useSelector, useDispatch } from "react-redux"
import { userData, logout } from "../../pages/User/userSlice"
import { serieData, find, clear } from '../../pages/serieSlice'
import { InputText } from '../InputText/InputText'
import { getSearch } from '../../services/apiCalls'

//COMPONENT
export const Header = () => {

    //RDX ACTION
    const dispatch = useDispatch()
    const initial = {
        token: '',
        user: {},
    }

    //SEARCH HOOKS
    const [search, setSearch] = useState([]);

    //DATA RDX STATE
    const datosReduxUsuario = useSelector(userData);
    const datosReduxSeries = useSelector(serieData);

    useEffect(() => {
        if (search !== "") {
            
            //SEARCH FUNCTION
            getSearch(search)
                .then(
                    resultado => {
                        //SAVE ON RDX
                        dispatch(find({ series: resultado.data }))
                    }
                )
                .catch(error => console.log(error));
        } else if (search === "" && datosReduxSeries.series.length > 0) {
            dispatch(clear({ choosen: {}, series: [] }));
        }
    }, [search])

    const navigate = useNavigate();

    const logOff = () => {
        dispatch(logout({ userPass: initial }))
        navigate("/")
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const ResetHome = () => {
        dispatch(clear({ choosen: {}, series: [] }));
        navigate("/")
    }

    const searchErrorHandler = (e) => {
        console.log(e);
    }

    return (
        <div className='headerDesign'>
            <div onClick={() => ResetHome()} className='logoDesignHeader'><img id="logoHome" className='cameraAvatar' src={Logo} alt="Camara" /></div>

            <div className='searchDesign'>
                <InputText type={"text"} name={"search"} placeholder={"Busca tu serie"} functionHandler={handleSearch} errorHandler={searchErrorHandler} />
            </div>

            <div className='headerLinksDesign'>
                {datosReduxUsuario.userPass.user.rol === "admin" &&
                    <div onClick={() => navigate("/admin")} className='linkDesign'>Admin</div>
                }
                {datosReduxUsuario.userPass.token !== "" ?
                    (<>
                        <div onClick={() => navigate("/profile")} className='linkDesign' >{datosReduxUsuario.userPass?.user?.name}</div> 
                        <div className='linkDesign' onClick={() => logOff()}>Logout</div>
                    </>)

                    : (<>
                        {/* IF REDUX TOKEN IS EMPTY: */}
                        <div className='linkDesign' onClick={() => setTimeout(() => { navigate("/login") }, 200)}>Login</div>
                        <div className='linkDesign' onClick={() => setTimeout(() => { navigate("/register") }, 200)}>Register</div>
                    </>)
                }
            </div>
        </div>
    )
}
