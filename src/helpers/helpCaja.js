import axios from 'axios'

export const getCaja = async () => {
    return await axios
        .get(`/cajas`)
        .then(res => res.data)
        .catch(err => err.response.data)
}

export const postCaja = async payload => {
    return await axios
        .post(`/cajas`, payload)
        .then(res => res.data)
        .catch(err => err.response.data)
}

export const putCaja = async (payload, cajaId) => {
    return await axios
        .put(`/cajas/${cajaId}`, payload)
        .then(res => res.data)
        .catch(err => err.response.data)
}
