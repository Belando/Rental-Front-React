import React, { useState, useEffect } from 'react';
import './Admin.css';
import { useNavigate } from 'react-router-dom';

//Imports RDX
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
            allUsersAdmin(userRDX.userPass.token)
                .then(resultado => {
                    setAllRentals(resultado.data);
                })
                .catch(error => console.log(error));
        };
    }, [allRentals]);

    return (
        <div className='adminDesign'>
            {allRentals.length > 0 &&

                allRentals.map(
                    rental => {
                        return (
                            <div key={rental._id}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Email del usuario</th>
                                            <th>Fecha de inicio </th>
                                            <th>Fecha de fin </th>
                                            <th>Precio </th>
                                            <th>Serie alquilada</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{rental.idUser.email}</td>
                                            <td>{rental.rentalDate}</td>
                                            <td>{rental.returnDate}</td>
                                            <td>{rental.price}</td>
                                            <td>{rental.nameSerie}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        )
                    }
                )
            }
        </div>
    )
};