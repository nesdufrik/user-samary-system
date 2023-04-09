<template>
    <div
        :class="[
            'bd-callout bd-callout-right bd-callout-success rounded-3 text-end p-3',
            cajaActual.active ? '' : 'noactive',
        ]"
    >
        <h1 class="fw-bold">{{ userData.sucursal.name }}</h1>
        <p>
            {{ userData.sucursal.arroba }}<br />{{ userData.sucursal.direccion
            }}<br />{{ userData.sucursal.telefono }}
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
                    <h2 class="fw-bold">¡Importante!</h2>
                    <p>
                        Antes de utilizar el sistema, es necesario crear una
                        <span class="fw-bold">caja de registro.</span>
                    </p>
                    <button
                        type="button"
                        class="btn btn-success"
                        @click="abrirCaja"
                    >
                        Crear Caja
                    </button>
                </div>
            </div>
        </div>
        <div class="col" v-else>
            <div
                class="rounded-2 bd-callout bd-callout-left bd-callout-secondary p-3 mt-0 mb-0 h-100 d-flex align-items-center"
            >
                <div>
                    <h4 class="fw-bold">
                        Caja:
                        <span class="text-success fs-3">Activa</span>
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
</template>

<script setup>
import topItems from '../components/caja/topItems.vue'
import { useAuth } from '../composables/useAuth'
import { useCaja } from '../composables/useCaja'

const { cajaActual, abrirCaja } = useCaja()
const { userData } = useAuth()
</script>

<style scoped>
.noactive {
    filter: grayscale(100%);
}
</style>
