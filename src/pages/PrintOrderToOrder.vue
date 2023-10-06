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
			<template v-for="item in ordenSelected.pedido">
				<div class="d-flex mb-0" v-if="item.pendiente !== 0">
					<span class="me-3">{{ item.pendiente }}</span>
					<span>{{ item.name }}</span>
				</div>
			</template>
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
import { useOrdenes } from '../composables/useOrdenes'

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
</style>
