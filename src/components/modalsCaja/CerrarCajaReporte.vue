<template>
	<ModalBase id-modal="cajaModal" titulo="¿Esta seguro de cerrar?">
		<p class="fw-bold">
			Una vez que cierra la caja
			<span class="text-danger">no se podra abrir nuevamente.</span>
			Asegúrate de que todas las ordenes hayan sido finalizadas antes de
			continuar.
		</p>
		<template #footer>
			<BtnBack name="Cancelar" />
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
import { useRouter } from 'vue-router'
import { useCaja } from '../../composables/useCaja'
import ModalBase from '../ModalBase.vue'
import BtnBack from '../buttons/BtnBack.vue'
import BtnNext from '../buttons/BtnNext.vue'
import ModalAlert from '../ModalAlert.vue'
import BtnFull from '../buttons/BtnFull.vue'

const { actionState, errorApi, cerrarCaja } = useCaja()
const router = useRouter()

const closeRedirect = () => {
	router.push({ path: '/' })
}
</script>
