<template>
	<BoxTitle :titulo="userSucursal.name" />
	<div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
		<div class="col">
			<BoxData
				:url-img="menu"
				titulo="Menús"
				text-alt="menus_vendidos"
				:total="totalOrdenes"
			/>
		</div>
		<div class="col">
			<BoxData
				:url-img="money"
				titulo="Beneficios"
				text-alt="total_beneficios"
				:total="totalBeneficios"
				:currency="true"
			/>
		</div>
		<div class="col">
			<BoxData
				:url-img="food"
				titulo="Productos"
				text-alt="total_productos"
				:total="totalCantidad"
			/>
		</div>
		<div class="col">
			<BoxData
				:url-img="toDo"
				titulo="Ordenes"
				text-alt="total_ordenes"
				:total="totalOrdenes"
			/>
		</div>
	</div>

	<Teleport to="#modal">
		<component :is="CustomCajaModal" />
	</Teleport>
</template>

<script setup>
import menu from '@/assets/icons/menu.png'
import money from '@/assets/icons/money.png'
import food from '@/assets/icons/food.png'
import toDo from '@/assets/icons/to-do-list.png'
import AbrirCaja from '@/components/modalsCaja/AbrirCaja.vue'
import CerrarCaja from '@/components/modalsCaja/CerrarCaja.vue'
import BoxData from '@/components/caja/BoxData.vue'
import BoxTitle from '@/components/BoxTitle.vue'
import { useAuth } from '@/composables/useAuth'
import { useCaja } from '@/composables/useCaja'
import { useOrdenes } from '@/composables/useOrdenes'
import { markRaw, onMounted, ref } from 'vue'
import { Modal } from 'bootstrap'

const { cajaActual, cajaSelected, loadOrdenesOfCaja } = useCaja()
const { userSucursal } = useAuth()
const { totalBeneficios, totalOrdenes, totalCantidad, listOrdenes } =
	useOrdenes()

let openCajaModal
const CustomCajaModal = ref(markRaw(AbrirCaja))
if (cajaActual.value.active) CustomCajaModal.value = markRaw(CerrarCaja)

onMounted(() => {
	openCajaModal = new Modal('#cajaModal')

	if (!cajaActual.value.active) return openCajaModal.show()
	pasaron24Horas(cajaActual.value.createdAt)
})

function pasaron24Horas(date) {
	const actualDate = new Date()
	const cajaCreated = new Date(date)
	const diferencia = actualDate - cajaCreated
	const horasTranscurridas = diferencia / (1000 * 60 * 60)
	if (horasTranscurridas >= 8) return openCajaModal.show()
}

await listOrdenes()
await loadOrdenesOfCaja(cajaSelected.value._id)
</script>
