import { defineStore } from 'pinia'

export const useProductosStore = defineStore('productos', {
    state: () => {
        return {
            categoriasArr: [],
            productosArr: [],
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
    },
})
