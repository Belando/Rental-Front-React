import React, { useState, useEffect } from 'react';
import './Admin.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from '../userSlice';
import { allUsersAdmin } from '../../../services/apiCalls';

export const Admin = () => {

    const navigate = useNavigate();
    const userRDX = useSelector(userData);
    const [allRentals, setAllRentals] = useState([]);

    useEffect(() => {
        if (userRDX.userPass.user.rol !== 'admin') {
            navigate("/");
        }
    }, [])

    useEffect(() => {
        if (allRentals.length === 0) {
            allUsersAdmin(userRDX.userPass.token.data.token)
                .then(resultado => {
                    setAllRentals(resultado.data);
                })
                .catch(error => console.log(error));
        };
    }, [allRentals]);

    return (
        <div className='adminDesign'>
            <h2 className='titulo'>Administración de todos los alquileres</h2>
            <div className='Table'><table>
                <th>Usuario</th>
                <th>Inicio Alquiler</th>
                <th>Fin Alquiler </th>
                <th>Precio </th>
                <th>Serie</th>
            </table></div>
            
            {allRentals.length > 0 && allRentals.map(
                rental => {
                    return (
                        <div className='Table' key={rental._id}>
                            <table>
                                <td>{rental.nameUser}</td>
                                <td>{rental.rentalDate}</td>
                                <td>{rental.returnDate}</td>
                                <td>{rental.price}</td>
                                <td>{rental.nameSerie}</td>
                            </table>
                        </div>
                    )
                })}
        </div>
    )
};