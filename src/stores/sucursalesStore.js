import { defineStore } from 'pinia'

export const useSucursalesStore = defineStore('sucursales', {
    state: () => {
        return {
            sucursalData: {},
            errorApi: {},
        }
    },
    actions: {
        loadSucursalData(data) {
            this.sucursalData = data.data
        },
    },
})
