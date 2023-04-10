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
            <div class="text-start fw-bold">
                <span>Codigo Caja: </span
                ><span class="text-secondary">{{ cajaSelected._id }}</span>
            </div>
            <div class="mt-4 table-responsive">
                <table class="table table-hover">
                    <tbody>
                        <template
                            v-for="orden in cajaOrdenesArr"
                            :key="orden._id"
                        >
                            <tr>
                                <td class="align-middle">
                                    <div class="d-flex flex-column">
                                        <div>
                                            <span class="text-secondary"
                                                >Code: </span
                                            >{{ orden._id }}
                                        </div>
                                    </div>
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
            </div>
        </div>
    </div>
    <!-- #Cajas Anteriores -->
    <div
        class="tarjeta rounded-2 bd-callout bd-callout-left bd-callout-secondary p-2 d-flex justify-content-between align-items-center"
    >
        <div>
            <h2 class="fw-bold m-0 d-flex align-items-center">
                Cajas Anteriores
            </h2>
        </div>
        <button
            class="tarjeta__button link-secondary align-middle material-icons-round"
            data-bs-toggle="collapse"
            data-bs-target="#viewOrdenesAtendidas"
            aria-expanded="false"
            aria-controls="viewOrdenesAtendidas"
        >
            visibility
        </button>
    </div>
    <!-- ##Table Ordenes Atendidas -->
    <div
        id="viewOrdenesAtendidas"
        class="bg-light rounded-3 table-responsive p-2 accordion-collapse collapse"
    >
        <table class="table table-hover">
            <tbody>
                <template v-for="caja in cajasArr" :key="caja._id">
                    <tr>
                        <td class="align-middle fw-bold">
                            <span class="text-secondary">Code: </span
                            >{{ caja._id }}
                        </td>
                        <td class="align-middle fw-bold">
                            <span class="text-secondary">Creada el: </span
                            >{{ dateFormated(caja.createdAt) }}
                        </td>
                        <td class="align-middle fw-bold">
                            <div v-if="!caja.active">
                                <span class="text-secondary">Cerrada el: </span
                                >{{ dateFormated(caja.updatedAt) }}
                            </div>
                            <div v-else>
                                <span class="text-success fs-5">Activa</span>
                            </div>
                        </td>
                        <td class="align-middle text-end">
                            <span
                                class="tarjeta__link text-dark material-icons-round"
                                @click="selectCaja(caja)"
                                >upload_file</span
                            >
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>

    <CerrarCajaModal />
</template>

<script setup>
import CerrarCajaModal from '../components/modalsCaja/CerrarCaja.vue'
import { useCaja } from '../composables/useCaja'
import { getCurrentInstance } from 'vue'

const {
    cajasArr,
    cajaSelected,
    dateFormated,
    cajaOrdenesArr,
    listAllCajas,
    loadOrdenesOfCaja,
    selectCaja,
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

listAllCajas()
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
