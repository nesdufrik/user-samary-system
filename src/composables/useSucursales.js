import { storeToRefs } from 'pinia'
import { getSucursal } from '../helpers/helpSucursales'
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
