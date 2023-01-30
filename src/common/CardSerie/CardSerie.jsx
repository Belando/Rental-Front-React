//REACT
import React from 'react'
import { poster_default } from '../../services/utiles'

//CSS
import './CardSerie.css'

//COMPONENT
export const CardSerie = ({serie}) => {
    
    return (
        <div className='cardSerieDesign'>
            {/* <div>{serie.name !== '' ? serie.name : "Nombre no disponible"}</div> */}
            <img className='posterDesign' src={`${poster_default}${serie.poster_path}`}/>
            <div>{serie.year !== '' ? serie.year : "TBA"}</div>
        </div>
    )
}