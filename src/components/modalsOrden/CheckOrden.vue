<template>
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
		<div class="d-flex mb-2" v-for="(item, index) in ordenSelected.pedido">
			<span
				:class="[item.pendiente === 0 ? 'text-decoration-line-through' : '']"
				class="me-3"
				>{{ item.pendiente === 0 ? item.cantidad : item.pendiente }}</span
			>
			<span
				:class="[item.pendiente === 0 ? 'text-decoration-line-through' : '']"
				>{{ ordenCompleta(item) }}</span
			>
			<span
				v-if="actionState"
				role="status"
				class="ms-auto fw-bold text-success spinner-border spinner-border-sm"
			></span>
			<span
				v-else-if="item.pendiente === 0"
				class="ms-auto fw-bold material-icons-round text-success"
				>check_circle</span
			>
			<span
				v-else
				role="button"
				class="ms-auto fw-bold material-icons-round text-success"
				@click="$emit('checkOrden', index)"
				>check_circle_outline</span
			>
		</div>
	</div>
</template>

<script setup>
defineEmits(['checkOrden'])
defineProps({
	ordenSelected: {
		type: Object,
		default: {
			cliente: {},
			mesa: '0',
			pedido: [],
		},
	},
	actionState: {
		type: Boolean,
		default: false,
	},
})

function ordenCompleta(item) {
	if (item.nota) {
		return `${item.name} [${item.nota}]`
	}
	return item.name
}
</script>
