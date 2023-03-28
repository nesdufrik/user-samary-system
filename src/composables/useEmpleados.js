import { storeToRefs } from 'pinia'
import { useEmpleadosStore } from '../stores/empleadosStore'

export const useEmpleados = () => {
    const empleadosStore = useEmpleadosStore()

    const { actionState, errorApi } = storeToRefs(empleadosStore)

    return {
        //! propiedades
        actionState,
        errorApi,

        //! metodos
    }
}
