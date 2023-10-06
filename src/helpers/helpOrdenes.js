import axios from 'axios'

export const postOrden = async (payload, caja) => {
	return axios
		.post(`/ordenes/id?caja=${caja}`, payload)
		.then((res) => res.data)
		.catch((err) => err.response.data)
}

export const getOrdenes = async (caja) => {
	return axios
		.get(`/ordenes/id?caja=${caja}`)
		.then((res) => res.data)
		.catch((err) => err.response.data)
}

export const getOrden = async (ordenId) => {
	return axios
		.get(`/ordenes/id/${ordenId}`)
		.then((res) => res.data)
		.catch((err) => err.response.data)
}

export const getOrdenesTerminadas = async (caja) => {
	return axios
		.get(`/ordenes/terminadas?caja=${caja}`)
		.then((res) => res.data)
		.catch((err) => err.response.data)
}

export const putOrden = async (ordenId, payload) => {
	return axios
		.put(`/ordenes/id/${ordenId}`, payload)
		.then((res) => res.data)
		.catch((err) => err.response.data)
}

export const payOrden = async (ordenId, payload) => {
	return axios
		.put(`/ordenes/pagar/${ordenId}`, payload)
		.then((res) => res.data)
		.catch((err) => err.response.data)
}

export const deleteOrden = async (ordenId) => {
	return axios
		.delete(`/ordenes/id/${ordenId}`)
		.then((res) => res.data)
		.catch((err) => err.response.data)
}
