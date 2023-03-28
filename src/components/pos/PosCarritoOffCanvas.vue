<template>
    <div
        class="offcanvas offcanvas-start menu-cart"
        tabindex="-1"
        id="carritoPosOffCanvas"
        aria-labelledby="carritoPosOffCanvasLabel"
    >
        <div class="p-0 mb-0">
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
            ></button>
        </div>
        <div class="sidebar-sticky">
            <PosCarrito />
            <PosCuenta />
        </div>
    </div>
</template>

<script setup>
import PosCarrito from './PosCarrito.vue'
import PosCuenta from './PosCuenta.vue'
</script>

<style scoped>
.sidebar-sticky {
    height: calc(100vh - 1.8rem);
    padding: 0.2rem;
    display: flex;
    flex-direction: column;
}

.menu-cart {
    background: #e2e2e2;
}
</style>
