/* eslint-disable no-undef */
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
		path: '/printOrder',
		name: 'PrintOrder',
		meta: {
			title: 'Imprimir Orden',
			requiresAuth: true,
		},
		component: () => import('../pages/PrintOrder.vue'),
	},
	{
		path: '/printOrderToOrder',
		name: 'PrintOrderToOrder',
		meta: {
			title: 'Imprimir Orden',
			requiresAuth: true,
		},
		component: () => import('../pages/PrintOrderToOrder.vue'),
	},
	{
		path: '/',
		name: 'Inicio',
		meta: {
			requiresAuth: true,
			title: 'Sistema de control de ventas',
		},
		component: GeneralView,
		children: [
			{
				path: 'pos',
				name: 'Punto de venta',
				component: () => import('../pages/PointOfSale.vue'),
			},
			{
				path: 'ordenes',
				name: 'Administración de ordenes',
				component: () => import('../pages/Ordenes.vue'),
			},
			{
				path: 'reportes',
				name: 'Reporte de ventas',
				component: () => import('../pages/Reportes.vue'),
			},
			{
				path: ':(.*)',
				component: () => import('../pages/VoidView.vue'),
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

	// Verificar si la ruta requiere autenticación
	if (to.matched.some((record) => record.meta.requiresAuth)) {
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
			}
			store.userSucursal = verify.data.sucursal
		}
	}
	next()
})

export default router
