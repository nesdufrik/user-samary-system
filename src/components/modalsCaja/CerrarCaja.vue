<template>
    <div
        class="modal fade"
        id="cerrarCajaModal"
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
                        ¿Seguro de cerrar?
                    </h2>
                    <p>
                        Una vez que cierra
                        <span class="text-danger fs-5 fw-bold"> la caja</span>
                        no se podra abrir nuevamente. Asegúrate de que todas las
                        ordenes hayan sido finalizadas antes de continuar.
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
                        class="btn-modal btn-modal-right btn-modal-danger col-6 fw-bold"
                        @click="cerrarCaja"
                        data-bs-target="#cerrarCajaModalMessage"
                        data-bs-toggle="modal"
                    >
                        Cerrar Caja
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- Message Create Empleado -->
    <div
        class="modal fade"
        id="cerrarCajaModalMessage"
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
                        ¿Seguro de cerrar?
                    </h2>
                    <p v-if="actionState" class="fs-4 fw-bold text-secondary">
                        <span
                            class="spinner-border spinner-border-md"
                            role="status"
                            aria-hidden="true"
                        ></span
                        ><br />
                        Cerrando...
                    </p>
                    <p
                        v-else-if="errorApi.show"
                        class="fs-6 fw-bold text-danger"
                    >
                        {{ errorApi.message }}
                    </p>

                    <p v-else>
                        <span class="text-danger fs-5 fw-bold"> La caja</span>,
                        fue cerrada correctamente.
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
                        @click="closeRedirect"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCaja } from '../../composables/useCaja'

const { actionState, errorApi, cerrarCaja } = useCaja()
const router = useRouter()

const closeRedirect = () => {
    router.push({ path: '/' })
}
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
