import axios from 'axios'

export const getEmpleado = async empleadoId => {
    return await axios
        .get(`/empleados/${empleadoId}`)
        .then(res => res.data)
        .catch(err => err.response.data)
}
export const putEmpleado = async (payload, empleadoId) => {
    return axios
        .put(`/empleados/${empleadoId}`, payload)
        .then(res => res.data)
        .catch(err => err.response.data)
}
