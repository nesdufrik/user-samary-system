import { storeToRefs } from 'pinia'
import { useCajaStore } from '../stores/cajaStore'
import { getAllCajas, getCaja, postCaja, putCaja } from '../helpers/helpCaja'
import { getOrdenesTerminadas } from '../helpers/helpOrdenes'
import { computed } from 'vue'

export const useCaja = () => {
    const cajaStore = useCajaStore()

    const {
        cajasArr,
        cajaActual,
        cajaSelected,
        cajaOrdenesArr,
        actionState,
        errorApi,
    } = storeToRefs(cajaStore)

    // List of operations

    const listAllCajas = async () => {
        const res = await getAllCajas()
        cajaStore.addCajas(res)
    }

    const loadCaja = async () => {
        const res = await getCaja()
        if (res.data === null) {
            cajaActual.value = {
                active: false,
            }
            return
        }
        cajaStore.manageCaja(res)
    }

    const loadOrdenesOfCaja = async cajaId => {
        const res = await getOrdenesTerminadas(cajaId)
        cajaStore.addOrdenesCaja(res)
    }

    const abrirCaja = async () => {
        errorApi.value.show = false
        actionState.value = true
        const payload = {
            active: true,
        }
        const check = await postCaja(payload)
        if (!check.success) {
            actionState.value = false
            errorApi.value = {
                show: true,
                message: check.data.message,
            }
            return
        }
        cajaStore.manageCaja(check)
        actionState.value = false
    }

    const cerrarCaja = async () => {
        errorApi.value.show = false
        actionState.value = true
        const payload = {
            active: false,
        }
        const check = await putCaja(payload, cajaActual.value._id)
        if (!check.success) {
            actionState.value = false
            errorApi.value = {
                show: true,
                message: check.data.message,
            }
            return
        }
        cajaStore.manageCaja(check)
        actionState.value = false
    }

    const selectCaja = async caja => {
        cajaSelected.value = {
            ...caja,
        }
        await loadOrdenesOfCaja(caja._id)
    }

    const dateFormated = computed(() => {
        return fecha => dateConvert(fecha)
    })

    function dateConvert(fecha) {
        const isoDate = new Date(fecha)
        const localDate = isoDate.toLocaleString()
        return localDate
    }

    return {
        cajasArr,
        cajaOrdenesArr,
        cajaSelected,
        cajaActual,
        actionState,
        errorApi,

        dateFormated,

        loadOrdenesOfCaja,
        loadCaja,
        abrirCaja,
        cerrarCaja,
        listAllCajas,
        selectCaja,
    }
}
