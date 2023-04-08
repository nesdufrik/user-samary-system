<template>
    <!-- #Section Pendientes -->
    <div
        class="tarjeta rounded-2 bd-callout bd-callout-left bd-callout-secondary p-2"
    >
        <div>
            <h2 class="fw-bold m-0 d-flex align-items-center">
                Ordenes Pendientes
                <span class="badge bg-secondary fs-6 ms-2">{{
                    nroPendientes
                }}</span>
            </h2>
        </div>
        <button
            class="tarjeta__button link-secondary align-middle material-icons-round"
            data-bs-toggle="collapse"
            data-bs-target="#viewOrdenesPendientes"
            aria-expanded="true"
            aria-controls="viewOrdenesPendientes"
        >
            visibility
        </button>
    </div>
    <!-- ##Table Ordenes Pendientes -->
    <div
        id="viewOrdenesPendientes"
        class="bg-light rounded-3 table-responsive p-2 accordion-collapse collapse show"
    >
        <table class="table table-hover">
            <tbody>
                <template v-for="orden in ordenesArr" :key="orden._id">
                    <tr v-if="orden.estado === 'pendiente'">
                        <td class="align-middle">
                            <div class="d-flex align-items-center">
                                <img
                                    :src="orden.empleado.avatar"
                                    width="30"
                                    height="30"
                                    :alt="'avatar-' + orden.empleado.fullName"
                                    class="me-2"
                                />
                                <span class="fw-bold">{{
                                    orden.empleado.fullName
                                }}</span>
                            </div>
                        </td>
                        <td class="align-middle fw-bold">
                            <div
                                class="d-flex justify-content-between flex-wrap"
                            >
                                <div class="me-3">
                                    <span class="text-secondary">Mesa: </span
                                    >{{ orden.mesa }}
                                </div>
                                <div class="me-3">
                                    <span class="text-secondary"
                                        >Pendientes: </span
                                    >{{ nroTotalPedientes(orden.pedido) }}
                                </div>
                                <div
                                    class="me-3"
                                    v-if="orden.createdAt == orden.updatedAt"
                                >
                                    <span class="text-secondary">Hora: </span
                                    >{{ timeOrden(orden.createdAt) }}
                                </div>
                                <div class="me-3" v-else>
                                    <span class="text-secondary">Hora: </span
                                    >{{ timeOrden(orden.updatedAt) }}
                                </div>
                            </div>
                        </td>
                        <td class="align-middle text-end">
                            <span
                                class="tarjeta__link text-success material-icons-round me-md-2"
                                @click="selectOrdenToCheck(orden._id)"
                                data-bs-target="#checkOrdenModal"
                                data-bs-toggle="modal"
                                >check_circle_outline</span
                            >
                            <span
                                class="tarjeta__link text-secondary material-icons-round me-md-1"
                                @click="manageOrden(orden._id)"
                                >edit</span
                            >
                            <span
                                class="tarjeta__link text-danger material-icons-round"
                                data-bs-target="#deleteOrdenModal"
                                data-bs-toggle="modal"
                                @click="selectOrden(orden._id)"
                                >delete</span
                            >
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
    <!-- #Section Atendidas -->
    <div
        class="tarjeta rounded-2 bd-callout bd-callout-left bd-callout-secondary p-2 d-flex justify-content-between align-items-center"
    >
        <div>
            <h2 class="fw-bold m-0 d-flex align-items-center">
                Ordenes Atendidas
                <span class="badge bg-secondary fs-6 ms-2">{{
                    nroAtendidos
                }}</span>
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
                <template v-for="orden in ordenesArr" :key="orden._id">
                    <tr v-if="orden.estado === 'finalizado'">
                        <td class="align-middle">
                            <div class="d-flex align-items-center">
                                <img
                                    :src="orden.empleado.avatar"
                                    width="30"
                                    height="30"
                                    :alt="'avatar-' + orden.empleado.fullName"
                                    class="me-2"
                                />
                                <span class="fw-bold">{{
                                    orden.empleado.fullName
                                }}</span>
                            </div>
                        </td>
                        <td class="align-middle fw-bold">
                            <div class="d-flex flex-wrap">
                                <div>
                                    <span class="text-secondary">Mesa: </span
                                    >{{ orden.mesa }}
                                </div>
                                <div class="ms-auto">
                                    <span class="text-secondary">Total: </span
                                    >{{ orden.total }} Bs.
                                </div>
                            </div>
                        </td>
                        <td class="align-middle text-end">
                            <span
                                class="tarjeta__link text-success material-icons-round me-md-2"
                                @click="selectOrdenToPay(orden._id)"
                                data-bs-target="#payOrdenModal"
                                data-bs-toggle="modal"
                                >payment</span
                            >
                            <span
                                class="tarjeta__link text-secondary material-icons-round"
                                @click="manageOrden(orden._id)"
                                >add_circle_outline</span
                            >
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
    <!-- #Section Terminadas -->
    <div
        class="tarjeta rounded-2 bd-callout bd-callout-left bd-callout-secondary p-2 d-flex justify-content-between align-items-center"
    >
        <div>
            <h2 class="fw-bold m-0 d-flex align-items-center">
                Ordenes Terminadas
                <span class="badge bg-secondary fs-6 ms-2">{{
                    nroTerminados
                }}</span>
            </h2>
        </div>
        <button
            class="tarjeta__button link-secondary align-middle material-icons-round"
            data-bs-toggle="collapse"
            data-bs-target="#viewOrdenesTerminadas"
            aria-expanded="false"
            aria-controls="viewOrdenesTerminadas"
        >
            visibility
        </button>
    </div>
    <!-- ##Table Ordenes Terminadas -->
    <div
        id="viewOrdenesTerminadas"
        class="bg-light rounded-3 table-responsive p-2 accordion-collapse collapse"
    >
        <table class="table table-hover">
            <thead>
                <tr>
                    <th colspan="3" class="align-middle fs-4">Ordenes</th>
                    <th colspan="2" class="align-middle">Precio Bs.</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="orden in ordenesArr" :key="orden._id">
                    <tr v-if="orden.estado === 'terminado'">
                        <td class="align-middle">{{ orden.empleado }}</td>
                        <td class="align-middle">{{ orden.mesa }}</td>
                        <td class="align-middle">{{ orden.tipo }}</td>
                        <td class="align-middle">{{ orden.total }}</td>
                        <td class="align-middle text-end">
                            <span
                                class="tarjeta__link text-secondary material-icons-round me-md-2"
                                >edit</span
                            >
                            <span
                                class="tarjeta__link text-danger material-icons-round"
                                >delete</span
                            >
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>

    <DeleteOrdenModal />
    <CheckOrdenModal />
    <PayOrdenModal />
</template>

<script setup>
import DeleteOrdenModal from '../components/modalsOrden/DeleteOrden.vue'
import CheckOrdenModal from '../components/modalsOrden/CheckOrden.vue'
import PayOrdenModal from '../components/modalsOrden/PayOrden.vue'
import { useOrdenes } from '../composables/useOrdenes'

const {
    ordenesArr,
    nroAtendidos,
    nroPendientes,
    nroTerminados,
    timeOrden,
    nroTotalPedientes,
    listOrdenes,
    manageOrden,
    selectOrden,
    selectOrdenToCheck,
    selectOrdenToPay,
} = useOrdenes()

listOrdenes()
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
