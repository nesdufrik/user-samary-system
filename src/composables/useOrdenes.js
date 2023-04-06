import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCarritoStore } from '../stores/carritoStore'
import { useOrdenesStore } from '../stores/ordenesStore'
import {
    deleteOrden,
    getOrdenes,
    postOrden,
    putOrden,
} from '../helpers/helpOrdenes'

export const useOrdenes = () => {
    const router = useRouter()

    const carritoStore = useCarritoStore()
    const ordenesStore = useOrdenesStore()

    const { carritoOrden } = storeToRefs(carritoStore)
    const { ordenesArr, ordenIdSelected, actionState, errorApi } =
        storeToRefs(ordenesStore)

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

    const manageOrden = ordenId => {
        const { cliente, estado, mesa, pedido, tipo, total } =
            ordenesArr.value.find(el => el._id == ordenId)

        carritoOrden.value = {
            cliente,
            estado: 'pendiente',
            mesa,
            pedido,
            tipo,
            total,
        }
        ordenIdSelected.value = ordenId
        router.push({ path: '/pos' })
    }

    const actualizar = async () => {
        errorApi.value.show = false
        actionState.value = true
        const response = await putOrden(ordenIdSelected.value)
        if (!response.success) {
            actionState.value = false
            errorApi.value = {
                show: true,
                message: response.data.message,
            }
            return
        }
    }

    const selectOrden = id => {
        ordenIdSelected.value = id
    }

    const borrar = async () => {
        errorApi.value.show = false
        actionState.value = true
        const response = await deleteOrden(ordenIdSelected.value)
        if (!response.success) {
            actionState.value = false
            errorApi.value = {
                show: true,
                message: response.data.message,
            }
            return
        }
        ordenesStore.deleteOrden(ordenIdSelected.value)
        actionState.value = false
        ordenIdSelected.value = ''
        errorApi.value = {}
    }

    return {
        ordenesArr,
        actionState,
        errorApi,

        ordenar,
        borrar,
        listOrdenes,
        manageOrden,
        selectOrden,
    }
}
