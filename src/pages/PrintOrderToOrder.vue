<template>
    <div class="modal-body text-center" id="ordenDataToPrint">
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
                    <template v-for="item in ordenSelected.pedido">
                        <div class="d-flex" v-if="item.pendiente !== 0">
                            <span class="me-3">{{ item.pendiente }}</span>
                            <span>{{ item.name }}</span>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useOrdenes } from '../composables/useOrdenes'

const route = useRoute()
const { ordenSelected, loadDataToPrint } = useOrdenes()

await loadDataToPrint(route.query.order, route.query.caja)

onMounted(() => {
    window.print()
    window.close()
})
</script>

<style lang="scss" scoped></style>
