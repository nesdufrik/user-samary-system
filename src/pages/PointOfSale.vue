<template>
    <div class="row">
        <nav
            id="sidebarMenu"
            class="col-md-7 col-lg-6 col-xl-5 col-xxl-4 d-lg-block sidebar collapse"
        >
            <div class="sidebar-sticky">
                <PosCarrito />
                <PosCuenta />
            </div>
        </nav>
        <div class="col-md-12 col-lg-6 col-xl-7 col-xxl-8 ms-sm-auto p-3">
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
            <div id="posItemsLoaded" v-else>
                <div class="row">
                    <div><PosSlide /></div>
                </div>
                <hr class="text-dark" />
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
                        >No selecciono una categoria o la categoria seleccionada
                        esta vacia</span
                    >
                </div>
                <div class="row row-cols-1 row-cols-xxl-2 g-3">
                    <PosItem
                        v-for="item in productosFiltered"
                        :key="item._id"
                        :nombreProducto="item.name"
                        :precioProducto="item.precio"
                        :itemObj="item"
                    />
                </div>
            </div>
        </div>
    </div>

    <!-- modal para crear la orden -->
    <AddOrdenModal />
</template>

<script setup>
import PosSlide from '../components/pos/PosSlide.vue'
import PosCarrito from '../components/pos/PosCarrito.vue'
import PosCuenta from '../components/pos/PosCuenta.vue'
import PosItem from '../components/pos/PosItem.vue'
import AddOrdenModal from '../components/modalsPOS/AddOrden.vue'
import { useProductos } from '../composables/useProductos'

const { productosArr, productosFiltered, loadPOS } = useProductos()

loadPOS()
</script>

<style scoped>
.sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100; /* Behind the navbar */
    padding: 5.27rem 0 0 1rem; /* Height of navbar */
}

.sidebar-sticky {
    height: calc(100vh - 6.2rem);
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
