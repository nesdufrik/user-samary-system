import { defineStore } from 'pinia'

export const useEmpleadosStore = defineStore('empleados', {
    state: () => {
        return {
            empleadoData: [],
            actionState: false,
            errorApi: {},
        }
    },
    actions: {
        loadEmpleado(data) {
            this.empleadoData = data.data
        },
        updtEmpleado(data) {
            this.empleadoData = data.data
        },
    },
})
