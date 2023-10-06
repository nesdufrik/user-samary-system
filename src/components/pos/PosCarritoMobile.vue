<template>
	<div class="h-100 d-flex flex-column bg-light rounded-top">
		<!--CARRITO-->
		<div class="p-3 h-100 overflow-auto">
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
			<!-- carrito lista -->
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
							:class="[item.cantidad === 1 ? 'text-danger' : '']"
							class="material-icons-round"
							@click="item.cantidad === 1 ? quitar(index) : disminuir(index)"
						>
							{{ item.cantidad === 1 ? 'cancel' : 'do_not_disturb_on' }}
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
					<div class="col-3 d-flex g-0 align-items-center">
						<div>
							<span class="fw-bold">{{
								(item.importe = importe(
									item.precio,
									item.cantidad
								)).toLocaleString('es-BO', {
									style: 'currency',
									currency: 'BOB',
								})
							}}</span>
						</div>
					</div>
					<div
						role="button"
						data-bs-toggle="collapse"
						:data-bs-target="'#flush-collapseOne' + index"
						aria-expanded="false"
						aria-controls="flush-collapseOne"
					>
						<span
							:class="[item.nota ? 'text-primary' : 'text-secondary']"
							class="material-icons-round"
						>
							sticky_note_2
						</span>
					</div>
					<div
						:id="'flush-collapseOne' + index"
						class="accordion-collapse collapse"
					>
						<div class="form-floating">
							<input
								v-model="item.nota"
								type="text"
								class="form-control"
								:id="'notaInputMobile' + index"
							/>
							<label :for="'notaInputMobile' + index">Nota:</label>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--BOTONES-->
		<div class="mt-auto d-flex">
			<button class="bg-danger-subtle text-danger fw-bold" @click="limpiar">
				Cancelar
			</button>
			<button
				:class="[
					carritoOrden.pedido.length === 0
						? 'bg-secondary-subtle text-secondary'
						: 'bg-primary-subtle text-primary',
				]"
				class="fw-bold"
				data-bs-toggle="modal"
				data-bs-target="#createPosOrden"
				:disabled="carritoOrden.pedido.length === 0"
			>
				{{ carritoOrden.estado ? 'Actualizar' : 'Ordenar' }}
			</button>
		</div>
	</div>
</template>

<script setup>
import { useCarrito } from '@/composables/useCarrito'

const { carritoOrden, limpiar, aumentar, disminuir, quitar } = useCarrito()

const importe = (aItem, bItem) => {
	return parseFloat((aItem * bItem).toFixed(1))
}
</script>
<style scoped>
button {
	width: 100%;
	border: 0;
	padding: 1rem;
}

.img_container {
	width: 100px;
}

.img_container img {
	width: 100%;
}
</style>
