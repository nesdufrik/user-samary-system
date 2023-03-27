<template>
    <div class="d-flex flex-column h-100">
        <div class="flex-shrink-0 mb-3">
            <NavBar />
            <div class="container-xl">
                <RouterView />
            </div>
        </div>
        <footer class="footer mt-auto py-3"></footer>
    </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
import { useNavBar } from '../composables/useNavBar'

const { contentNavBar } = useNavBar()
contentNavBar()
</script>

<style scoped></style>
