import axios from 'axios'

export const postOrden = async payload => {
    return axios
        .post(`/ordenes/id`, payload)
        .then(res => res.data)
        .catch(err => err.response.data)
}

export const getOrdenes = async () => {
    return axios
        .get(`/ordenes/id`)
        .then(res => res.data)
        .catch(err => err.response.data)
}

export const putOrden = async payload => {
    return axios
        .put(`/ordenes/id`, payload)
        .then(res => res.data)
        .catch(err => err.response.data)
}
