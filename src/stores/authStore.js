import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            islogIn: false,
            appLoading: false,
            userData: {
                name: '',
                avatar: '',
            },
        }
    },
    actions: {
        loginAuth() {
            this.islogIn = true
            this.appLoading = false
            this.router.push(`/`)
        },
        async verifyJwt() {
            this.appLoading = true
            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${localStorage.getItem('token')}`
            return await axios
                .get('/auth/jwt')
                .then(res => res.data)
                .catch(err => {
                    if (err.response) return err.response.data
                    return {
                        success: false,
                        data: {
                            message:
                                'Lo siento, parece que hemos perdido temporalmente la conexión con nuestra API. Estamos trabajando para solucionar el problema lo antes posible. Por favor, inténtelo de nuevo más tarde. Agradecemos su comprensión y paciencia.',
                        },
                    }
                })
        },
    },
})
