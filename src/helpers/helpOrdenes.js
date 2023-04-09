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

export const putOrden = async (ordenId, payload) => {
    return axios
        .put(`/ordenes/id/${ordenId}`, payload)
        .then(res => res.data)
        .catch(err => err.response.data)
}

export const payOrden = async (ordenId, payload) => {
    return axios
        .put(`/ordenes/pagar/${ordenId}`, payload)
        .then(res => res.data)
        .catch(err => err.response.data)
}

export const deleteOrden = async ordenId => {
    return axios
        .delete(`/ordenes/id/${ordenId}`)
        .then(res => res.data)
        .catch(err => err.response.data)
}
