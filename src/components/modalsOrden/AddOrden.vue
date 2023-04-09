<template>
    <!-- Elegir tipo de Cliente -->
    <div
        class="modal fade"
        id="createPosOrden"
        tabindex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="createSucursalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body text-center mb-2">
                    <h2 class="modal-title fw-bold mb-4" id="exampleModalLabel">
                        Tipo Cliente
                    </h2>
                    <div
                        id="buttonsChooseClient"
                        class="row d-flex flex-column px-4 g-2"
                    >
                        <button
                            class="btn-cotenido-modal btn-modal-primary fw-bold"
                            data-bs-target="#createPosOrdenHuesped"
                            data-bs-toggle="modal"
                        >
                            Huesped
                        </button>
                        <button
                            class="btn-cotenido-modal btn-modal-primary fw-bold"
                            data-bs-target="#createPosOrdenExterno"
                            data-bs-toggle="modal"
                        >
                            Externo
                        </button>
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

    <!-- Datos de Husped -->
    <div
        class="modal fade"
        id="createPosOrdenHuesped"
        tabindex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="createSucursalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body text-center">
                    <h2 class="modal-title fw-bold mb-4" id="exampleModalLabel">
                        Huesped
                    </h2>
                    <div
                        id="formHuespedData"
                        class="row d-flex flex-column px-4 g-2"
                    >
                        <div class="form-floating">
                            <input
                                v-model="carritoOrden.cliente.name"
                                type="text"
                                class="form-control"
                                id="floatingNombreHuesped"
                            />
                            <label for="floatingNombreHuesped"
                                >Nombre de huesped</label
                            >
                        </div>
                        <div class="form-floating">
                            <input
                                v-model="carritoOrden.cliente.nota"
                                type="number"
                                class="form-control"
                                id="floatingHabitacionHuesped"
                            />
                            <label for="floatingHabitacionHuesped"
                                >Habitación</label
                            >
                        </div>
                        <div class="form-floating">
                            <input
                                v-model="carritoOrden.mesa"
                                type="number"
                                class="form-control"
                                id="floatingMesaCliente"
                            />
                            <label for="floatingMesaCliente">Mesa</label>
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
                        data-bs-target="#createPosOrdenEnd"
                        data-bs-toggle="modal"
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Datos de Externo -->
    <div
        class="modal fade"
        id="createPosOrdenExterno"
        tabindex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="createSucursalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body text-center">
                    <h2 class="modal-title fw-bold mb-4" id="exampleModalLabel">
                        Cliente
                    </h2>
                    <div
                        id="formHuespedData"
                        class="row d-flex flex-column px-4 g-2"
                    >
                        <div class="form-floating">
                            <input
                                v-model="carritoOrden.cliente.name"
                                type="text"
                                class="form-control"
                                id="floatingNombreHuesped"
                            />
                            <label for="floatingNombreHuesped"
                                >Nombre de cliente</label
                            >
                        </div>
                        <div class="form-floating">
                            <input
                                v-model="carritoOrden.mesa"
                                type="number"
                                class="form-control"
                                id="floatingMesaCliente"
                            />
                            <label for="floatingMesaCliente">Mesa</label>
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
                        data-bs-target="#createPosOrdenEnd"
                        data-bs-toggle="modal"
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Realizar orden / Imprimir nota -->
    <div
        class="modal fade"
        id="createPosOrdenEnd"
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
                                    v-if="carritoOrden.cliente.name"
                                >
                                    <span>Cliente: </span>
                                    <span class="fw-bold">{{
                                        carritoOrden.cliente.name
                                    }}</span>
                                </div>
                                <div class="fs-5">
                                    <span>Mesa: </span>
                                    <span class="fw-bold">{{
                                        carritoOrden.mesa
                                    }}</span>
                                </div>
                                <div v-if="carritoOrden.cliente.nota">
                                    <span>Habitación: </span>
                                    <span class="fw-bold">
                                        {{ carritoOrden.cliente.nota }}
                                    </span>
                                </div>
                            </div>
                            <div id="ordenDataPedidosItems">
                                <template v-for="item in carritoOrden.pedido">
                                    <div
                                        class="d-flex"
                                        v-if="item.pendiente !== 0"
                                    >
                                        <span class="me-3">{{
                                            item.pendiente
                                        }}</span>
                                        <span>{{ item.name }}</span>
                                    </div>
                                </template>
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
                        data-bs-target="#createPosOrdenMessage"
                        data-bs-toggle="modal"
                        @click="imprimir"
                    >
                        <span v-if="carritoOrden.estado">Actualizar orden</span>
                        <span v-else>Realizar orden</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- Message Create Orden -->
    <div
        class="modal fade"
        id="createPosOrdenMessage"
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
                        Orden
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
                        data-bs-target="#createPosOrden"
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
import { getCurrentInstance } from 'vue'
import { useCarrito } from '../../composables/useCarrito'
import { useOrdenes } from '../../composables/useOrdenes'
const instance = getCurrentInstance()
const { carritoOrden } = useCarrito()
const { ordenar, actualizar, actionState, errorApi } = useOrdenes()

const imprimir = () => {
    if (!carritoOrden.value.estado) ordenar()
    if (carritoOrden.value.estado) actualizar()

    instance.appContext.config.globalProperties.$htmlToPaper(
        'ordenDataToPrint',
        {
            name: '_blank',
            specs: ['fullscreen=no', 'titlebar=no', 'scrollbars=no'],
            styles: [
                'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
            ],
        }
    )
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
