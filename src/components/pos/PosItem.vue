<template>
	<div class="col">
		<div
			class="bg-light rounded-3 border-start border-success-subtle border-4 d-flex fw-bold m-0 h-100"
		>
			<div
				v-if="imageProducto"
				class="image-fit"
				data-bs-toggle="modal"
				data-bs-target="#viewImageModal"
				@click="viewImage(imageProducto)"
			>
				<img :src="imageProducto" alt="" />
			</div>
			<div
				class="enlace_action d-flex justify-content-between w-100"
				role="button"
				@click="handleClick($event, itemObj)"
				@click.shift="handleShiftClick($event, itemObj)"
			>
				<div class="p-2 fs-5 product-name">
					<span>{{ nombreProducto }}</span>
				</div>
				<div class="product-price ms-auto">
					<div class="price-circle fs-6">
						{{
							precioProducto.toLocaleString('es-BO', {
								style: 'currency',
								currency: 'BOB',
							})
						}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useCarrito } from '../../composables/useCarrito'

const props = defineProps({
	nombreProducto: String,
	precioProducto: Number,
	imageProducto: String,
	itemObj: Object,
})

const { agregarCarrito, agregarCarritoNota, viewImage } = useCarrito()

const handleClick = (event, item) => {
	if (event.shiftKey) {
		return
	}

	agregarCarrito(item)
}

const handleShiftClick = (event, item) => {
	if (!event.shiftKey) {
		return
	}

	agregarCarritoNota(item)
}
</script>

<style scoped>
.product-name {
	min-height: 80px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.product-price {
	background-color: #d1e7dd;
	border-top-right-radius: 0.375rem;
	border-bottom-right-radius: 0.375rem;
	color: #146c43;
	display: flex;
	align-items: center;
	justify-content: center;
}

.enlace_action:hover .product-price {
	background-color: #34a975;
	color: #f8f9fa;
}
.price-circle {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100px;
}

.image-fit img {
	width: 100px;
	height: 100px;
	object-fit: cover;
	border-top-left-radius: 7px;
	border-bottom-left-radius: 7px;
}
</style>
