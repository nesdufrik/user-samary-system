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
import { computed } from 'vue'

export const useOrdenes = () => {
    const router = useRouter()

    const carritoStore = useCarritoStore()
    const ordenesStore = useOrdenesStore()

    const { carritoOrden } = storeToRefs(carritoStore)
    const {
        ordenesArr,
        ordenIdSelected,
        ordenSelected,
        actionState,
        errorApi,
    } = storeToRefs(ordenesStore)

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
        const { cliente, mesa, pedido, tipo, total } = ordenesArr.value.find(
            el => el._id == ordenId
        )

        carritoOrden.value = {
            cliente: cliente ?? {},
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
        const response = await putOrden(
            ordenIdSelected.value,
            carritoOrden.value
        )
        if (!response.success) {
            actionState.value = false
            errorApi.value = {
                show: true,
                message: response.data.message,
            }
            return
        }
        ordenesStore.updateOrden(response)
        actionState.value = false
        carritoStore.limpiarCarrito()
    }

    const selectOrden = id => {
        ordenIdSelected.value = id
    }

    const selectOrdenObject = id => {
        const { _id, cliente, mesa, pedido, estado } = ordenesArr.value.find(
            el => el._id == id
        )

        ordenSelected.value = {
            _id,
            cliente: cliente ?? {},
            mesa,
            pedido,
            estado,
        }
    }

    const checkOrdenUpdate = async index => {
        ordenSelected.value.pedido[index].pendiente = 0
        actionState.value = true

        const totalPendientes = ordenSelected.value.pedido.filter(
            el => el.pendiente !== 0
        )

        if (totalPendientes.length === 0) {
            ordenSelected.value.estado = 'finalizado'
        }
        console.log(ordenSelected.value.estado)
        const response = await putOrden(
            ordenSelected.value._id,
            ordenSelected.value
        )
        if (!response.success) {
            actionState.value = false
            errorApi.value = {
                show: true,
                message: response.data.message,
            }
            return
        }
        ordenesStore.updateOrden(response)
        actionState.value = false
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

    const nroPendientes = computed(() => totalEstado('pendiente'))
    const nroAtendidos = computed(() => totalEstado('finalizado'))
    const nroTerminados = computed(() => totalEstado('terminado'))

    const timeOrden = computed(() => {
        return date => formatDate(date)
    })

    function totalEstado(estado) {
        const total = ordenesArr.value.filter(el => el.estado === estado)
        return total.length
    }

    function formatDate(date) {
        const isoDate = new Date(date)
        const hora = isoDate.toLocaleTimeString([], {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
        })
        return hora
    }

    return {
        ordenesArr,
        ordenSelected,
        actionState,
        errorApi,

        nroPendientes,
        nroAtendidos,
        nroTerminados,
        timeOrden,

        ordenar,
        borrar,
        actualizar,
        checkOrdenUpdate,
        listOrdenes,
        manageOrden,
        selectOrden,
        selectOrdenObject,
    }
}
