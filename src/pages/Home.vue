<template>
	<Layout>
		<template #header>
			<NavBar />
		</template>
		<template #main>
			<!-- <RouterView /> -->
			<router-view v-slot="{ Component, route }">
				<Transition name="fade" mode="out-in">
					<div :key="route.name">
						<component :is="Component"></component>
					</div>
				</Transition>
			</router-view>
		</template>
		<template #footer>
			<small class="text-secondary">
				powered by
				<a
					class="fw-bold text-decoration-none text-success"
					href="https://friktek.com"
					>FrikTek</a
				>
			</small>
		</template>
	</Layout>
</template>

<script setup>
import Layout from '@/components/Layout.vue'
import NavBar from '@/components/NavBar.vue'
import { useNavBar } from '@/composables/useNavBar'
import { useCaja } from '@/composables/useCaja'

const { loadCaja } = useCaja()
const { contentNavBar } = useNavBar()

await loadCaja()
contentNavBar()
</script>
<style scoped></style>
