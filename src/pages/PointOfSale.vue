<template>
	<LayoutPOS>
		<template #default>
			<div class="row">
				<nav
					id="sidebarMenu"
					class="col-6 col-xl-4 col-xxl-3 sidebar d-md-block collapse"
				>
					<div class="sidebar-sticky">
						<PosCarrito />
						<PosCuenta />
					</div>
				</nav>
				<div class="col-12 col-md-6 col-xl-7 ms-sm-auto p-3">
					<div
						id="posItemsNoloaded"
						v-if="productosArr.length === 0"
						class="d-flex flex-column justify-content-center align-items-center p-5 m-5"
					>
						<div class="spinner-border" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
						<span class="fw-bold">Cargando...</span>
					</div>
					<div id="posItemsLoaded" class="d-flex flex-column gap-3" v-else>
						<div class="row">
							<div><PosSlide /></div>
						</div>
						<input
							name="searchProduct"
							type="text"
							class="form-control form-control-lg bg-light"
							placeholder="Buscar por nombre..."
							v-model="query"
							@input="buscar(query)"
						/>
						<div
							v-if="productosFiltered.length === 0"
							class="d-flex flex-column justify-content-center align-items-center m-5 p-5"
						>
							<img
								src="../assets/icons/choice.png"
								style="width: 100px"
								alt=""
							/>
							<span class="fw-bold text-center mt-3" style="width: 300px"
								>No selecciono una categoria o la categoria seleccionada esta
								vacia</span
							>
						</div>
						<div class="row row-cols-1 row-cols-xxl-2 g-2">
							<PosItem
								v-for="item in productosFiltered"
								:key="item._id"
								:nombreProducto="item.name"
								:precioProducto="item.precio"
								:imageProducto="item.image"
								:itemObj="item"
							/>
						</div>
					</div>
				</div>
			</div>
		</template>
		<template #titulo>
			<div class="d-flex align-items-center gap-3 text-light">
				<span class="material-icons-round fs-1">local_grocery_store</span>
				<div class="d-flex flex-column">
					<span class="fw-bold">{{ montoTotal }}</span>
					<span>Cant. {{ cantidadTotal }}</span>
				</div>
			</div>
		</template>
		<template #lista>
			<PosCarritoMobile />
		</template>
	</LayoutPOS>

	<!-- modal para crear la orden -->
	<Teleport to="#modal">
		<AddOrdenModal />
		<VisualizarImagenModal />
	</Teleport>
</template>

<script setup>
import LayoutPOS from '@/components/LayoutPOS.vue'
import VisualizarImagenModal from '../components/modalsPOS/VisualizarImagen.vue'
import PosSlide from '../components/pos/PosSlide.vue'
import PosCarrito from '../components/pos/PosCarrito.vue'
import PosCuenta from '../components/pos/PosCuenta.vue'
import PosItem from '../components/pos/PosItem.vue'
import AddOrdenModal from '../components/modalsOrden/AddOrden.vue'
import { useProductos } from '../composables/useProductos'
import PosCarritoMobile from '@/components/pos/PosCarritoMobile.vue'
import { useCarrito } from '@/composables/useCarrito'
import { computed } from 'vue'
import { useOrdenes } from '@/composables/useOrdenes'

const { productosArr, productosFiltered, query, loadPOS, buscar } =
	useProductos()
const { subTotalPrecio, cuponDesc, carritoOrden } = useCarrito()
const { listOrdenes } = useOrdenes()

const montoTotal = computed(() => {
	carritoOrden.value.total = subTotalPrecio.value - cuponDesc.value

	return carritoOrden.value.total.toLocaleString('es-BO', {
		style: 'currency',
		currency: 'BOB',
	})
})

const cantidadTotal = computed(() => {
	const pedidos = carritoOrden.value.pedido.reduce(
		(acc, el) => acc + el.pendiente,
		0
	)
	return pedidos
})

await loadPOS()
await listOrdenes()
</script>

<style scoped>
.sidebar {
	position: fixed;
}

.sidebar-sticky {
	height: 90vh;
	overflow-x: hidden;
	overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
</style>
