<template>
	<ModalBase id-modal="cajaModal" titulo="¡Atención!">
		<p class="fw-bold">
			Ya <span class="text-danger">pasaron mas de 8 horas</span> desde que abrio
			su caja. ¿Esta seguro de continuar con esta caja?.
		</p>
		<template #footer>
			<BtnBack name="Continuar" />
			<BtnNext
				@action-next="cerrarCaja"
				name="Cerrar Caja"
				color="danger"
				target="msgCaja"
			/>
		</template>
	</ModalBase>
	<ModalAlert id-modal="msgCaja" :action="actionState" :error-api="errorApi">
		<BtnFull
			:action="actionState"
			:show="errorApi?.show"
			target="cajaModal"
			@close="closeRedirect"
		/>
	</ModalAlert>
</template>

<script setup>
import { useCaja } from '../../composables/useCaja'
import ModalBase from '../ModalBase.vue'
import BtnBack from '../buttons/BtnBack.vue'
import BtnNext from '../buttons/BtnNext.vue'
import ModalAlert from '../ModalAlert.vue'
import BtnFull from '../buttons/BtnFull.vue'

const { actionState, errorApi, cerrarCaja } = useCaja()

const closeRedirect = () => {
	console.log('redirect')
	window.location.reload()
}
</script>
