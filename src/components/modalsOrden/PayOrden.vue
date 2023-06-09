<template>
    <!-- Realizar orden / Imprimir nota -->
    <div
        class="modal fade"
        id="payOrdenModal"
        tabindex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="createSucursalLabel"
        aria-hidden="true"
    >
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
            role="document"
        >
            <div class="modal-content">
                <div class="modal-body">
                    <div class="text-center">
                        <h2
                            class="modal-title fw-bold mb-4"
                            id="exampleModalLabel"
                        >
                            Pago de Orden
                        </h2>
                        <div
                            id="ordenDataClient"
                            class="row d-flex flex-column px-4 g-3"
                        >
                            <div
                                class="text-start d-flex flex-column fst-italic"
                            >
                                <div class="mb-3" id="ordenDataTitleClient">
                                    <div
                                        class="fs-5"
                                        v-if="ordenSelected.cliente.name"
                                    >
                                        <span>Cliente: </span>
                                        <span class="fw-bold">{{
                                            ordenSelected.cliente.name
                                        }}</span>
                                    </div>
                                    <div class="fs-5">
                                        <span>Mesa: </span>
                                        <span class="fw-bold">{{
                                            ordenSelected.mesa
                                        }}</span>
                                    </div>
                                    <div v-if="ordenSelected.cliente.nota">
                                        <span>Habitación: </span>
                                        <span class="fw-bold">
                                            {{ ordenSelected.cliente.nota }}
                                        </span>
                                    </div>
                                </div>
                                <div id="ordenDataPedidosItems">
                                    <template
                                        v-for="(
                                            item, index
                                        ) in ordenSelected.pedido"
                                    >
                                        <!-- item pendiente -->
                                        <div class="d-flex mb-3">
                                            <span class="me-3">{{
                                                item.cantidad
                                            }}</span>
                                            <span>{{ item.name }}</span>
                                            <span
                                                class="ms-auto fw-bold text-dark"
                                                >{{ item.importe }}</span
                                            >
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Formulario datos de pago -->
                    <div id="payOrdenSection" class="text-center">
                        <div
                            id="contenidoPosCuenta"
                            class="contenido px-3 py-2 row g-1 enlace_action"
                        >
                            <div id="inputsClientesData" class="row g-2">
                                <div class="form-floating col-12">
                                    <input
                                        v-model="ordenSelected.cliente.name"
                                        type="text"
                                        class="form-control"
                                        id="clienteInputName"
                                    />
                                    <label for="clienteInputName"
                                        >Nombre Completo</label
                                    >
                                </div>
                                <div class="form-floating col-6">
                                    <input
                                        v-model="ordenSelected.cliente.nit"
                                        type="text"
                                        class="form-control"
                                        id="clienteInputNit"
                                    />
                                    <label for="clienteInputNit"
                                        >Numero de NIT</label
                                    >
                                </div>
                                <div class="form-floating col-6">
                                    <select
                                        class="form-select"
                                        id="ordenPago"
                                        v-model="ordenSelected.payMetodo"
                                    >
                                        <option value="" selected></option>
                                        <option
                                            v-for="metodo in userSucursal.metodosPago"
                                            :value="metodo"
                                        >
                                            {{ metodo }}
                                        </option>
                                    </select>
                                    <label for="ordenPago"
                                        >Metodo de pago</label
                                    >
                                </div>
                                <div class="form-floating col-6">
                                    <input
                                        v-model="ordenSelected.desc"
                                        type="text"
                                        class="form-control"
                                        id="clienteInputDesc"
                                    />
                                    <label for="clienteInputDesc"
                                        >Descuento</label
                                    >
                                </div>
                                <div class="form-floating col-6">
                                    <input
                                        v-model="ordenSelected.propina"
                                        type="text"
                                        class="form-control"
                                        id="clienteInputPropina"
                                    />
                                    <label for="clienteInputPropina"
                                        >Propina</label
                                    >
                                </div>
                                <div
                                    class="d-flex align-items-center fs-5"
                                    v-if="
                                        ordenSelected.payMetodo === 'Efectivo'
                                    "
                                >
                                    <span>Efectivo</span>
                                    <div
                                        class="input-group ms-auto"
                                        style="width: 120px"
                                    >
                                        <span
                                            class="input-group-text rounded-start border border-1 p-1 fs-5"
                                            id="basic-addon1"
                                            >Bs.
                                        </span>
                                        <input
                                            v-model="ordenSelected.moneyClient"
                                            type="number"
                                            class="form-control form-control-sm fs-5"
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                        />
                                    </div>
                                </div>
                                <div
                                    class="d-flex fs-5 text-danger"
                                    v-if="
                                        ordenSelected.moneyClient &&
                                        ordenSelected.propina &&
                                        ordenSelected.payMetodo === 'Efectivo'
                                    "
                                >
                                    <span>Propina</span>
                                    <span class="ms-auto">{{
                                        ordenSelected.propina
                                    }}</span>
                                </div>
                                <div
                                    class="d-flex fs-5 text-success"
                                    v-if="
                                        ordenSelected.moneyClient &&
                                        ordenSelected.payMetodo === 'Efectivo'
                                    "
                                >
                                    <span>Cambio efectivo</span>
                                    <span class="ms-auto">{{
                                        ordenSelected.moneyClient -
                                        montoPagar -
                                        ordenSelected.propina
                                    }}</span>
                                </div>
                                <hr />
                                <div class="d-flex fw-bold fs-5 col-12">
                                    <span>Subtotal</span>
                                    <span class="ms-auto">
                                        {{ ordenSelected.subtotal }}
                                    </span>
                                </div>
                                <div
                                    class="d-flex fw-bold fs-5 col-12 text-danger"
                                    v-if="ordenSelected.desc"
                                >
                                    <span>Descuento</span>
                                    <span class="ms-auto">
                                        - {{ ordenSelected.desc }}
                                    </span>
                                </div>
                                <div class="d-flex fw-bold fs-4 col-12">
                                    <span>Monto a Pagar </span>
                                    <span
                                        class="ms-auto"
                                        v-if="
                                            ordenSelected.desc &&
                                            ordenSelected.subtotal
                                        "
                                    >
                                        {{ montoPagar }}
                                    </span>
                                    <span class="ms-auto" v-else>
                                        {{ ordenSelected.total }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer p-0">
                    <button
                        type="button"
                        class="btn-modal btn-modal-left btn-modal-secondary col fw-bold"
                        data-bs-dismiss="modal"
                    >
                        Cerrar
                    </button>
                    <button
                        type="button"
                        class="btn-modal btn-modal-right btn-modal-primary col fw-bold"
                        @click="pagarOrden"
                        data-bs-target="#payOrdenModalMessage"
                        data-bs-toggle="modal"
                    >
                        Pagar
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- Message Create Orden -->
    <div
        class="modal fade"
        id="payOrdenModalMessage"
        tabindex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body text-center">
                    <h2 class="modal-title fw-bold mb-4" id="modalTitleId">
                        Pagar Orden
                    </h2>
                    <p v-if="errorApi.show" class="fs-6 fw-bold text-danger">
                        {{ errorApi.message }}
                    </p>

                    <p
                        v-else-if="actionState"
                        class="fs-4 fw-bold text-success"
                    >
                        <span
                            class="spinner-border spinner-border-md"
                            role="status"
                            aria-hidden="true"
                        ></span
                        ><br />
                        Pago en proceso...
                    </p>
                    <p v-else class="fs-4 fw-bold text-success">
                        Se realizo la orden ¡Correctamente!
                    </p>
                </div>
                <div class="modal-footer p-0">
                    <button
                        v-if="errorApi.show"
                        type="button"
                        class="btn-modal btn-modal-block btn-modal-danger col fw-bold"
                        data-bs-target="#payOrdenModal"
                        data-bs-toggle="modal"
                    >
                        Regresar
                    </button>
                    <button
                        v-else-if="actionState"
                        type="button"
                        class="btn-modal btn-modal-block btn-modal-disabled col disabled"
                        data-bs-dismiss="modal"
                    >
                        Cerrar
                    </button>
                    <button
                        v-else
                        type="button"
                        class="btn-modal btn-modal-block btn-modal-secondary col fw-bold"
                        data-bs-dismiss="modal"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuth } from '../../composables/useAuth'
import { useOrdenes } from '../../composables/useOrdenes'

const { ordenSelected, actionState, errorApi, pagarOrden } = useOrdenes()
const { userSucursal } = useAuth()

const montoPagar = computed(() => calcularPago())

function calcularPago() {
    const monto =
        parseFloat(ordenSelected.value.subtotal) -
        parseFloat(ordenSelected.value.desc)

    ordenSelected.value.total =
        parseFloat(ordenSelected.value.subtotal) -
        parseFloat(ordenSelected.value.desc)

    return monto
}
</script>

<style scoped>
.btn-cotenido-modal {
    padding: 1rem;
    font-size: 1rem;
    border: 0;
    user-select: none;
    border-radius: 0.375rem;
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
