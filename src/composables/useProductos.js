import { storeToRefs } from 'pinia'
import { getCategorias, getProductos } from '../helpers/helpProductos'
import { useProductosStore } from '../stores/productosStore'

export const useProductos = () => {
    const productosStore = useProductosStore()

    const {
        categoriasArr,
        productosArr,
        actionState,
        etiquetasArr,
        productosFiltered,
    } = storeToRefs(productosStore)

    const loadPOS = async () => {
        if (
            productosArr.value.length === 0 ||
            categoriasArr.value.length === 0
        ) {
            productosStore.loadCategorias(await getCategorias())
            productosStore.loadProductos(await getProductos())
            return
        }
    }

    const filtrar = filtro => {
        productosStore.filterProductos(filtro)
    }

    return {
        //! propiedades
        categoriasArr,
        productosArr,
        productosFiltered,
        actionState,

        //! computadas
        etiquetasArr,

        //! metodos
        loadPOS,
        filtrar,
    }
}
