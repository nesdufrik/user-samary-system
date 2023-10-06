import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCarritoStore } from '../stores/carritoStore'
import { useOrdenesStore } from '../stores/ordenesStore'
import { useCajaStore } from '../stores/cajaStore'
import {
	deleteOrden,
	getOrden,
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
	const { ordenesArr, ordenIdSelected, ordenSelected, actionState, errorApi } =
		storeToRefs(ordenesStore)

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
		printPageToOrder(check.data._id, cajaActual.value._id)
	}

	const listOrdenes = async () => {
		ordenesStore.addOrdenes(await getOrdenes(cajaActual.value._id))
	}

	const manageOrden = (ordenId) => {
		const { cliente, mesa, pedido, tipo, total } = ordenesArr.value.find(
			(el) => el._id === ordenId
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

		const { pedido } = carritoOrden.value
		const hayPendientes = pedido.some((orden) => orden.pendiente > 0)

		if (!hayPendientes) carritoOrden.value.estado = 'finalizado'

		const response = await putOrden(ordenIdSelected.value, carritoOrden.value)
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
		printPageToOrder(ordenIdSelected.value, cajaActual.value._id)
	}

	const selectOrden = (id) => {
		const { _id, cliente, mesa, pedido, estado, total } = ordenesArr.value.find(
			(el) => el._id === id
		)

		ordenSelected.value = {
			_id,
			cliente: cliente ?? {},
			mesa,
			pedido,
			estado,
			desc: 0,
			propina: 0,
			subtotal: total,
			total,
		}
	}

	const loadDataToPrint = async (orderId) => {
		const data = await getOrden(orderId)
		ordenSelected.value = data.data
	}

	const checkOrdenUpdate = async (index) => {
		ordenSelected.value.pedido[index].pendiente = 0
		actionState.value = true

		const totalPendientes = ordenSelected.value.pedido.filter(
			(el) => el.pendiente !== 0
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
		actionState.value = true

		if (!ordenSelected.value.payMetodo) {
			actionState.value = false
			errorApi.value = {
				show: true,
				message: 'Debe elegir un metodo de pago',
			}
			return
		}
		ordenesStore.updateOrden(
			await payOrden(ordenSelected.value._id, ordenSelected.value)
		)
		actionState.value = false
	}

	const borrar = async (id) => {
		errorApi.value.show = false
		actionState.value = true
		const response = await deleteOrden(id)
		if (!response.success) {
			actionState.value = false
			errorApi.value = {
				show: true,
				message: response.data.message,
			}
			return
		}
		ordenesStore.deleteOrden(id)
		actionState.value = false
		errorApi.value = {}
	}

	const printPage = (order) => {
		window.open(`/printOrder?order=${order}`, '_blank')
	}

	const printPageToOrder = (order, caja) => {
		window.open(`/printOrderToOrder?order=${order}&caja=${caja}`, '_blank')
	}

	const nroTotalPedientes = computed(() => (array) => {
		const total = array.reduce((acc, el) => acc + (el.pendiente ? 1 : 0), 0)
		return total
	})

	const cleanForm = () => {
		ordenSelected.value = { cliente: {} }
	}

	// Analiticas
	const totalBeneficios = computed(() => {
		const finalizado = ordenesArr.value.filter(
			(el) => el.estado === 'terminado'
		)
		const total = finalizado.reduce((acc, el) => acc + (el.total || 0), 0)
		return total
	})
	const totalOrdenes = computed(() => {
		const finalizado = ordenesArr.value.filter(
			(el) => el.estado === 'terminado'
		)
		const total = finalizado.length
		return total
	})
	const totalCantidad = computed(() => {
		const finalizado = ordenesArr.value.filter(
			(el) => el.estado === 'terminado'
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
	})

	return {
		ordenesArr,
		ordenSelected,
		actionState,
		errorApi,

		nroTotalPedientes,

		// analiticas
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
		loadDataToPrint,
		printPage,
		cleanForm,
	}
}
