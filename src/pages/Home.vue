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
						<Suspense>
							<component :is="Component"></component>
							<template #fallback>
								<div
									class="d-flex align-items-center justify-content-center"
									style="height: 80vh"
								>
									<span class="loader"></span>
								</div>
							</template>
						</Suspense>
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
<style scoped>
.loader {
	position: relative;
	width: 48px;
	height: 48px;
	background: #198754;
	transform: rotateX(65deg) rotate(45deg);
	color: #20c997;
	animation: layers1 1s linear infinite alternate;
}
.loader:after {
	content: '';
	position: absolute;
	inset: 0;
	background: rgba(255, 255, 255, 0.7);
	animation: layerTr 1s linear infinite alternate;
}

@keyframes layers1 {
	0% {
		box-shadow: 0px 0px 0 0px;
	}
	90%,
	100% {
		box-shadow: 20px 20px 0 -4px;
	}
}
@keyframes layerTr {
	0% {
		transform: translate(0, 0) scale(1);
	}
	100% {
		transform: translate(-25px, -25px) scale(1);
	}
}
</style>
