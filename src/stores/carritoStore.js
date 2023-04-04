import { defineStore } from 'pinia'

export const useCarritoStore = defineStore('carrito', {
    state: () => {
        return {
            carritoOrden: {
                cliente: {},
                tipo: '',
                pedido: [],
                total: 0,
            },
            cuponDesc: 0,
            pagoCliente: 0,
            metodoPago: '',
            actionState: false,
            errorApi: {},
        }
    },
    actions: {
        addToCarrito(item) {
            const { name } = item
            const pedidos = this.carritoOrden.pedido

            const nuevosPedidos = pedidos.map(el => {
                if (el.name === name && !el.nota) {
                    return {
                        ...el,
                        cantidad: el.cantidad + 1,
                        pendiente: el.pendiente + 1,
                    }
                }
                return el
            })

            const yaExiste = nuevosPedidos.some(
                el => el.name === name && !el.nota
            )

            if (!yaExiste) {
                nuevosPedidos.push({
                    name: item.name,
                    cantidad: 1,
                    pendiente: 1,
                    precio: item.precio,
                })
            }

            this.carritoOrden.pedido = nuevosPedidos
        },
        addToCarritoNota(item) {
            this.carritoOrden.pedido.push({
                name: item.name,
                cantidad: 1,
                pendiente: 1,
                precio: item.precio,
                nota: '...',
            })
        },
        aumentarCantidad(index) {
            this.carritoOrden.pedido[index].cantidad++
            this.carritoOrden.pedido[index].pendiente++
        },
        disminuirCantidad(index) {
            this.carritoOrden.pedido[index].cantidad--
            this.carritoOrden.pedido[index].pendiente--
        },
        quitarPedido(index) {
            this.carritoOrden.pedido.splice(index, 1)
        },
        limpiarCarrito() {
            this.carritoOrden = {
                cliente: {},
                tipo: '',
                pedido: [],
                total: 0,
            }
            this.cuponDesc = 0
            this.pagoCliente = 0
        },
    },
    getters: {
        subTotalPrecio: state => {
            return parseFloat(
                state.carritoOrden.pedido
                    .reduce((a, b) => a + b.importe, 0)
                    .toFixed(1)
            )
        },
    },
})
