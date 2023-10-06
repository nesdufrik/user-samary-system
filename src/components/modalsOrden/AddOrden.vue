<template>
	<!-- Elegir tipo de Cliente -->
	<ModalBase id-modal="createPosOrden" titulo="Datos orden">
		<template #default>
			<!-- Botones tipo -->
			<div class="radio-buttons user-select-none">
				<label class="radio-button">
					<input
						type="radio"
						v-model="carritoOrden.tipo"
						value="huesped"
						id="huespedCheck"
					/>
					<span class="button-label fw-bold">Huesped</span>
				</label>
				<label class="radio-button">
					<input
						type="radio"
						v-model="carritoOrden.tipo"
						value="externo"
						id="externoCheck"
					/>
					<span class="button-label fw-bold">Externo</span>
				</label>
			</div>
			<!-- Formulario -->
			<div id="formHuespedData" class="row d-flex g-2">
				<div class="form-floating">
					<input
						v-model="carritoOrden.cliente.name"
						type="text"
						class="form-control"
						id="floatingNombreHuesped"
					/>
					<label for="floatingNombreHuesped">Nombre de huesped</label>
				</div>
				<div class="form-floating col-6">
					<input
						v-model="carritoOrden.cliente.nota"
						type="text"
						class="form-control"
						id="floatingHabitacionHuesped"
						:disabled="carritoOrden.tipo !== 'huesped'"
					/>
					<label for="floatingHabitacionHuesped">Habitación</label>
				</div>
				<div class="form-floating col-6">
					<input
						type="button"
						v-model="carritoOrden.mesa"
						class="form-control bg-white text-start fw-bold"
						id="floatingMesaHuesped"
						@click="showMesas = !showMesas"
					/>
					<label for="floatingMesaHuesped">Mesa</label>
				</div>
				<!-- Show mesas disponibles -->
				<div
					class="row mt-3 gap-1 d-flex justify-content-center"
					v-if="showMesas"
				>
					<button
						v-for="(mesa, index) in userSucursal.mesas"
						:class="[
							compararMesa(index + 1)
								? 'bg-danger-subtle border-danger-subtle'
								: 'bg-light-subtle border-light-subtle',
						]"
						class="col-1 rounded border border-3"
						style="width: 50px; height: 50px"
						:disabled="compararMesa(index + 1)"
						@click="
							;(carritoOrden.mesa = `${index + 1}`), (showMesas = !showMesas)
						"
					>
						<span class="fw-bold fs-5">{{ index + 1 }}</span>
					</button>
				</div>
			</div>
		</template>
		<template #footer>
			<template v-if="!carritoOrden.mesa">
				<BtnFull />
			</template>
			<template v-else>
				<BtnBack />
				<BtnNext target="printOrden" />
			</template>
		</template>
	</ModalBase>
	<!-- Realizar orden / Imprimir nota -->
	<ModalBase id-modal="printOrden" titulo="Orden">
		<div class="text-start">
			<div v-if="carritoOrden.cliente.name">
				<span>Cliente: </span>
				<span class="fw-bold">{{ carritoOrden.cliente.name }}</span>
			</div>
			<div>
				<span>Mesa: </span>
				<span class="fw-bold">{{ carritoOrden.mesa }}</span>
			</div>
			<div v-if="carritoOrden.cliente.nota">
				<span>Habitación: </span>
				<span>
					{{ carritoOrden.cliente.nota }}
				</span>
			</div>
		</div>
		<div class="mt-3" id="ordenDataPedidosItems">
			<template v-for="item in carritoOrden.pedido">
				<div class="d-flex" v-if="item.pendiente !== 0">
					<span class="me-3">{{ item.pendiente }}</span>
					<span>{{ item.name }}</span>
				</div>
			</template>
		</div>
		<template #footer>
			<BtnBack />
			<BtnNext name="Ordenar" @action-next="imprimir" target="msgCarrito" />
		</template>
	</ModalBase>
	<ModalAlert :action="actionState" :error-api="errorApi" id-modal="msgCarrito">
		<BtnFull
			:action="actionState"
			:show="errorApi?.show"
			target="createPosOrden"
			@close="$router.push('/ordenes')"
		/>
	</ModalAlert>
</template>

<script setup>
import { useCarrito } from '@/composables/useCarrito'
import { useOrdenes } from '@/composables/useOrdenes'
import { computed, ref } from 'vue'
import ModalBase from '../ModalBase.vue'
import BtnBack from '../buttons/BtnBack.vue'
import BtnNext from '../buttons/BtnNext.vue'
import BtnFull from '../buttons/BtnFull.vue'
import { useAuth } from '@/composables/useAuth'
import ModalAlert from '../ModalAlert.vue'
const { carritoOrden, limpiar } = useCarrito()
const { ordenar, actualizar, actionState, errorApi, ordenesArr } = useOrdenes()
const { userSucursal } = useAuth()

const imprimir = () => {
	if (!carritoOrden.value.estado) ordenar()
	if (carritoOrden.value.estado) actualizar()
}

const showMesas = ref(false)
const compararMesa = computed(() => (mesa) => {
	const mesas = [
		...new Set(
			ordenesArr.value
				.filter((orden) => orden.estado !== 'terminado')
				.map((orden) => orden.mesa)
		),
	]
	const exist = mesas.includes(mesa.toString())
	return exist
})
</script>

<style scoped>
.radio-buttons {
	display: flex;
	margin-bottom: 1rem;
	gap: 0.1rem;
}

.radio-button {
	position: relative;
	display: inline-block;
	cursor: pointer;
}

.radio-button input[type='radio'] {
	position: absolute;
	opacity: 0;
	cursor: pointer;
}

.radio-button .button-label {
	padding: 10px 20px;
	color: #0d6efd;
	background-color: #cfe2ff;
	transition: background-color 0.3s;
	display: block;
}
.button-label:hover {
	background-color: #0d6efd; /* Cambia el fondo cuando está seleccionado */
	color: #fff;
}

.radio-button input[type='radio']:checked + .button-label {
	background-color: #0d6efd; /* Cambia el fondo cuando está seleccionado */
	color: #fff; /* Cambia el color del texto cuando está seleccionado */
}
</style>
