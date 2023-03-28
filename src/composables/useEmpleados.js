import { storeToRefs } from 'pinia'
import { useEmpleadosStore } from '../stores/empleadosStore'
import { getEmpleados, putEmpleado } from '../helpers/helpEmpleados'

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
