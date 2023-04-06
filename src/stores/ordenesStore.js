import { defineStore } from 'pinia'

export const useOrdenesStore = defineStore('ordenes', {
    state: () => {
        return {
            ordenesArr: [],
            ordenIdSelected: '',
            actionState: false,
            errorApi: {},
        }
    },
    actions: {
        addOrdenes(data) {
            this.ordenesArr = data.data
        },
        deleteOrden(id) {
            this.ordenesArr = this.ordenesArr.filter(el => el._id !== id)
        },
    },
})
