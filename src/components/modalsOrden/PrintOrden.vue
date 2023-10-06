<template>
	<!-- Realizar orden / Imprimir nota -->
	<div
		class="modal fade"
		id="printOrdenModal"
		tabindex="-1"
		data-bs-backdrop="static"
		data-bs-keyboard="false"
		role="dialog"
		aria-labelledby="createSucursalLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-body text-center" id="ordenDataToPrint">
					<h2 class="modal-title fw-bold mb-4" id="exampleModalLabel">Orden</h2>
					<div id="ordenDataClient" class="row d-flex flex-column px-4 g-3">
						<div class="text-start d-flex flex-column fst-italic">
							<div class="mb-3">
								<div class="fs-5" v-if="ordenSelected.cliente.name">
									<span>Cliente: </span>
									<span class="fw-bold">{{ ordenSelected.cliente.name }}</span>
								</div>
								<div class="fs-5">
									<span>Mesa: </span>
									<span class="fw-bold">{{ ordenSelected.mesa }}</span>
								</div>
								<div v-if="ordenSelected.cliente.nota">
									<span>Habitación: </span>
									<span class="fw-bold">
										{{ ordenSelected.cliente.nota }}
									</span>
								</div>
							</div>
							<div id="ordenDataPedidosItems">
								<template v-for="(item, index) in ordenSelected.pedido">
									<!-- item pendiente -->
									<div class="d-flex mb-3">
										<span class="me-3">{{ item.cantidad }}</span>
										<span>{{ item.name }}</span>
										<span class="ms-auto fw-bold text-dark">{{
											item.importe
										}}</span>
									</div>
								</template>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer p-0">
					<button
						type="button"
						class="btn-modal btn-modal-left btn-modal-secondary col fw-bold"
						data-bs-dismiss="modal"
					>
						Cerrar
					</button>
					<button
						type="button"
						class="btn-modal btn-modal-right btn-modal-primary col fw-bold"
						@click="printPage(ordenSelected._id, cajaActual._id)"
					>
						<span>Imprimir Orden</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useOrdenes } from '../../composables/useOrdenes'
import { useCaja } from '../../composables/useCaja'
const { ordenSelected, printPage } = useOrdenes()
const { cajaActual } = useCaja()
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
