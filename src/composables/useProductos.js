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
		query,
	} = storeToRefs(productosStore)

	const loadPOS = async () => {
		if (productosArr.value.length === 0 || categoriasArr.value.length === 0) {
			productosStore.loadCategorias(await getCategorias())
			productosStore.loadProductos(await getProductos())
		}
	}

	const filtrar = (filtro) => {
		productosStore.filterProductos(filtro)
	}

	const buscar = (query) => {
		productosStore.foundedProductos(query)
	}

	return {
		//! propiedades
		categoriasArr,
		productosArr,
		productosFiltered,
		actionState,
		query,

		//! computadas
		etiquetasArr,

		//! metodos
		loadPOS,
		filtrar,
		buscar,
	}
}
