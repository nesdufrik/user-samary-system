<template>
    <div
        class="carrito__cobro bd-callout bd-callout-left bd-callout-secondary rounded-3 p-0"
    >
        <div
            id="contenidoPosCuenta"
            class="contenido px-3 py-2 row g-1 enlace_action"
        >
            <div
                id="titleSubTotalPosCuenta"
                class="d-flex justify-content-between fs-5"
            >
                <span>Sub total </span>
                <span>
                    {{ subTotalPrecio }}
                </span>
            </div>
            <div id="accordionDescuentoPago" class="accordion">
                <h5 class="d-flex fs-5 mb-0">
                    <span>Descuento</span>
                    <span
                        role="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#inputDescuento"
                        aria-expanded="false"
                        aria-controls="flush-collapseOne"
                    >
                        <span class="material-icons-round">
                            confirmation_number
                        </span>
                    </span>
                    <span class="ms-auto">
                        {{ cuponDesc }}
                    </span>
                </h5>
                <div
                    id="inputDescuento"
                    class="p-0 collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionDescuentoPago"
                >
                    <input
                        v-model="cuponDesc"
                        class="form-control form-control-sm rounded-3"
                        type="number"
                        placeholder="Cupon"
                    />
                </div>
            </div>
            <div
                id="titleTotalPosCuenta"
                class="d-flex justify-content-between fw-bold fs-4"
            >
                <span>Monto a pagar</span>
                <span>{{
                    (carritoOrden.total = subTotalPrecio - cuponDesc)
                }}</span>
            </div>
            <div id="inputsClientesData" class="row g-1">
                <div class="input-group input-group-sm" v-if="actionState">
                    <div class="form-floating">
                        <input
                            type="text"
                            class="form-control"
                            id="clienteInputNit"
                            disabled
                        />
                        <label for="clienteInputNit">Buscando...</label>
                    </div>
                    <button role="button" class="input-group-text">
                        <div class="spinner-grow text-success" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </button>
                </div>
                <div class="input-group input-group-sm" v-else>
                    <div class="form-floating">
                        <input
                            v-model="carritoOrden.cliente.nit"
                            type="text"
                            class="form-control"
                            id="clienteInputNit"
                        />
                        <label for="clienteInputNit">Numero de NIT</label>
                    </div>
                    <button
                        role="button"
                        class="btn btn-success material-icons-round input-group-text fs-2 text-light"
                    >
                        search
                    </button>
                </div>
                <div class="form-floating">
                    <input
                        v-model="carritoOrden.cliente.nit"
                        type="text"
                        class="form-control"
                        id="clienteInputName"
                    />
                    <label for="clienteInputName">Nombre Completo</label>
                </div>
            </div>
        </div>
        <div id="footerPosCuentaButtons" class="p-0">
            <button
                type="button"
                class="btn-modal btn-modal-danger btn-modal-left col-6 fw-bold"
                @click="limpiar"
            >
                Cancelar
            </button>
            <button
                v-if="carritoOrden.pedido.length === 0"
                type="button"
                class="btn-modal btn-modal-disabled btn-modal-right col-6 disabled fw-bold"
            >
                Realizar Pedido
            </button>
            <button
                v-else
                type="button"
                class="btn-modal btn-modal-primary btn-modal-right col-6 fw-bold"
                data-bs-toggle="modal"
                data-bs-target="#createPosOrden"
            >
                Realizar Pedido
            </button>
        </div>
    </div>
</template>

<script setup>
import { useCarrito } from '../../composables/useCarrito'

const { subTotalPrecio, cuponDesc, carritoOrden, limpiar, actionState } =
    useCarrito()
</script>

<style scoped>
.carrito__cobro {
    margin-bottom: 0rem;
}

.btn-modal {
    margin: 0;
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-top: 0;
    border-bottom: 0;
    border-right: 0;
    user-select: none;
}
</style>
