<template>
	<Carousel :settings="settings" :breakpoints="breakpoints" :wrap-around="true">
		<template v-for="(item, index) in etiquetasArr" :key="index">
			<Slide>
				<div
					class="bg-light carousel__item text-center fw-bold"
					@click="filtrar(item)"
				>
					{{ item }}
				</div>
			</Slide>
		</template>

		<template #addons> </template>
	</Carousel>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { useProductos } from '../../composables/useProductos'

const { etiquetasArr, filtrar } = useProductos()

const settings = {
	itemsToShow: 2.6,
	snapAlign: 'start',
}

const breakpoints = {
	359: {
		itemsToShow: 2.5,
		snapAlign: 'start',
	},
	374: {
		itemsToShow: 2.6,
		snapAlign: 'start',
	},
	389: {
		itemsToShow: 2.7,
		snapAlign: 'start',
	},
	411: {
		itemsToShow: 2.9,
		snapAlign: 'start',
	},
	539: {
		itemsToShow: 3.8,
		snapAlign: 'start',
	},
	710: {
		itemsToShow: 5.2,
		snapAlign: 'start',
	},
	767: {
		itemsToShow: 2.7,
		snapAlign: 'start',
	},
	819: {
		itemsToShow: 2.9,
		snapAlign: 'start',
	},
	911: {
		itemsToShow: 3.2,
		snapAlign: 'start',
	},
	1024: {
		itemsToShow: 3.7,
		snapAlign: 'start',
	},
	1150: {
		itemsToShow: 4.2,
		snapAlign: 'start',
	},
	1200: {
		itemsToShow: 4.7,
		snapAlign: 'start',
	},
	1360: {
		itemsToShow: 4.9,
		snapAlign: 'start',
	},
	1400: {
		itemsToShow: 5.5,
		snapAlign: 'start',
	},
}
</script>

<style scoped>
.carousel__item {
	padding: 1rem;
	min-height: 100px;
	width: 125px;
	font-size: 1rem;
	border-radius: 0.375rem;
	display: flex;
	justify-content: center;
	align-items: center;
	user-select: none;
	cursor: pointer;
}

.carousel__item:hover {
	background-color: #34a975 !important;
	color: #f8f9fa;
}
</style>
