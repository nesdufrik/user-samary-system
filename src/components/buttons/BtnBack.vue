<template>
	<button
		type="button"
		class="btn-modal btn-modal-left btn-modal-secondary col-6 fw-bold m-0"
		data-bs-dismiss="modal"
		@click="$emit('actionBack')"
	>
		{{ name }}
	</button>
</template>
<script setup>
defineEmits(['actionBack'])
defineProps({
	name: {
		type: String,
		default: 'Cerrar',
	},
})
</script>
