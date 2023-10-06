<template>
	<div class="modal-body text-center">
		<h2 class="modal-title fw-bold mb-4" id="exampleModalLabel">Orden</h2>
		<div id="ordenDataClient" class="text-start d-flex flex-column">
			<div class="mb-2">
				<div v-if="ordenSelected.cliente?.name">
					<span>Cliente: </span>
					<span class="fw-bold">{{ ordenSelected.cliente?.name }}</span>
				</div>
				<div>
					<span>Mesa: </span>
					<span class="fw-bold">{{ ordenSelected.mesa }}</span>
				</div>
				<div v-if="ordenSelected.cliente?.nota">
					<span>Habitación: </span>
					<span class="fw-bold">
						{{ ordenSelected.cliente?.nota }}
					</span>
				</div>
			</div>
			<div class="d-flex mb-0" v-for="(item, index) in ordenSelected.pedido">
				<span class="me-3">{{ item.cantidad }}</span>
				<span>{{ item.name }}</span>
				<span class="ms-auto">{{ item.importe }}</span>
			</div>
			<div class="d-flex total_class mt-4 py-2">
				<span class="fw-bold">TOTAL</span>
				<span class="ms-auto fw-bold">{{ ordenSelected.total }}</span>
			</div>
		</div>
	</div>
	<div class="text-center mt-5 bg-danger-subtle" id="areaBoton">
		<button
			class="btn btn-outline-danger btn-lg col-12 rounded-0 fw-bold d-flex align-items-center justify-content-center"
			@click="closeWindow"
		>
			<span class="material-icons-round me-1">close</span>
			<span>Cerrar</span>
		</button>
	</div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useOrdenes } from '@/composables/useOrdenes'

const route = useRoute()
const { ordenSelected, loadDataToPrint } = useOrdenes()

const closeWindow = () => {
	window.close()
}

await loadDataToPrint(route.query.order)

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

.total_class {
	border-top-style: dashed;
}
</style>
