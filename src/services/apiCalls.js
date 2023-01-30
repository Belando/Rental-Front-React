import axios from "axios"
const root = "http://localhost:5500"

export const postLogin = async (credenciales) => {
    return await axios.post(`${root}/users/login`, credenciales);
}

export const postRegister = async (body) => {
    return await axios.post(`${root}/users/register`, body)
}

export const modifyUser = async () => {
    return await axios.put(`${root}/users/profile/modify`);
}

export const deleteUser = async () => {
    return await axios.delete(`${root}/users/profile/delete`);
}

export const getSearch = async (criterioBusqueda) => {
    return await axios.get(`${root}/series/search/${criterioBusqueda}`);
}

export const getSeries = async () => {
    return await axios.get(`${root}/series`);
}

//Funcion que alquila

export const postRent = async (body, token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return await axios.post(`${root}/rentals/newrental`, body, config);
}

export const allRentalsUser = async (token, _id) => {
    
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return await axios.get(`${root}/rentals/user/${_id}`, config);
}

export const allUsersAdmin = async (token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log ("admin", config)
    return await axios.get(`${root}/rentals/admin`, config);
}


