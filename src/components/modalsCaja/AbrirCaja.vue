<template>
	<ModalBase id-modal="cajaModal" titulo="¿Desea abrir una caja?">
		<p class="fw-bold">
			No tiene una caja abierta, es
			<span class="text-primary">necesario abrir una caja</span> para poder
			registrar las ordenes.
		</p>
		<template #footer>
			<BtnBack name="Cerrar Sesión" @action-back="logout" />
			<BtnNext name="Abrir Caja" target="msgCaja" @action-next="abrirCaja" />
		</template>
	</ModalBase>
	<ModalAlert id-modal="msgCaja" :action="actionState" :error-api="errorApi">
		<BtnFull :action="actionState" :show="errorApi?.show" target="cajaModal" />
	</ModalAlert>
</template>

<script setup>
import { useCaja } from '@/composables/useCaja'
import { useAuth } from '@/composables/useAuth'
import ModalBase from '../ModalBase.vue'
import BtnBack from '../buttons/BtnBack.vue'
import BtnNext from '../buttons/BtnNext.vue'
import ModalAlert from '../ModalAlert.vue'
import BtnFull from '../buttons/BtnFull.vue'

const { actionState, errorApi, abrirCaja } = useCaja()
const { logout } = useAuth()
</script>
