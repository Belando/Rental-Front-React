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
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        if (userRDX.userPass.user.rol !== 'admin') {
            navigate("/");
        }
    }, [])

    useEffect(() => {
        if (allUsers.length === 0) {
            allUsersAdmin(userRDX.userPass.token.data.token)
                .then(resultado => {
                    setAllUsers(resultado.data);
                })
                .catch(error => console.log(error));
        };
    }, [allUsers]);

    return (
        <div className='adminDesign'>
            <div>  {allUsers.length > 0 &&

                allUsers.map(
                    user => {
                        return (
                            <div>
                                <div key={user._id}>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Email del usuario</th>
                                                <th>Nombre</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{user.email}</td>
                                                <td>{user.name}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    }
                )
            }</div>

            <div>
                <thead>
                    <tr>
                        <th>Email del usuario</th>
                        <th>Fecha de inicio </th>
                        <th>Fecha de fin </th>
                        <th>Precio </th>
                        <th>Serie alquilada</th>
                    </tr>
                </thead>
                {allRentals.length > 0 && allRentals.map(
                    rental => {
                        return (
                            <div > {console.log(rental.rentalDate)}
                                <div key={rental._id}>
                                    <table class="table">
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
                            </div>

                        )
                    }
                )}
            </div>
        </div>
    )
};