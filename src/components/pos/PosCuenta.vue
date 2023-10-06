<template>
	<div
		class="carrito__cobro bg-light rounded-3 border-start border-secondary-subtle border-4 mt-3 p-0"
	>
		<div
			id="contenidoPosCuenta"
			class="contenido px-3 py-2 row g-1 enlace_action"
		>
			<div
				id="titleSubTotalPosCuenta"
				class="d-flex justify-content-between fs-5"
				v-if="false"
			>
				<span>Sub total </span>
				<span>
					{{ subTotalPrecio }}
				</span>
			</div>
			<div id="accordionDescuentoPago" class="accordion" v-if="false">
				<h5 class="d-flex fs-5 mb-0">
					<span>Descuento</span>
					<span
						role="button"
						data-bs-toggle="collapse"
						data-bs-target="#inputDescuento"
						aria-expanded="false"
						aria-controls="flush-collapseOne"
					>
						<span class="material-icons-round"> confirmation_number </span>
					</span>
					<span class="ms-auto">
						{{ cuponDesc }}
					</span>
				</h5>
				<div
					id="inputDescuento"
					class="p-0 collapse"
					aria-labelledby="headingOne"
					data-bs-parent="#accordionDescuentoPago"
				>
					<input
						v-model="cuponDesc"
						class="form-control form-control-sm rounded-3"
						type="number"
						placeholder="Cupon"
					/>
				</div>
			</div>
			<div
				id="titleTotalPosCuenta"
				class="d-flex justify-content-between fw-bold fs-4"
			>
				<span>Monto a pagar</span>
				<span>{{
					(carritoOrden.total = subTotalPrecio - cuponDesc).toLocaleString(
						'es-BO',
						{ style: 'currency', currency: 'BOB' }
					)
				}}</span>
			</div>
		</div>
		<div id="footerPosCuentaButtons" class="p-0">
			<button
				type="button"
				class="btn-modal btn-modal-danger btn-modal-left col-6 fw-bold"
				@click="limpiar"
			>
				Cancelar
			</button>
			<button
				type="button"
				:class="[
					carritoOrden.pedido.length === 0
						? 'btn-modal-disabled'
						: 'btn-modal-primary',
				]"
				class="btn-modal btn-modal-right col-6 fw-bold"
				data-bs-toggle="modal"
				data-bs-target="#createPosOrden"
				:disabled="carritoOrden.pedido.length === 0"
			>
				{{ carritoOrden.estado ? 'Actualizar Pedido' : 'Realizar Pedido' }}
			</button>
		</div>
	</div>
</template>

<script setup>
import { useCarrito } from '../../composables/useCarrito'

const { subTotalPrecio, cuponDesc, carritoOrden, limpiar, actionState } =
	useCarrito()
</script>

<style scoped>
.carrito__cobro {
	margin-bottom: 0rem;
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
