<template>
    <!-- #Section Pendientes -->
    <div
        v-if="cajaSelected.active"
        class="tarjeta rounded-2 bd-callout bd-callout-left bd-callout-secondary p-2"
    >
        <div>
            <h2 class="fw-bold m-0 d-flex align-items-center">
                Caja:
                <span class="ms-2 text-success">Activa</span>
            </h2>
        </div>
        <button
            class="tarjeta__button link-danger align-middle material-icons-round tarjeta__button--edit2"
            data-bs-target="#cerrarCajaModal"
            data-bs-toggle="modal"
        >
            archive
        </button>
        <button
            class="tarjeta__button link-secondary align-middle material-icons-round tarjeta__button--edit"
            @click="imprimir"
        >
            print
        </button>
        <button
            class="tarjeta__button link-secondary align-middle material-icons-round"
            data-bs-toggle="collapse"
            data-bs-target="#reporteDiaParaImprimir"
            aria-expanded="true"
            aria-controls="reporteDiaParaImprimir"
        >
            visibility
        </button>
    </div>
    <div
        v-else
        class="tarjeta rounded-2 bd-callout bd-callout-left bd-callout-secondary p-2"
    >
        <div>
            <h2 class="fw-bold m-0 d-flex align-items-center">
                Caja:
                <span class="ms-2 text-danger">Desactivada</span>
            </h2>
        </div>
        <button
            class="tarjeta__button link-secondary align-middle material-icons-round tarjeta__button--edit"
        >
            print
        </button>
        <button
            class="tarjeta__button link-secondary align-middle material-icons-round"
            data-bs-toggle="collapse"
            data-bs-target="#reporteDiaParaImprimir"
            aria-expanded="true"
            aria-controls="reporteDiaParaImprimir"
        >
            visibility
        </button>
    </div>

    <!-- ##Table Ordenes Pendientes -->
    <div
        id="reporteDiaParaImprimir"
        class="bg-light rounded-3 p-2 accordion-collapse collapse show"
    >
        <div class="p-3">
            <div class="text-center">
                <h2 class="fw-bold">Reporte del Día</h2>
            </div>
            <div class="text-start fs-4 fw-bold">
                <span>Fecha: </span
                ><span class="text-secondary">{{
                    dateFormated(cajaSelected.createdAt)
                }}</span>
            </div>
            <div class="mt-4 table-responsive">
                <table class="table table-hover">
                    <tbody>
                        <template
                            v-for="(orden, index) in cajaOrdenesArr"
                            :key="orden._id"
                        >
                            <tr>
                                <td class="align-middle">
                                    {{ index + 1 }}
                                </td>
                                <td class="align-middle">
                                    <div
                                        class="d-flex justify-content-between flex-wrap"
                                    >
                                        <div class="me-3">
                                            <span class="text-secondary"
                                                >Metodo de pago: </span
                                            >{{ orden.payMetodo }}
                                        </div>
                                        <div class="me-3">
                                            <span class="text-secondary"
                                                >Hora: </span
                                            >{{ dateFormated(orden.updatedAt) }}
                                        </div>
                                    </div>
                                </td>
                                <td class="align-middle text-end">
                                    <span class="fw-bold"
                                        >{{ orden.total }} Bs.</span
                                    >
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
                <div class="mt-3 fs-5 fw-bold">Total: {{ totalCaja }} Bs.</div>
                <div v-for="metodo in arrayTotales">
                    Total de
                    <span class="fw-bold text-success"
                        >"{{ metodo.payMetodo }}"</span
                    >: <span class="fw-bold">{{ metodo.total }}</span> Bs.
                </div>
            </div>
        </div>
    </div>
    <CerrarCajaModal />
</template>

<script setup>
import CerrarCajaModal from '../components/modalsCaja/CerrarCaja.vue'
import { useCaja } from '../composables/useCaja'
import { getCurrentInstance } from 'vue'

const {
    cajaSelected,
    dateFormated,
    cajaOrdenesArr,
    arrayTotales,
    totalCaja,
    loadOrdenesOfCaja,
} = useCaja()

const instance = getCurrentInstance()
const imprimir = () => {
    instance.appContext.config.globalProperties.$htmlToPaper(
        'reporteDiaParaImprimir',
        {
            name: '_blank',
            specs: ['fullscreen=no', 'titlebar=no', 'scrollbars=no'],
            styles: [
                'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
            ],
        }
    )
}

loadOrdenesOfCaja(cajaSelected.value._id)
</script>
<style scoped>
.tarjeta {
    position: relative;
}

.tarjeta__button {
    user-select: none;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.4rem;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
}

.tarjeta__link {
    user-select: none;
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.tarjeta__button--edit {
    margin-right: 2rem;
}

.tarjeta__button--edit2 {
    margin-right: 4rem;
}
</style>
