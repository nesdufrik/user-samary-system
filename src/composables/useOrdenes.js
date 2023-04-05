import { storeToRefs } from 'pinia'
import { useCarritoStore } from '../stores/carritoStore'
import { useOrdenesStore } from '../stores/ordenesStore'
import { getOrdenes, postOrden } from '../helpers/helpOrdenes'

export const useOrdenes = () => {
    const carritoStore = useCarritoStore()
    const ordenesStore = useOrdenesStore()

    const { carritoOrden, actionState, errorApi } = storeToRefs(carritoStore)
    const { ordenesArr } = storeToRefs(ordenesStore)

    const ordenar = async () => {
        errorApi.value.show = false
        actionState.value = true
        const check = await postOrden(carritoOrden.value)
        if (!check.success) {
            actionState.value = false
            errorApi.value = {
                show: true,
                message: check.data.message,
            }
            return
        }
        actionState.value = false
        carritoStore.limpiarCarrito()
    }

    const listOrdenes = async () => {
        ordenesStore.addOrdenes(await getOrdenes())
    }

    return {
        ordenesArr,
        errorApi,

        ordenar,
        listOrdenes,
    }
}
