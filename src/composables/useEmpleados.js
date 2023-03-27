import { storeToRefs } from 'pinia'
import { useEmpleadosStore } from '../stores/empleadosStore'
import {
    deleteEmpleado,
    getEmpleados,
    postEmpleado,
    putEmpleado,
} from '../helpers/helpEmpleados'

export const useEmpleados = () => {
    const empleadosStore = useEmpleadosStore()

    const { empleadosArr, empleadoForm, actionState, errorApi } =
        storeToRefs(empleadosStore)

    const listEmpleados = async sucursalId => {
        empleadosStore.loadEmpleados(await getEmpleados(sucursalId))
    }

    const updateEmpleado = async empleadoId => {
        errorApi.value.show = false
        actionState.value = true
        empleadosStore.updtEmpleado(
            await putEmpleado(empleadoForm.value, empleadoId)
        )
        actionState.value = false
    }

    return {
        //! propiedades
        empleadosArr,
        empleadoForm,
        actionState,
        errorApi,

        //! metodos
        listEmpleados,
        updateEmpleado,
    }
}
