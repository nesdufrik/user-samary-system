<template>
	<ModalBase id-modal="mesaManage" titulo="Administrar orden">
		<CheckOrden
			:orden-selected="ordenSelected"
			:action-state="actionState"
			@check-orden="checkOrdenUpdate"
		/>
		<div class="row row-cols-3 g-3 mt-2">
			<div>
				<BtnOrdenAction
					name="Agregar"
					icon="add_circle"
					tipo="success"
					@action-btn-orden="$emit('btnManage', ordenSelected._id)"
				/>
			</div>
			<div>
				<BtnOrdenAction
					name="Imprimir"
					icon="print"
					tipo="primary"
					@action-btn-orden="$emit('btnPrint', ordenSelected._id)"
				/>
			</div>
			<div>
				<BtnOrdenAction
					name="Cancelar"
					icon="delete"
					:tipo="ordenTipo"
					@action-btn-orden="
						ordenTipo === 'danger' ? $emit('btnDelete', ordenSelected._id) : ''
					"
				/>
			</div>
		</div>
		<Transition name="fade" mode="out-in">
			<PayOrden v-if="ordenSelected.estado === 'finalizado'" />
		</Transition>
		<template #footer>
			<template v-if="ordenSelected.estado === 'pendiente'">
				<BtnFull @close="cleanForm" />
			</template>
			<template v-else>
				<BtnBack @action-back="cleanForm" />
				<BtnNext name="Pagar" target="msgMesa" @action-next="pagarOrden" />
			</template>
		</template>
	</ModalBase>
	<ModalAlert id-modal="msgMesa" :action="actionState" :error-api="errorApi">
		<BtnFull
			:action="actionState"
			:show="errorApi?.show"
			target="mesaManage"
			@close="cleanForm"
		/>
	</ModalAlert>
</template>

<script setup>
defineEmits(['btnDelete', 'btnPrint', 'btnManage'])
import ModalBase from '../ModalBase.vue'
import CheckOrden from './CheckOrden.vue'
import PayOrden from './PayOrden.vue'
import BtnFull from '@/components/buttons/BtnFull.vue'
import BtnBack from '@/components/buttons/BtnBack.vue'
import BtnNext from '@/components/buttons/BtnNext.vue'
import BtnOrdenAction from '@/components/buttons/BtnOrdenAction.vue'
import { useOrdenes } from '../../composables/useOrdenes'
import { computed } from 'vue'
import ModalAlert from '../ModalAlert.vue'

const {
	ordenSelected,
	actionState,
	errorApi,
	checkOrdenUpdate,
	pagarOrden,
	cleanForm,
} = useOrdenes()

const ordenTipo = computed(() => {
	if (ordenSelected.value.pedido) {
		const array = ordenSelected.value.pedido
		const cantidad = array.reduce((acc, el) => acc + (el.cantidad || 0), 0)
		const pendiente = array.reduce((acc, el) => acc + (el.pendiente || 0), 0)
		return cantidad !== pendiente ? 'secondary' : 'danger'
	}
	return 'danger'
})
</script>
