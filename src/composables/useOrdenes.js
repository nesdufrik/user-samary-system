import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCarritoStore } from '../stores/carritoStore'
import { useOrdenesStore } from '../stores/ordenesStore'
import { useCajaStore } from '../stores/cajaStore'
import {
    deleteOrden,
    getOrdenes,
    payOrden,
    postOrden,
    putOrden,
} from '../helpers/helpOrdenes'
import { computed } from 'vue'

export const useOrdenes = () => {
    const router = useRouter()

    const carritoStore = useCarritoStore()
    const ordenesStore = useOrdenesStore()
    const cajaStore = useCajaStore()

    const { cajaActual } = storeToRefs(cajaStore)
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
        const check = await postOrden(carritoOrden.value, cajaActual.value._id)
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
        ordenesStore.addOrdenes(await getOrdenes(cajaActual.value._id))
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

    const selectOrdenToCheck = id => {
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

    const selectOrdenToPay = id => {
        const { _id, cliente, mesa, pedido, estado, total } =
            ordenesArr.value.find(el => el._id == id)

        ordenSelected.value = {
            _id,
            cliente: cliente ?? {},
            mesa,
            pedido,
            estado,
            total,
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

    const pagarOrden = async () => {
        errorApi.value.show = false
        actionState.value = true

        if (!ordenSelected.value.payMetodo) {
            actionState.value = false
            errorApi.value = {
                show: true,
                message: 'Debe elegir un metodo de pago',
            }
            return
        }

        const response = await payOrden(
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

    const nroTotalPedientes = computed(() => {
        return total => totalPendiente(total)
    })
    const puedoBorrar = computed(() => {
        return res => sePuedeBorrar(res)
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
    function totalPendiente(array) {
        // const total = array.reduce((acc, el) => acc + (el.pendiente || 0), 0)
        const total = array.reduce((acc, el) => acc + (el.pendiente ? 1 : 0), 0)
        return total
    }
    function sePuedeBorrar(array) {
        const qty = array.reduce((acc, el) => acc + (el.cantidad || 0), 0)
        const pen = array.reduce((acc, el) => acc + (el.pendiente || 0), 0)
        if (qty !== pen) {
            return false
        }
        return true
    }

    //Analiticas
    const totalBeneficios = computed(() => funTotalBeneficios())
    const totalOrdenes = computed(() => funTotalOrdenes())
    const totalCantidad = computed(() => funTotalCantidad())

    function funTotalBeneficios() {
        const finalizado = ordenesArr.value.filter(
            el => el.estado === 'terminado'
        )
        const total = finalizado.reduce((acc, el) => acc + (el.total || 0), 0)
        return total
    }
    function funTotalOrdenes() {
        const finalizado = ordenesArr.value.filter(
            el => el.estado === 'terminado'
        )
        const total = finalizado.length
        return total
    }
    function funTotalCantidad() {
        const finalizado = ordenesArr.value.filter(
            el => el.estado === 'terminado'
        )
        const total = finalizado.reduce((total, orden) => {
            return (
                total +
                orden.pedido.reduce((subtotal, item) => {
                    return subtotal + item.cantidad
                }, 0)
            )
        }, 0)

        return total
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
        nroTotalPedientes,
        puedoBorrar,

        //analiticas
        totalBeneficios,
        totalOrdenes,
        totalCantidad,

        ordenar,
        borrar,
        actualizar,
        pagarOrden,
        checkOrdenUpdate,
        listOrdenes,
        manageOrden,
        selectOrden,
        selectOrdenToCheck,
        selectOrdenToPay,
    }
}
