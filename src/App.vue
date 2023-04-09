<template>
    <RouterView v-slot="{ Component }">
        <template v-if="Component">
            <Transition mode="out-in">
                <KeepAlive>
                    <Suspense>
                        <!-- main content -->
                        <div class="vh-100">
                            <component :is="Component"></component>
                        </div>

                        <!-- loading state -->
                        <template #fallback>
                            <div class="vh-100">
                                <div
                                    class="d-flex flex-column text-center h-100"
                                >
                                    <main
                                        class="w-100 m-auto flex-shrink-0 p-5"
                                    >
                                        <h1
                                            class="display-3 fw-bold text-success"
                                        >
                                            Cargando
                                        </h1>
                                        <div
                                            class="spinner-grow text-success"
                                            style="width: 3rem; height: 3rem"
                                            role="status"
                                        ></div>
                                    </main>
                                </div>
                            </div>
                        </template>
                    </Suspense>
                </KeepAlive>
            </Transition>
        </template>
    </RouterView>
</template>

<script setup>
// import { useAuth } from './composables/useAuth'
// const { appLoading } = useAuth()
</script>

<style lang="scss" scoped></style>
