import { defineStore } from 'pinia'

export const useOrdenesStore = defineStore('ordenes', {
    state: () => {
        return {
            ordenesArr: [],
            actionState: false,
            errorApi: {},
        }
    },
    actions: {
        addOrdenes(data) {
            this.ordenesArr = data.data
        },
    },
})
