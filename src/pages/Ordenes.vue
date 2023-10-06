<template>
	<BoxTitle titulo="Mesas en atención" />
	<div class="row row-cols-sm-3 row-cols-lg-4 g-3">
		<template v-for="orden in ordenesArr">
			<div v-if="orden.estado !== 'terminado'" :key="orden._id">
				<BoxMesa
					:avatar-empleado="orden.empleado?.avatar"
					:nombre-empleado="orden.empleado?.fullName"
					:numero-mesa="orden.mesa"
					:total-pendientes="nroTotalPedientes(orden.pedido)"
					:total-orden="orden.total"
					:estado-orden="orden.estado"
					@action-box="actionModal(orden._id)"
				/>
			</div>
		</template>
	</div>
	<Teleport to="#modal">
		<MesaModal
			@btn-delete="eliminar"
			@btn-manage="modificar"
			@btn-print="imprimir"
		/>
	</Teleport>
</template>

<script setup>
import { useOrdenes } from '../composables/useOrdenes'
import BoxTitle from '@/components/BoxTitle.vue'
import BoxMesa from '@/components/BoxMesa.vue'
import { onMounted } from 'vue'
import { Modal } from 'bootstrap'
import MesaModal from '@/components/modalsOrden/MesaModal.vue'

const {
	ordenesArr,
	nroTotalPedientes,
	borrar,
	manageOrden,
	listOrdenes,
	selectOrden,
	printPage,
	cleanForm,
} = useOrdenes()

let mesaModal

onMounted(() => {
	mesaModal = new Modal('#mesaManage')
})

function actionModal(data) {
	selectOrden(data)
	mesaModal.show()
}

async function eliminar(id) {
	await borrar(id)
	mesaModal.hide()
}

function modificar(id) {
	mesaModal.hide()
	manageOrden(id)
}

function imprimir(id) {
	mesaModal.hide()
	printPage(id)
}

window.addEventListener('popstate', function (e) {
	mesaModal.hide()
})

await listOrdenes()
</script>
