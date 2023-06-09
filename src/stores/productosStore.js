import { defineStore } from 'pinia'

export const useProductosStore = defineStore('productos', {
    state: () => {
        return {
            categoriasArr: [],
            productosArr: [],
            productosFiltered: [],
            actionState: false,
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
                el => el.etiqueta == filter
            )
        },
    },
    getters: {
        etiquetasArr: state => {
            return state.categoriasArr
                .flatMap(categoria => categoria.etiquetas)
                .sort()
        },
    },
})
