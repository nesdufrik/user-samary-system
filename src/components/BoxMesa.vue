<template>
	<div
		role="button"
		@click="action"
		:class="[
			estadoOrden === 'pendiente'
				? 'bg-primary-subtle border-primary-subtle'
				: 'bg-success-subtle border-success-subtle',
		]"
		class="col rounded-3 border-start border-4 p-3 mt-0 mb-0 d-flex justify-content-between shadow-sm user-select-none"
	>
		<div class="align-self-center">
			<div class="d-flex flex-column">
				<div class="d-flex gap-2 mb-2 align-items-center">
					<img :src="avatarEmpleado" width="35" height="35" alt="" />
					<small>{{ nombreEmpleado }}</small>
				</div>
				<div>
					Pendientes: <span class="fw-bold">{{ totalPendientes }}</span>
				</div>
				<div>
					Total: <span class="fw-bold">{{ formatCurrency(totalOrden) }}</span>
				</div>
			</div>
		</div>
		<div
			:class="[estadoOrden === 'pendiente' ? 'text-primary' : 'text-success']"
			class="align-self-center text-center"
		>
			<p class="m-0 h1 fw-bold">{{ numeroMesa }}</p>
			<small class="fw-bold">MESA</small>
		</div>
	</div>
</template>
<script setup>
const props = defineProps({
	avatarEmpleado: { type: String, default: '../../public/avatars/default.png' },
	nombreEmpleado: { type: String, default: 'Nombre Aleatorio' },
	numeroMesa: { type: String, default: 0 },
	totalPendientes: { type: Number, default: 0 },
	totalOrden: { type: Number, default: 0 },
	estadoOrden: { type: String, default: 'pendiente' },
})

const emit = defineEmits(['actionBox'])
const action = () => {
	emit('actionBox')
}

function formatCurrency(data) {
	return data.toLocaleString('es-BO', { style: 'currency', currency: 'BOB' })
}
</script>
<style scoped></style>
