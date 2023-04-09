import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { oauthJwt } from '../helpers/helpAuth'
import { useAuthStore } from '../stores/authStore'

export const useAuth = () => {
    const router = useRouter()
    const authStore = useAuthStore()
    const { islogIn, appLoading, userData } = storeToRefs(authStore)

    const dirUrl = import.meta.env.VITE_REDIRECT_URL

    const oauthLogin = async token => {
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
            sucursal: oauthResponse.data.sucursal,
        }
        islogIn.value = true
        router.push('/')
        return
    }

    const logout = () => {
        islogIn.value = false
        localStorage.removeItem('token')
        const dirUrl = import.meta.env.VITE_REDIRECT_URL
        window.location.href = dirUrl
    }

    return {
        //! propiedades
        islogIn,
        appLoading,
        userData,

        //! computadas

        //! metodos
        logout,
        oauthLogin,
    }
}
