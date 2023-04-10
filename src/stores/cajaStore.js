import { defineStore } from 'pinia'

export const useCajaStore = defineStore('cajas', {
    state: () => {
        return {
            cajasArr: [],
            cajaSelected: {},
            cajaOrdenesArr: [],
            cajaActual: {},
            actionState: false,
            errorApi: {},
        }
    },
    actions: {
        addCajas(data) {
            this.cajasArr = data.data
        },
        manageCaja(data) {
            this.cajaActual = data.data
            this.cajaSelected = data.data
        },
        addOrdenesCaja(data) {
            this.cajaOrdenesArr = data.data
        },
    },
})
