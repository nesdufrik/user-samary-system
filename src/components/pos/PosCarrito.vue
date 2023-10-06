<template>
	<div
		class="bg-light rounded-3 border-start border-secondary-subtle border-4 h-100 mt-3 overflow-auto mb-0 p-3 enlace_action"
	>
		<!-- carrito vacio -->
		<div
			class="d-flex align-items-center justify-content-center h-100"
			v-if="carritoOrden.pedido.length === 0"
		>
			<div class="row justify-content-center text-center">
				<div class="img_container m-0 p-0">
					<img src="../../assets/icons/pos.png" alt="" />
				</div>
				<span class="fs-5 text-secondary">Agregar items</span>
			</div>
		</div>

		<!-- carrito con items -->

		<div v-else v-for="(item, index) in carritoOrden.pedido">
			<div
				id="ordenCarritoAtentida"
				v-if="item.pendiente === 0"
				class="tarjeta row border-bottom p-1 text-decoration-line-through"
			>
				<div class="col-5 d-flex align-items-center">
					<span>{{ item.name }}</span>
				</div>
				<div
					class="col text-center d-flex justify-content-evenly align-items-center"
				>
					<span>{{ item.cantidad }}</span>
				</div>
				<div class="col-2 d-flex flex-row g-0 align-items-center">
					{{ (item.importe = importe(item.precio, item.cantidad)) }}
				</div>
			</div>
			<div
				id="ordenCarritoNoAtendida"
				v-else
				class="tarjeta row border-bottom p-1"
			>
				<div class="col-5 d-flex align-items-center">
					<span>{{ item.name }}</span>
				</div>
				<div
					class="col text-center d-flex justify-content-evenly align-items-center"
				>
					<div
						role="button"
						class="text-danger material-icons-round"
						v-if="item.cantidad == 1"
						@click="quitar(index)"
					>
						cancel
					</div>
					<div
						role="button"
						class="material-icons-round"
						v-else
						@click="disminuir(index)"
					>
						do_not_disturb_on
					</div>
					<span class="fw-bold">{{ item.cantidad }}</span>
					<div
						role="button"
						class="material-icons-round"
						@click="aumentar(index)"
					>
						add_circle
					</div>
				</div>
				<div class="col-3 d-flex flex-row g-0 align-items-center">
					<div>
						<span class="fw-bold">{{
							(item.importe = importe(item.precio, item.cantidad))
						}}</span>
					</div>
				</div>
				<div id="contenedorBotonNotas">
					<div
						role="button"
						class="tarjeta__button"
						data-bs-toggle="collapse"
						:data-bs-target="'#flush-collapseOne' + index"
						aria-expanded="false"
						aria-controls="flush-collapseOne"
					>
						<span v-if="item.nota" class="material-icons-round text-primary">
							sticky_note_2
						</span>
						<span v-else class="material-icons-round text-secondary">
							sticky_note_2
						</span>
					</div>
				</div>
				<div
					:id="'flush-collapseOne' + index"
					class="accordion-collapse collapse"
				>
					<div class="form-floating mb-3 mt-2 mx-3">
						<input
							v-model="item.nota"
							type="text"
							class="form-control"
							:id="'notaInput' + index"
						/>
						<label :for="'notaInput' + index">Nota:</label>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useCarrito } from '../../composables/useCarrito'

const { carritoOrden, aumentar, disminuir, quitar } = useCarrito()
const importe = (aItem, bItem) => {
	return parseFloat((aItem * bItem).toFixed(1))
}
</script>

<style scoped>
.img_container {
	width: 100px;
}

.img_container img {
	width: 100%;
}

.tarjeta {
	position: relative;
}

.tarjeta__button {
	user-select: none;
	background-color: transparent;
	border: none;
	cursor: pointer;
	font-size: 1.7rem;
	position: absolute;
	right: 0rem;
	top: 0rem;
}
</style>
