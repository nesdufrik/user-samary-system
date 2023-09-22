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
            class="tarjeta__button link-danger align-middle material-icons-round tarjeta__button--edit"
            data-bs-target="#cerrarCajaModal"
            data-bs-toggle="modal"
        >
            archive
        </button>
        <button
            class="tarjeta__button link-secondary align-middle material-icons-round tarjeta__button"
            @click="imprimir"
        >
            print
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
            class="tarjeta__button link-secondary align-middle material-icons-round tarjeta__button"
        >
            print
        </button>
    </div>

    <!-- ##Table Reporte Ordenes Realizadas -->
    <div id="reporteDiaParaImprimir" class="bg-light rounded-3 p-2">
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
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Método</th>
                            <th>Propina</th>
                            <th>Subtotal</th>
                            <th>Desc.</th>
                            <th class="text-end">Total</th>
                        </tr>
                    </thead>
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
                                    {{ orden.payMetodo }} <br />
                                    <small class="text-secondary">{{
                                        dateFormated(orden.updatedAt)
                                    }}</small>
                                </td>
                                <td class="align-middle">
                                    <span class="text-secondary"
                                        >{{ orden.propina }} Bs.</span
                                    >
                                </td>
                                <td class="align-middle">
                                    <span class="text-secondary"
                                        >{{ orden.subtotal }} Bs.</span
                                    >
                                </td>
                                <td class="align-middle">
                                    <span class="text-secondary"
                                        >{{ orden.desc }} Bs.</span
                                    >
                                </td>
                                <td class="align-middle fw-bold text-end">
                                    {{ orden.total }} Bs.
                                </td>
                            </tr>
                        </template>
                        <tr class="bg-success bg-opacity-25">
                            <td colspan="5" class="align-middle fs-5 fw-bold">
                                TOTAL
                            </td>
                            <td class="align-middle fs-5 fw-bold text-end">
                                {{ totalCaja }} Bs.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="mt-4 table-responsive-sm col-md-4">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th class="py-0">Detalle</th>
                            <th class="text-end py-0">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="metodo in arrayTotales">
                            <tr>
                                <td class="py-0 text-success">
                                    {{ metodo.payMetodo }}
                                </td>
                                <td class="text-end py-0">
                                    {{ metodo.total }} Bs.
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
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
</style>
