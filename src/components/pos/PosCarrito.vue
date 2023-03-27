<template>
    <div
        class="rounded-3 h-100 bd-callout bd-callout-left bd-callout-secondary overflow-auto mb-0 p-3 enlace_action"
    >
        <!-- carrito vacio -->
        <div
            class="d-flex align-items-center justify-content-center h-100"
            v-if="carritoOrden.pedido == 0"
        >
            <div class="row justify-content-center text-center">
                <div class="img_container m-0 p-0">
                    <img src="../../assets/icons/pos.png" alt="" />
                </div>
                <span class="fs-3">Agregar items</span>
            </div>
        </div>
        <!-- carrito con items -->
        <div
            v-else
            class="tarjeta row border-bottom p-1"
            v-for="(item, index) in carritoOrden.pedido"
        >
            <div class="col-5 d-flex align-items-center">
                <span>{{ item.name }}</span>
            </div>
            <div
                class="col text-center d-flex justify-content-evenly align-items-center"
            >
                <button
                    class="btn text-danger"
                    v-if="item.cantidad == 1"
                    @click="quitar(index)"
                >
                    <span class="material-icons-round"> cancel </span>
                </button>
                <button class="btn" v-else @click="disminuir(index)">
                    <span class="material-icons-round">
                        do_not_disturb_on
                    </span>
                </button>
                <span class="fw-bold">{{ item.cantidad }}</span>
                <button class="btn fs-6" @click="aumentar(index)">
                    <span class="material-icons-round"> add_circle </span>
                </button>
            </div>
            <div class="col-2 d-flex flex-row g-0 align-items-center">
                <div>
                    <span class="fw-bold">{{
                        (item.importe = importe(item.precio, item.cantidad))
                    }}</span>
                </div>
            </div>
            <div id="contenedorBotonNotas">
                <button
                    role="button"
                    class="tarjeta__button"
                    data-bs-toggle="collapse"
                    :data-bs-target="'#flush-collapseOne' + index"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                >
                    <span
                        v-if="item.nota"
                        class="material-icons-round text-primary"
                    >
                        sticky_note_2
                    </span>
                    <span v-else class="material-icons-round text-secondary">
                        sticky_note_2
                    </span>
                </button>
            </div>
            <div
                :id="'flush-collapseOne' + index"
                class="accordion-collapse collapse"
            >
                <div class="form-floating mb-3 mt-2 mx-3">
                    <input
                        v-model="item.nota"
                        type="text"
                        class="form-control"
                        id="floatingInput"
                    />
                    <label for="floatingInput">Nota:</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCarrito } from '../../composables/useCarrito'

const { carritoOrden, aumentar, disminuir, quitar } = useCarrito()
const importe = (aItem, bItem) => {
    return parseFloat((aItem * bItem).toFixed(1))
}
</script>

<style scoped>
.img_container {
    width: 200px;
}

.img_container img {
    width: 100%;
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
    right: 0rem;
    top: 0rem;
}
</style>
