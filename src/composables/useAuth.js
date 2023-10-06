/* eslint-disable no-undef */
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { checkJwt, oauthJwt } from '../helpers/helpAuth'
import { useAuthStore } from '../stores/authStore'

export const useAuth = () => {
	const router = useRouter()
	const authStore = useAuthStore()
	const { islogIn, appLoading, userData, userSucursal } = storeToRefs(authStore)

	const dirUrl = import.meta.env.VITE_REDIRECT_URL

	const oauthLogin = async (token) => {
		if (!token) {
			window.location.href = dirUrl
			return
		}
		const oauthResponse = await oauthJwt(token)

		if (!oauthResponse.success) {
			window.location.href = `${dirUrl}?show=true&message=${oauthResponse.data.message}`
			return
		}

		localStorage.setItem('token', token)
		userData.value = {
			name: oauthResponse.data.fullName,
			avatar: oauthResponse.data.avatar,
		}
		userSucursal.value = oauthResponse.data.sucursal
		islogIn.value = true
		router.push('/')
	}

	const logout = () => {
		islogIn.value = false
		localStorage.clear()
		const dirUrl = import.meta.env.VITE_REDIRECT_URL
		window.location.href = dirUrl
	}

	const verify = async () => {
		const res = await checkJwt(localStorage.getItem('token'))
		if (!res.success) {
			window.location.href = `${
				import.meta.env.VITE_REDIRECT_URL
			}?show=true&message=${res.data.message}`
			return
		}
		islogIn.value = true
		userData.value = {
			name: res.data.fullName,
			avatar: res.data.avatar,
		}
		userSucursal.value = res.data.sucursal
	}

	return {
		//! propiedades
		islogIn,
		appLoading,
		userData,
		userSucursal,

		//! computadas

		//! metodos
		logout,
		oauthLogin,
		verify,
	}
}
