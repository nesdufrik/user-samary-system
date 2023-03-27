<template>
    <div
        class="col enlace_action"
        role="button"
        @click="handleClick($event, itemObj)"
        @click.shift="handleShiftClick($event, itemObj)"
    >
        <div
            class="rounded-2 bd-callout bd-callout-left bd-callout-secondary d-flex justify-content-between fw-bold m-0"
        >
            <div class="p-2 fs-5 product-name">
                <div>{{ nombreProducto }}</div>
            </div>
            <div class="product-price">
                <div class="price-circle fs-5">
                    <small>Bs.&nbsp;</small>{{ precioProducto }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCarrito } from '../../composables/useCarrito'

const props = defineProps({
    nombreProducto: String,
    precioProducto: Number,
    itemObj: Object,
})

const { agregarCarrito, agregarCarritoNota } = useCarrito()

const handleClick = (event, item) => {
    if (event.shiftKey) {
        return
    }

    console.log('Clicked!')
    agregarCarrito(item)
}

const handleShiftClick = (event, item) => {
    if (!event.shiftKey) {
        return
    }

    console.log('Shift clicked!')
    agregarCarritoNota(item)
}
</script>

<style scoped>
.product-name {
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.product-price {
    background-color: #d1e7dd;
    border-top-right-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
    color: #146c43;
    display: flex;
    align-items: center;
    justify-content: center;
}

.enlace_action:hover .product-price {
    background-color: #34a975;
    color: #f8f9fa;
}
.price-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
}

.bd-callout-left {
    border-left: 0.25rem solid var(--bs-success-border-subtle);
}
</style>
