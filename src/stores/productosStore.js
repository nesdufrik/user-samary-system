import { defineStore } from 'pinia'

export const useProductosStore = defineStore('productos', {
	state: () => {
		return {
			categoriasArr: [],
			productosArr: [],
			productosFiltered: [],
			actionState: false,
			query: '',
		}
	},
	actions: {
		loadCategorias(items) {
			this.categoriasArr = items
		},
		loadProductos(items) {
			this.productosArr = items
		},
		filterProductos(filter) {
			this.productosFiltered = this.productosArr.filter(
				(el) => el.etiqueta === filter
			)
		},
		foundedProductos(query) {
			if (query === '') {
				this.productosFiltered = []
				return
			}
			this.productosFiltered = this.productosArr.filter((el) =>
				el.name.toLowerCase().includes(query.toLowerCase())
			)
		},
	},
	getters: {
		etiquetasArr: (state) => {
			return state.categoriasArr
				.flatMap((categoria) => categoria.etiquetas)
				.sort()
		},
	},
})
