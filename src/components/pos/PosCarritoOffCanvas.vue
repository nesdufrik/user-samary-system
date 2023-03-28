<template>
    <div
        class="offcanvas offcanvas-start"
        tabindex="-1"
        id="carritoPosOffCanvas"
        aria-labelledby="carritoPosOffCanvasLabel"
    >
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="carritoPosOffCanvasLabel">
                Carrito
            </h5>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
            ></button>
        </div>
        <div class="offcanvas-body">
            <PosCarrito />
            <PosCuenta />
        </div>
    </div>
</template>

<script setup>
import PosCarrito from './PosCarrito.vue'
import PosCuenta from './PosCuenta.vue'
</script>

<style scoped></style>
