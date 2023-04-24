<template>
    <RouterView v-slot="{ Component }" v-if="!appLoading">
        <template v-if="Component">
            <Suspense>
                <!-- main content -->

                <component :is="Component"></component>

                <!-- loading state -->
                <template #fallback>
                    <div class="d-flex flex-column text-center vh-100">
                        <main class="w-100 m-auto flex-shrink-0 p-5">
                            <h1 class="display-3 fw-bold text-success">
                                Cargando
                            </h1>
                            <div
                                class="spinner-grow text-success"
                                style="width: 3rem; height: 3rem"
                                role="status"
                            ></div>
                        </main>
                    </div>
                </template>
            </Suspense>
        </template>
    </RouterView>
    <div class="d-flex flex-column text-center vh-100" v-else>
        <main class="w-100 m-auto flex-shrink-0 p-5">
            <h1 class="display-3 fw-bold text-success">Cargando</h1>
            <div
                class="spinner-grow text-success"
                style="width: 3rem; height: 3rem"
                role="status"
            ></div>
        </main>
    </div>
</template>

<script setup>
import { useAuth } from './composables/useAuth'

const { appLoading } = useAuth()
</script>

<style scoped></style>
