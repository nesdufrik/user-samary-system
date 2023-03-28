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
                        data-bs-dismiss="modal"
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
                                <div class="fs-5">
                                    <span>Cliente: </span>
                                    <span class="fw-bold">nombre completo</span>
                                </div>
                                <div class="fs-5">
                                    <span>Mesa: </span>
                                    <span class="fw-bold">4</span>
                                </div>
                                <div>
                                    <span>Habitación: </span>
                                    <span class="fw-bold"> 23 </span>
                                </div>
                            </div>
                            <div id="ordenDataPedidosItems">
                                <div class="d-flex" v-for="item in 20">
                                    <span class="me-3">1</span>
                                    <span
                                        >Tallarines con salsa bolognesa y muchas
                                        cosas delis mas</span
                                    >
                                    <span class="ms-auto fw-bold">Precio</span>
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
                        data-bs-dismiss="modal"
                        @click="imprimir"
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- Message Create Empleado -->
    <!-- <div
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
                        Actualizando...
                    </p>
                    <p v-else class="fs-4 fw-bold text-success">
                        Se actualizo ¡Correctamente!
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
                        @click="cleanForm"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div> -->
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Home',
    components: {},
    methods: {
        imprimir() {
            this.$htmlToPaper('ordenDataToPrint', {
                name: '_blank',
                specs: ['fullscreen=no', 'titlebar=no', 'scrollbars=no'],
                styles: [
                    'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
                ],
            })
        },
    },
    mounted() {},
})
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
