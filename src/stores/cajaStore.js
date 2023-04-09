import { defineStore } from 'pinia'

export const useCajaStore = defineStore('cajas', {
    state: () => {
        return {
            cajasArr: [],
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
        },
    },
})
