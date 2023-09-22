import { storeToRefs } from 'pinia'
import { useCajaStore } from '../stores/cajaStore'
import { getCaja, postCaja, putCaja } from '../helpers/helpCaja'
import { getOrdenesTerminadas } from '../helpers/helpOrdenes'
import { computed } from 'vue'

export const useCaja = () => {
    const cajaStore = useCajaStore()

    const { cajaActual, cajaSelected, cajaOrdenesArr, actionState, errorApi } =
        storeToRefs(cajaStore)

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
            reporte: arrayTotales.value,
            total: totalCaja.value,
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

    const arrayTotales = computed(() => resultadosTotales())
    const totalCaja = computed(() => funTotalCaja())

    function dateConvert(fecha) {
        const isoDate = new Date(fecha)
        const localDate = isoDate.toLocaleString()
        return localDate
    }

    function resultadosTotales() {
        const result = []
        cajaOrdenesArr.value.forEach(item => {
            const payMetodo = item.payMetodo.toLowerCase()
            const index = result.findIndex(x => x.payMetodo === payMetodo)
            if (index === -1) {
                result.push({
                    payMetodo,
                    total: item.total,
                })
            } else {
                result[index].total += item.total
            }
        })
        const propinaTotal = cajaOrdenesArr.value.reduce(
            (total, item) => total + item.propina,
            0
        )
        result.push({ payMetodo: 'propina', total: propinaTotal })
        const descuentoTotal = cajaOrdenesArr.value.reduce(
            (total, item) => total + item.desc,
            0
        )
        result.push({ payMetodo: 'desc', total: descuentoTotal })
        return result
    }

    function funTotalCaja() {
        const total = cajaOrdenesArr.value.reduce(
            (acc, el) => acc + el.total,
            0
        )
        return total
    }

    return {
        cajaOrdenesArr,
        cajaSelected,
        cajaActual,
        actionState,
        errorApi,

        dateFormated,
        arrayTotales,
        totalCaja,

        loadCaja,
        loadOrdenesOfCaja,
        abrirCaja,
        cerrarCaja,
        selectCaja,
    }
}
