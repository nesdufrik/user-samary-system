import axios from 'axios'

export const getCategorias = async () => {
    return await axios
        .get(`/categorias/pos/get`)
        .then(res => res.data.data)
        .catch(err => err.response.data)
}
export const getProductos = async () => {
    return await axios
        .get(`/items/pos/get`)
        .then(res => res.data.data)
        .catch(err => err.response.data)
}
