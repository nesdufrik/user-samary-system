<template>
    <div class="modal-body text-center">
        <h2 class="modal-title fw-bold mb-4" id="exampleModalLabel">Orden</h2>
        <div id="ordenDataClient" class="row d-flex flex-column px-4 g-3">
            <div class="text-start d-flex flex-column fst-italic">
                <div class="mb-3">
                    <div class="fs-5" v-if="ordenSelected.cliente.name">
                        <span>Cliente: </span>
                        <span class="fw-bold">{{
                            ordenSelected.cliente.name
                        }}</span>
                    </div>
                    <div class="fs-5">
                        <span>Mesa: </span>
                        <span class="fw-bold">{{ ordenSelected.mesa }}</span>
                    </div>
                    <div v-if="ordenSelected.cliente.nota">
                        <span>Habitación: </span>
                        <span class="fw-bold">
                            {{ ordenSelected.cliente.nota }}
                        </span>
                    </div>
                </div>
                <div id="ordenDataPedidosItems">
                    <template v-for="(item, index) in ordenSelected.pedido">
                        <!-- item pendiente -->
                        <div class="d-flex mb-3">
                            <span class="me-3">{{ item.cantidad }}</span>
                            <span>{{ item.name }}</span>
                            <span class="ms-auto fw-bold text-dark">{{
                                item.importe
                            }}</span>
                        </div>
                    </template>
                    <hr />
                    <div class="d-flex mt-2">
                        <span class="me-3">Total</span>
                        <span class="ms-auto fw-bold text-dark">{{
                            ordenSelected.total
                        }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-center mt-5" id="areaBoton">
        <button class="btn btn-danger btn-lg" @click="closeWindow">
            Cerrar
        </button>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useOrdenes } from '../composables/useOrdenes'

const route = useRoute()
const { ordenSelected, loadDataToPrint } = useOrdenes()

const closeWindow = () => {
    window.close()
}

await loadDataToPrint(route.query.order, route.query.caja)

onMounted(() => {
    window.print()
})
</script>

<style scoped>
@media print {
    #areaBoton {
        display: none;
    }
}
</style>
