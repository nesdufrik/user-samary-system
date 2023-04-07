import { defineStore } from 'pinia'

export const useOrdenesStore = defineStore('ordenes', {
    state: () => {
        return {
            ordenesArr: [],
            ordenIdSelected: '',
            ordenSelected: { cliente: {} },
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
        updateOrden(data) {
            const indiceEl = this.ordenesArr.findIndex(
                el => el._id == data.data._id
            )
            this.ordenesArr[indiceEl] = data.data
        },
    },
})
