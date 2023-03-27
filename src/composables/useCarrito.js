import { storeToRefs } from 'pinia'
import { useCarritoStore } from '../stores/carritoStore'

export const useCarrito = () => {
    const carritoStore = useCarritoStore()
    const {
        carritoOrden,
        cuponDesc,
        pagoCliente,
        metodoPago,
        actionState,
        subTotalPrecio,
    } = storeToRefs(carritoStore)

    const agregarCarrito = item => {
        carritoStore.addToCarrito(item)
    }

    const agregarCarritoNota = item => {
        carritoStore.addToCarritoNota(item)
    }

    const aumentar = index => {
        carritoStore.aumentarCantidad(index)
    }

    const disminuir = index => {
        carritoStore.disminuirCantidad(index)
    }

    const quitar = index => {
        carritoStore.quitarPedido(index)
    }

    const limpiar = index => {
        carritoStore.limpiarCarrito()
    }

    return {
        //! propiedades
        carritoOrden,
        cuponDesc,
        pagoCliente,
        metodoPago,
        actionState,

        //! computadas
        subTotalPrecio,

        //! metodos
        agregarCarrito,
        agregarCarritoNota,
        aumentar,
        disminuir,
        quitar,
        limpiar,
    }
}
