import { storeToRefs } from 'pinia'
import { useSucursalesStore } from '../stores/sucursalesStore'

export const useSucursales = () => {
	const sucursalesStore = useSucursalesStore()
	const { sucursalData, errorApi } = storeToRefs(sucursalesStore)

	return {
		//! propiedades
		sucursalData,
		errorApi,

		//! metodos
	}
}
