<template>
	<button
		:class="` border-${tipo}-subtle bg-${tipo}-subtle`"
		class="d-flex flex-column border border-1 rounded-3 p-2 shadow user-select-none w-100 align-items-center"
		@click="$emit('actionBtnOrden')"
		:disabled="tipo === 'secondary'"
	>
		<span :class="[`text-${tipo}`]" class="material-icons-round fs-5">{{
			icon
		}}</span>
		<small :class="[`text-${tipo}`]">{{ name }}</small>
	</button>
</template>
<script setup>
defineEmits(['actionBtnOrden'])
defineProps({
	icon: String,
	name: String,
	tipo: String,
})
</script>
