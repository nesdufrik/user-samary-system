<template>
	<!-- Visualizar Imágen de Producto -->
	<div
		class="modal fade"
		id="viewImageModal"
		tabindex="-1"
		role="dialog"
		aria-labelledby="createSucursalLabel"
		aria-hidden="true"
	>
		<div
			class="modal-dialog modal-dialog-centered modal-fullscreen"
			role="document"
		>
			<div class="modal-content">
				<div class="modal-body text-center bg-dark bg-gradient col-12">
					<img
						class="h-100 w-100"
						:src="productoUrlImage"
						style="object-fit: contain"
						alt=""
					/>
				</div>
				<div class="modal-footer p-0">
					<button
						type="button"
						class="btn-modal btn-modal-block btn-modal-secondary col fw-bold"
						data-bs-dismiss="modal"
					>
						Cerrar
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useCarrito } from '@/composables/useCarrito'

const { productoUrlImage } = useCarrito()
</script>

<style scoped>
.btn-cotenido-modal {
	padding: 1rem;
	font-size: 1rem;
	border: 0;
	user-select: none;
	border-radius: 0.375rem;
}
.btn-modal {
	margin: 0;
	padding: 0.8rem;
	font-size: 1rem;
	border: 1px solid #ccc;
	border-top: 0;
	border-bottom: 0;
	border-right: 0;
	user-select: none;
}
</style>
