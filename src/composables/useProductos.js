import { storeToRefs } from 'pinia'
import { getCategorias, getProductos } from '../helpers/helpProductos'
import { useProductosStore } from '../stores/productosStore'

export const useProductos = () => {
    const productosStore = useProductosStore()

    const { categoriasArr, productosArr, actionState } =
        storeToRefs(productosStore)

    const loadPOS = async () => {
        if (
            productosArr.value.length === 0 ||
            categoriasArr.value.length === 0
        ) {
            productosStore.loadCategorias(await getCategorias())
            productosStore.loadProductos(await getProductos())
            return
        }
        console.log('Los items estan cargados')
    }

    return {
        //! propiedades
        categoriasArr,
        productosArr,
        actionState,

        //! metodos
        loadPOS,
    }
}
