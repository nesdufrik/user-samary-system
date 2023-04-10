<template>
    <!-- Formulario de Create Empleado -->
    <div
        class="modal fade"
        id="abrirCajaModal"
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
                        ¿Seguro de Abrir?
                    </h2>
                    <p>
                        Al abrir una
                        <span class="text-primary fs-5 fw-bold"> Caja</span>, ya
                        esta listo el sistema para comenzar con los registros de
                        ordenes.
                    </p>
                </div>
                <div class="modal-footer p-0 mt-3">
                    <button
                        type="button"
                        class="btn-modal btn-modal-left btn-modal-secondary col-6 fw-bold"
                        data-bs-dismiss="modal"
                    >
                        Cerrar
                    </button>
                    <button
                        type="submit"
                        class="btn-modal btn-modal-right btn-modal-primary col-6 fw-bold"
                        @click="abrirCaja"
                        data-bs-target="#abrirCajaModalMessage"
                        data-bs-toggle="modal"
                    >
                        Abrir Caja
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- Message Create Empleado -->
    <div
        class="modal fade"
        id="abrirCajaModalMessage"
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
                        ¿Seguro de abrir?
                    </h2>
                    <p v-if="actionState" class="fs-4 fw-bold text-secondary">
                        <span
                            class="spinner-border spinner-border-md"
                            role="status"
                            aria-hidden="true"
                        ></span
                        ><br />
                        Abriendo...
                    </p>
                    <p
                        v-else-if="errorApi.show"
                        class="fs-6 fw-bold text-danger"
                    >
                        {{ errorApi.message }}
                    </p>

                    <p v-else>
                        <span class="text-primary fs-5 fw-bold"> La Caja</span>,
                        fue abierta correctamente.
                    </p>
                </div>
                <div class="modal-footer p-0">
                    <button
                        v-if="actionState"
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
import { useCaja } from '../../composables/useCaja'

const { actionState, errorApi, abrirCaja } = useCaja()
</script>

<style scoped>
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
