<template>
    <!-- Realizar orden / Imprimir nota -->
    <div
        class="modal fade"
        id="checkOrdenModal"
        tabindex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="createSucursalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body text-center" id="ordenDataToPrint">
                    <h2 class="modal-title fw-bold mb-4" id="exampleModalLabel">
                        Orden
                    </h2>
                    <div
                        id="ordenDataClient"
                        class="row d-flex flex-column px-4 g-3"
                    >
                        <div class="text-start d-flex flex-column fst-italic">
                            <div class="mb-3">
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
                                    <!-- loadin... -->
                                    <div class="d-flex" v-if="actionState">
                                        <span class="me-3">{{
                                            item.cantidad
                                        }}</span>
                                        <span>{{ item.name }}</span>
                                        <span
                                            role="status"
                                            class="ms-auto fw-bold text-success spinner-border spinner-border-sm"
                                        ></span>
                                    </div>
                                    <!-- item atendido -->
                                    <div
                                        class="d-flex mb-3"
                                        v-else-if="item.pendiente === 0"
                                    >
                                        <span
                                            class="me-3 text-decoration-line-through"
                                            >{{ item.cantidad }}</span
                                        >
                                        <span
                                            class="text-decoration-line-through"
                                            >{{ item.name }}</span
                                        >
                                        <span
                                            class="ms-auto fw-bold material-icons-round text-success"
                                            >check_circle</span
                                        >
                                    </div>
                                    <!-- item pendiente -->
                                    <div class="d-flex mb-3" v-else>
                                        <span class="me-3">{{
                                            item.pendiente
                                        }}</span>
                                        <span>{{ item.name }}</span>
                                        <span
                                            role="button"
                                            class="ms-auto fw-bold material-icons-round text-success"
                                            @click="checkOrdenUpdate(index)"
                                            >check_circle_outline</span
                                        >
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer p-0">
                    <button
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
    <!-- Message Create Orden -->
    <!-- <div
        class="modal fade"
        id="checkOrdenModalMessage"
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
                        Editar Empleado
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
                        Generando Orden...
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
                        data-bs-target="#checkOrdenModal"
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
    </div> -->
</template>

<script setup>
import { useOrdenes } from '../../composables/useOrdenes'

const { ordenSelected, actionState, errorApi, checkOrdenUpdate } = useOrdenes()
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
