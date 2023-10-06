<template>
	<div class="content">
		<slot></slot>
	</div>
	<div class="movements d-md-none">
		<div class="head" @click="showMovements = !showMovements">
			<slot name="titulo"></slot>
		</div>
		<div class="body" v-show="showMovements">
			<slot name="lista"></slot>
		</div>
	</div>
</template>
<script setup>
import { ref } from 'vue'
const showMovements = ref(false)
</script>
<style scoped>
.movements {
	z-index: 1;
	position: fixed;
	flex-direction: column;
	bottom: 0;
	background-color: #34a975;
	border-top-left-radius: 1rem;
	border-top-right-radius: 1rem;
}

.movements .head {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 15px;
	width: 100%;
	box-sizing: border-box;
}

.movements .body {
	height: 78vh;
	width: 100%;
}
</style>
