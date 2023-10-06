<template>
	<!-- #Section Pendientes -->
	<BoxTitle titulo="Reporte del día" v-if="actionState" />
	<BoxTitle titulo="Reporte del día" v-else>
		<button
			class="text-danger d-flex align-items-center bg-light border-0 gap-1"
			data-bs-target="#cajaModal"
			data-bs-toggle="modal"
		>
			<span class="material-icons-round">archive</span>
			<span class="fw-bold"><small>Cerrar caja</small></span>
		</button>
		<button
			class="text-secondary d-flex align-items-center bg-light border-0 gap-1"
			@click="imprimir"
		>
			<span class="material-icons-round">print</span>
			<span class="fw-bold"><small>Imprimir reporte</small></span>
		</button>
	</BoxTitle>

	<!-- ##Table Reporte Ordenes Realizadas -->
	<div id="reporteDiaParaImprimir" class="bg-light rounded-3 p-2">
		<div class="p-3">
			<div class="text-start fs-5 fw-bold">
				<span>Fecha: </span
				><span class="text-secondary fw-normal fs-6">{{
					dateFormated(cajaSelected.createdAt)
				}}</span>
			</div>
			<div class="mt-4 table-responsive">
				<table class="table table-hover">
					<thead>
						<tr>
							<th>Nº</th>
							<th>Método</th>
							<th>Propina</th>
							<th>Subtotal</th>
							<th>Desc.</th>
							<th class="text-end">Total</th>
						</tr>
					</thead>
					<tbody>
						<template v-for="(orden, index) in cajaOrdenesArr" :key="orden._id">
							<tr>
								<td class="align-middle">
									{{ index + 1 }}
								</td>
								<td class="align-middle">
									{{ orden.payMetodo }} <br />
									<small class="text-secondary">{{
										dateFormated(orden.updatedAt)
									}}</small>
								</td>
								<td class="align-middle">
									<span class="text-secondary">{{
										currencyFormat(orden.propina)
									}}</span>
								</td>
								<td class="align-middle">
									<span class="text-secondary">{{
										currencyFormat(orden.subtotal)
									}}</span>
								</td>
								<td class="align-middle">
									<span class="text-secondary">{{
										currencyFormat(orden.desc)
									}}</span>
								</td>
								<td class="align-middle fw-bold text-end">
									{{ currencyFormat(orden.total) }}
								</td>
							</tr>
						</template>
						<tr class="bg-success bg-opacity-25">
							<td colspan="5" class="align-middle fs-5 fw-bold">TOTAL</td>
							<td class="align-middle fs-5 fw-bold text-end">
								{{ currencyFormat(totalCaja) }}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="mt-4 table-responsive-sm col-md-4">
				<table class="table table-hover">
					<thead>
						<tr>
							<th class="py-0">Detalle</th>
							<th class="text-end py-0">Total</th>
						</tr>
					</thead>
					<tbody>
						<template v-for="metodo in arrayTotales">
							<tr>
								<td class="py-0 text-success">
									{{ metodo.payMetodo }}
								</td>
								<td class="text-end py-0">
									{{ currencyFormat(metodo.total) }}
								</td>
							</tr>
						</template>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<Teleport to="#modal">
		<CerrarCajaReporte />
	</Teleport>
</template>

<script setup>
import BoxTitle from '@/components/BoxTitle.vue'
import CerrarCajaReporte from '@/components/modalsCaja/CerrarCajaReporte.vue'
import { useCaja } from '../composables/useCaja'
import { getCurrentInstance } from 'vue'

const {
	cajaSelected,
	dateFormated,
	cajaOrdenesArr,
	arrayTotales,
	totalCaja,
	actionState,
	loadOrdenesOfCaja,
} = useCaja()

const instance = getCurrentInstance()
const imprimir = () => {
	instance.appContext.config.globalProperties.$htmlToPaper(
		'reporteDiaParaImprimir',
		{
			name: '_blank',
			specs: ['fullscreen=no', 'titlebar=no', 'scrollbars=no'],
			styles: [
				'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
			],
		}
	)
}

function currencyFormat(mount) {
	return mount.toLocaleString('es-BO', {
		style: 'currency',
		currency: 'BOB',
	})
}

await loadOrdenesOfCaja(cajaSelected.value._id)
</script>
