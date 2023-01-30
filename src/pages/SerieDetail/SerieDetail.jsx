//REACT
import React, {useState} from 'react';
//CSS
import './SerieDetail.css';
//REACT-ROUTER-DOM
import { useNavigate } from 'react-router-dom';
//RDX
import { useSelector } from "react-redux";
import { serieData } from '../serieSlice';
import { userData } from '../User/userSlice';
import { poster_default } from '../../services/utiles';
import { postRent } from '../../services/apiCalls';
import dayjs from 'dayjs';

//COMPONENT
export const SerieDetail = () => {
    //RDX DATA
    const detailRdx = useSelector(serieData);
    const detailUsr = useSelector(userData);
    const navigate = useNavigate();
    const [msg, setMsg] = useState('');

    const Rentme = () => {
    console.log(detailRdx.choosen)
    console.log(detailUsr.userPass)
    const precio = 5 + "€"
        let body = {
            idSerie : detailRdx.choosen._id,
            nameSerie : detailRdx.choosen.name,
            idUser : detailUsr.userPass.user._id,
            nameUser : detailUsr.userPass.user.name,
            rentalDate : dayjs().format('DD/MM/YYYY'),
            returnDate : dayjs().add(7, 'days').format('DD/MM/YYYY'),
            price : precio 
        }

        postRent(body, detailUsr.userPass.token.data.token)
        
            .then(resultado => {
                setMsg(resultado.data.data)
                setTimeout(()=>{
                    navigate('/');
                },1500);
            })
            .catch(error => {
                setMsg(error.message);
            });
    }

    return(
        <div className='serieDesign'>
            {detailRdx.choosen.id !== '' &&    
                <div className='serieDetailCard'>
                    <div>{detailRdx.choosen.name}</div>
                    <div><img className='detailPoster' src={`${poster_default}${detailRdx.choosen.poster_path}`}/></div>
                    <br></br>
                    <div>{detailRdx.choosen.year !== '' ? detailRdx.choosen.year : "TBA"}</div>
                    <br></br>
                    <div>Género: {detailRdx.choosen.genre !== '' ? detailRdx.choosen.genre : "No genre available"}</div>
                    <br></br>
                    <div>Capítulos: {detailRdx.choosen.chapter !== '' ? detailRdx.choosen.chapter : "TBA"}</div>
                    <br></br>
                    {detailUsr.userPass.token !== '' &&      
                        <div onClick={()=>Rentme()} className="rentDesign">ALQUILAME</div>
                    }
                    <div>{msg}</div>
                </div>
            }
        </div>
    )
}