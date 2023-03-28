<template>
    <div
        class="offcanvas offcanvas-start menu-cart"
        tabindex="-1"
        id="carritoPosOffCanvas"
        aria-labelledby="carritoPosOffCanvasLabel"
    >
        <div class="sidebar-sticky tarjeta">
            <PosCarrito />
            <PosCuenta />
            <button
                type="button"
                class="tarjeta__button material-icons-round"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
            >
                clear
            </button>
        </div>
    </div>
</template>

<script setup>
import PosCarrito from './PosCarrito.vue'
import PosCuenta from './PosCuenta.vue'
</script>

<style scoped>
.sidebar-sticky {
    height: calc(100vh - 0.2rem);
    padding: 0.2rem;
    display: flex;
    flex-direction: column;
}

.menu-cart {
    background: #e2e2e2;
}

.tarjeta {
    position: relative;
}

.tarjeta__button {
    user-select: none;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.7rem;
    position: absolute;
    right: -0.3rem;
    top: -0.2rem;
}
</style>
