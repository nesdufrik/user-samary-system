import { createRouter, createWebHistory } from 'vue-router'

import pinia from '../stores'
import { useAuthStore } from '../stores/authStore'
import GeneralView from '../pages/GenearlView.vue'
import OAuth from '../pages/OAuth.vue'

const routes = [
    {
        path: '/oauth',
        name: 'OAuth',
        meta: {
            title: 'OAuth login',
            requiresAuth: false,
        },
        component: OAuth,
    },
    {
        path: '/',
        name: 'Inicio',
        meta: {
            requiresAuth: true,
        },
        component: GeneralView,
        children: [
            {
                path: '/home',
                name: 'Home',
                meta: {
                    title: 'Portal de inicio',
                },
                component: () => import('../pages/Home.vue'),
            },
            {
                path: '/pos',
                name: 'POS',
                meta: {
                    title: 'Punto de venta',
                },
                component: () => import('../pages/PointOfSale.vue'),
            },
            {
                path: '/ordenes',
                name: 'Ordenes',
                meta: {
                    title: 'Ordenes en curso',
                },
                component: () => import('../pages/Ordenes.vue'),
            },
            {
                path: 'reportes',
                name: 'Reportes',
                meta: {
                    title: 'Reporte del día',
                },
                component: () => import('../pages/Reportes.vue'),
            },
        ],
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: () => import('../pages/Page404.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from, next) => {
    // Cambio de titulo en el documento
    if (to.meta.title) {
        document.title = to.meta.title
    }

    // Redireccionamiento de rutas especificas
    if (to.path === '/') {
        next({ path: '/home' })
        return
    }

    // Verificar si la ruta requiere autenticación
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const token = localStorage.getItem('token')
        const store = useAuthStore(pinia)

        if (!token) {
            window.location.href = import.meta.env.VITE_REDIRECT_URL
            return
        }
        if (!store.islogIn) {
            const verify = await store.verifyJwt()
            store.appLoading = false
            if (!verify.success) {
                window.location.href = `${
                    import.meta.env.VITE_REDIRECT_URL
                }?show=true&message=${verify.data.message}`
                return
            }
            store.islogIn = true
            store.userData = {
                name: verify.data.fullName,
                avatar: verify.data.avatar,
                sucursal: verify.data.sucursal,
            }
        }
    }
    next()
})

export default router
