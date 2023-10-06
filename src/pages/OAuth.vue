<template>
	<div></div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const route = useRoute()
const { oauthLogin } = useAuth()
oauthLogin(route.query.token)
</script>
