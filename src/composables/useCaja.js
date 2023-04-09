import { storeToRefs } from 'pinia'
import { useCajaStore } from '../stores/cajaStore'
import { getCaja, postCaja, putCaja } from '../helpers/helpCaja'
import { computed } from 'vue'

export const useCaja = () => {
    const cajaStore = useCajaStore()
    const { cajaArr, cajaActual, actionState, errorApi } =
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

    return {
        cajaActual,
        actionState,
        errorApi,

        loadCaja,
        abrirCaja,
        cerrarCaja,
    }
}
