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
                        Antes de utilizar el sistema, es necesario abrir una
                        <span class="fw-bold">caja de registro.</span>
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
        <!-- <div>
            <button type="button" class="btn btn-primary" @click="printPage">
                Imprimir
            </button>
        </div> -->
    </div>

    <AbrirCajaModal />
</template>

<script setup>
import AbrirCajaModal from '../components/modalsCaja/AbrirCaja.vue'
import topItems from '../components/caja/topItems.vue'
import { useAuth } from '../composables/useAuth'
import { useCaja } from '../composables/useCaja'

const { cajaActual } = useCaja()
const { userData } = useAuth()

const printPage = () => {
    // Obtener la URL que contiene los estilos CSS
    const stylesUrl =
        'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css'
    // Obtener el elemento que se imprimirá
    const element = document.getElementById('cajaOpenMessage')
    // Obtener el contenido HTML de la página actual
    const content = element.outerHTML

    // Crear una nueva pestaña y cargar los estilos CSS
    const newWindow = window.open()
    const stylesPromise = fetch(stylesUrl).then(response => response.text())
    stylesPromise.then(styles => {
        newWindow.document.head.innerHTML = `
        <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet">
        <style>${styles}</style>
        <style>
            body {
                font-family: 'Nunito', sans-serif;
            }
        </style>
        `
    })
    newWindow.document.open()
    newWindow.document.write(content)
    newWindow.document.close()

    // Imprimir el contenido en la nueva pestaña
    newWindow.onload = function () {
        const newElement = newWindow.document.getElementById('elementId')
        newElement && newElement.scrollIntoView() // Asegurarse de que el elemento exista antes de llamar a scrollIntoView()
        newWindow.print()
    }
}
</script>

<style scoped>
.noactive {
    filter: grayscale(100%);
}
</style>
