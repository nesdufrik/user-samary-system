import axios from 'axios'

export const getSucursal = async id => {
    return await axios
        .get(`/empresas/sucursal/${id}`)
        .then(res => res.data)
        .catch(err => err.response.data)
}
