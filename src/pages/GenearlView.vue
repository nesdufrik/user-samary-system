<template>
	<Suspense>
		<template #default>
			<Home />
		</template>
		<template #fallback>
			<LoadingPage />
		</template>
	</Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import LoadingPage from './LoadingPage.vue'

const Home = defineAsyncComponent(
	() =>
		new Promise((resolve) => {
			setTimeout(() => {
				resolve(import('@/pages/Home.vue'))
			}, 5000)
		})
)
</script>

<style scoped></style>
