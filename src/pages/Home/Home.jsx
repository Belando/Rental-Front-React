//REACT
import React, { useState, useEffect } from 'react'
import { CardSerie } from '../../common/CardSerie/CardSerie'
import { getSeries } from '../../services/apiCalls'
//CSS & MEDIA
import './Home.css';
import Loading from './loading.gif'
//ROUTER-DOM
import { useNavigate } from 'react-router-dom'
//RDX
import { useSelector, useDispatch } from "react-redux"
import { serieData, select } from '../serieSlice'

//COMPONENT
export const Home = () => {

    const dispatch = useDispatch()
    const datosReduxSeries = useSelector(serieData)
    const navigate = useNavigate()
    const [series, setSeries] = useState([])

    useEffect(() => {
        if (series.length === 0) {
            setTimeout(() => {
                getSeries()
                    .then(
                        resultado => {
                            setSeries(resultado.data)
                        })
                    .catch(error => console.log(error))
            }, 1000)
        }
    }, [series])

    const Choosen = (serie) => {

        dispatch(select({ choosen: serie }))
        setTimeout(() => {
            navigate("/detail");
        }, 250);
    }

    return (
        <div className='homeDesign'>
            
            {datosReduxSeries.series.length > 0 ? (
                <div className='rosterDesign'>
                    
                    {datosReduxSeries.series.map(
                        serie => {
                            return (
                                <div onClick={() => Choosen(serie)} key={serie._id}>
                                    <CardSerie serie={serie} />
                                </div>
                            )
                        }
                    )}
                </div> 
            ) :(
                series.length > 0 ? (
                        <div className='rosterDesign'>
                            {series.map(
                                serie => {
                                    return (
                                        <div onClick={() => Choosen(serie)} key={serie._id}>
                                            <CardSerie serie={serie} />
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    ) : (
                        <div>
                            <img className="loadingGif" src={Loading} alt="Cargando" />
                        </div>
                    )
                )
            }
        </div>
    )
}