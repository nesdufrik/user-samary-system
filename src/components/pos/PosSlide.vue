<template>
    <Carousel
        :settings="settings"
        :breakpoints="breakpoints"
        :wrap-around="true"
    >
        <template v-for="(slide, index) in etiquetasArr" :key="index">
            <Slide>
                <div
                    class="carousel__item text-center fw-bold p-0"
                    @click="filtrar(slide)"
                >
                    {{ slide }}
                </div>
            </Slide>
        </template>

        <template #addons> </template>
    </Carousel>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { useProductos } from '../../composables/useProductos'

const { etiquetasArr, filtrar } = useProductos()

const settings = {
    itemsToShow: 2.6,
    snapAlign: 'start',
}

const breakpoints = {
    376: {
        itemsToShow: 2.8,
        snapAlign: 'start',
    },
    410: {
        itemsToShow: 2.9,
        snapAlign: 'start',
    },
    539: {
        itemsToShow: 3.9,
        snapAlign: 'start',
    },
    768: {
        itemsToShow: 5.6,
        snapAlign: 'start',
    },
    819: {
        itemsToShow: 6,
        snapAlign: 'start',
    },
    911: {
        itemsToShow: 6.6,
        snapAlign: 'start',
    },
    1024: {
        itemsToShow: 3.7,
        snapAlign: 'start',
    },
    1150: {
        itemsToShow: 4.3,
        snapAlign: 'start',
    },
    1280: {
        itemsToShow: 4.8,
        snapAlign: 'start',
    },
    1360: {
        itemsToShow: 4.9,
        snapAlign: 'start',
    },
    1450: {
        itemsToShow: 6.5,
        snapAlign: 'start',
    },
    1660: {
        itemsToShow: 6.5,
        snapAlign: 'start',
    },
}
</script>

<style scoped>
.carousel__item {
    background-color: #f8f9fa;
    color: #495057;
    min-height: 100px;
    width: 125px;
    font-size: 20px;
    border-radius: 0.375rem;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
}
</style>
