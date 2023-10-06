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
			this.ordenesArr = this.ordenesArr.filter((el) => el._id !== id)
		},
		updateOrden(data) {
			if (!data.success) {
				this.errorApi.show = true
				this.errorApi.message = data.data.message
				return
			}
			this.errorApi.show = false
			this.errorApi.message = 'El proceso se realizo ¡Correctamente!'
			const indiceEl = this.ordenesArr.findIndex(
				(el) => el._id === data.data._id
			)
			this.ordenesArr[indiceEl] = data.data
		},
	},
})
