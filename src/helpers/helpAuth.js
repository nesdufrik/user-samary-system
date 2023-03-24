import axios from 'axios'

export const oauthJwt = async token => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    return await axios
        .get('/auth/oauth/jwt')
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
}
