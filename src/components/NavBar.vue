<template>
    <header
        class="navbar navbar-expand-lg bd-navbar sticky-top bg-dark navbar-dark"
    >
        <nav
            class="container-xl bd-gutter flex-wrap flex-lg-nowrap"
            aria-label="Main navigation"
        >
            <div class="d-lg-none" style="width: 1.5rem">
                <div class="d-flex">
                    <button
                        class="navbar-toggler d-flex d-lg-none order-3 p-2 position-relative"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#carritoPosOffCanvas"
                        aria-controls="bdNavbar"
                        aria-label="Toggle navigation"
                    >
                        <span class="material-icons-round">
                            shopping_cart
                        </span>
                        <span
                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                            v-if="carritoOrden.pedido.length !== 0"
                        >
                            {{ carritoOrden.pedido.length }}
                        </span>
                    </button>
                </div>
            </div>
            <RouterLink
                :class="[
                    'p-lg-3 my-2 my-lg-0 me-lg-auto text-white text-decoration-none',
                    cajaActual.active ? '' : 'noactive',
                ]"
                :to="`/`"
                aria-label="Home"
            >
                <img src="../assets/logo-icon.png" alt="logo" />
            </RouterLink>

            <div class="d-flex">
                <button
                    class="navbar-toggler d-flex d-lg-none order-3 p-2"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#navBarPos"
                    aria-controls="navBarPos"
                    aria-label="Toggle navigation"
                >
                    <span class="material-icons-round"> menu </span>
                </button>
            </div>

            <div
                class="offcanvas-lg offcanvas-end flex-grow-1 bg-dark"
                tabindex="-1"
                id="navBarPos"
                aria-labelledby="navBarPosOffcanvasLabel"
                data-bs-scroll="true"
            >
                <div class="offcanvas-header px-4 pb-0">
                    <h5
                        class="offcanvas-title text-white"
                        id="navBarPosOffcanvasLabel"
                    >
                        Samary
                    </h5>
                    <button
                        type="button"
                        class="btn-close btn-close-white"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                        data-bs-target="#navBarPos"
                    ></button>
                </div>

                <div class="offcanvas-body p-4 pt-0 p-lg-0">
                    <hr class="d-lg-none text-white-50" />

                    <ul class="navbar-nav flex-row flex-wrap ms-md-auto">
                        <li
                            v-if="cajaActual.active"
                            class="nav-item col-6 col-lg-auto text-center"
                            v-for="elem in itemsNavBar"
                        >
                            <RouterLink
                                :to="`${elem.link}`"
                                class="nav-link py-2 px-0 px-lg-2"
                            >
                                <span class="material-icons-round">
                                    {{ elem.icon }}
                                </span>
                                <br />
                                {{ elem.title }}
                            </RouterLink>
                        </li>
                    </ul>
                    <hr class="text-white-50" />
                    <div
                        class="d-flex flex-row flex-wrap align-items-center py-2 px-5 px-lg-5"
                    >
                        <div class="flex-shrink-0 dropdown text-center">
                            <a
                                href="#"
                                class="d-block link-light text-decoration-none dropdown-toggle mb-lg-0 mb-2"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    :src="userData.avatar"
                                    alt="avatar"
                                    width="55"
                                    height="55"
                                    :class="[
                                        'rounded-circle',
                                        cajaActual.active ? '' : 'noactive',
                                    ]"
                                />
                            </a>
                            <span class="d-lg-none text-muted">{{
                                userData.name
                            }}</span>
                            <ul
                                class="dropdown-menu text-small shadow dropdown-menu-lg-end"
                            >
                                <li>
                                    <a
                                        href="#"
                                        class="dropdown-item fw-bold text-secondary"
                                    >
                                        <span
                                            class="material-icons-round align-middle"
                                            >settings</span
                                        >
                                        Configuraciones</a
                                    >
                                </li>
                                <li><hr class="dropdown-divider" /></li>
                                <li>
                                    <a
                                        href="#"
                                        class="dropdown-item fw-bold text-danger"
                                        @click="logout"
                                    >
                                        <span
                                            class="material-icons-round align-middle"
                                            >logout</span
                                        >
                                        Cerrar sesión</a
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <PosCarritoOffCanvas />
</template>

<script setup>
import PosCarritoOffCanvas from './pos/PosCarritoOffCanvas.vue'
import { RouterLink } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useNavBar } from '../composables/useNavBar'
import { useCarrito } from '../composables/useCarrito'
import { useCaja } from '../composables/useCaja'

const { userData, logout } = useAuth()
const { itemsNavBar } = useNavBar()
const { carritoOrden } = useCarrito()
const { cajaActual } = useCaja()
</script>

<style scoped>
.noactive {
    filter: grayscale(100%);
}
</style>
