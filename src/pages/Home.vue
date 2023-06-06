<template>
    <div
        :class="[
            'bd-callout bd-callout-right bd-callout-success rounded-3 text-end p-3',
            cajaActual.active ? '' : 'noactive',
        ]"
    >
        <h1 class="fw-bold">{{ userSucursal.name }}</h1>
        <p>
            {{ userSucursal.arroba }}<br />{{ userSucursal.direccion }}<br />{{
                userSucursal.telefono
            }}
        </p>
    </div>
    <div class="row row-cols-1 row-cols-md-2 g-3">
        <div class="col" v-if="!cajaActual.active">
            <div
                class="rounded-2 bd-callout bd-callout-left bd-callout-secondary p-3 mt-0 mb-0 h-100 d-flex align-items-center"
            >
                <div class="me-3">
                    <img
                        src="../assets/icons/cashier_close.png"
                        alt="abrir caja"
                        width="140"
                    />
                </div>
                <div class="ms-auto text-end">
                    <h2 class="fw-bold text-success">¡Importante!</h2>
                    <p>
                        Antes de utilizar el sistema, es necesario abrir una
                        <span class="fw-bold text-success"
                            >caja de registro.</span
                        >
                    </p>
                    <button
                        type="button"
                        class="btn btn-success"
                        data-bs-target="#abrirCajaModal"
                        data-bs-toggle="modal"
                    >
                        Abrir Caja
                    </button>
                </div>
            </div>
        </div>
        <div id="cajaOpenMessage" class="col" v-else>
            <div
                class="rounded-2 bd-callout bd-callout-left bd-callout-secondary p-3 mt-0 mb-0 h-100 d-flex align-items-center"
            >
                <div>
                    <h4 class="fw-bold">
                        Caja:
                        <span class="text-success fs-3">Activa</span><br />
                        Fecha:
                        <span class="text-success fs-3">{{
                            localCajaActual
                        }}</span>
                    </h4>
                    <p>
                        Esta caja te permitirá almacenar y administrar tu
                        información de manera segura y eficiente
                    </p>
                </div>
                <div class="ms-auto">
                    <img
                        src="../assets/icons/cashier_open.png"
                        alt="abrir caja"
                        width="140"
                    />
                </div>
            </div>
        </div>
        <div :class="['col', cajaActual.active ? '' : 'noactive']">
            <div class="row row-cols-1 row-cols-xl-2 g-3">
                <topItems />
            </div>
        </div>
    </div>

    <AbrirCajaModal />
</template>

<script setup>
import AbrirCajaModal from '../components/modalsCaja/AbrirCaja.vue'
import topItems from '../components/caja/topItems.vue'
import { useAuth } from '../composables/useAuth'
import { useCaja } from '../composables/useCaja'

const { cajaActual } = useCaja()
const { userSucursal } = useAuth()

const dateCajaActual = new Date(cajaActual.value.createdAt)
const localCajaActual = dateCajaActual.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
})
</script>

<style scoped>
.noactive {
    filter: grayscale(100%);
}
</style>
