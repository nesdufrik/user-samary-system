<template>
    <Carousel
        :settings="settings"
        :breakpoints="breakpoints"
        :wrap-around="true"
    >
        <template v-for="(slide, index) in etiquetasArr" :key="index">
            <Slide>
                <!-- <div
                    class="carousel__item bg-light border text-center"
                    @click="select(slide)"
                > -->
                <div class="carousel__item bg-light border text-center">
                    <strong>{{ slide }}</strong>
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

const { etiquetasArr } = useProductos()

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
    min-height: 125px;
    width: 125px;
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
}
</style>
