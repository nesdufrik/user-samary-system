<template>
	<div
		class="bg-light rounded-3 border-start border-secondary-subtle border-4 p-2 d-flex flex-wrap align-items-center mb-3 mt-3"
	>
		<div>
			<h2 class="fw-bold m-0 ms-2">
				{{ titulo }}
			</h2>
		</div>
		<div class="ms-auto d-flex gap-2">
			<slot></slot>
		</div>
	</div>
</template>
<script setup>
defineProps({
	titulo: String,
})
</script>
