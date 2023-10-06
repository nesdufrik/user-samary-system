<template>
	<header
		class="navbar navbar-expand-lg bd-navbar bg-dark navbar-dark fixed-top"
	>
		<nav
			class="container-xl bd-gutter flex-wrap flex-lg-nowrap"
			aria-label="Main navigation"
		>
			<RouterLink
				class="p-lg-3 my-2 my-lg-0 text-white text-decoration-none"
				:to="`/`"
				aria-label="Home"
			>
				<img src="../assets/logo-icon.png" alt="logo" />
			</RouterLink>

			<div class="d-flex">
				<button
					class="navbar-toggler d-flex d-md-none border-0"
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
				class="offcanvas-md offcanvas-bottom bg-dark"
				tabindex="-1"
				id="navBarPos"
				aria-labelledby="navBarPosOffcanvasLabel"
				data-bs-scroll="true"
			>
				<div
					class="offcanvas-body p-0 mt-3 mt-md-0 d-flex flex-column flex-md-row justify-content-start"
				>
					<ul class="navbar-nav flex-row flex-wrap ms-md-auto">
						<li
							class="nav-item col-3 col-md-auto text-center"
							v-if="cajaActual.active"
							v-for="elem in itemsNavBar"
						>
							<RouterLink
								:to="`${elem.link}`"
								class="nav-link py-2 px-0 px-md-2"
							>
								<span class="material-icons-round">
									{{ elem.icon }}
								</span>
								<br />
								{{ elem.title }}
							</RouterLink>
						</li>
					</ul>
					<hr class="text-white-50 mt-auto" />
					<div class="dropdown ps-3 d-none d-md-flex align-items-center">
						<div
							role="button"
							class="d-block link-light text-decoration-none"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<img
								:src="userData.avatar"
								alt="avatar"
								width="55"
								height="55"
								class="rounded-circle"
							/>
						</div>
						<ul class="dropdown-menu dropdown-menu-md-end">
							<li>
								<span
									class="dropdown-item-text text-center text-success fw-bold"
									>{{ userData.name }}</span
								>
							</li>
							<li><hr class="dropdown-divider" /></li>
							<li>
								<div
									class="dropdown-item d-flex align-items-center gap-1 fw-bold text-secondary"
								>
									<span class="material-icons-round">settings</span>
									<span role="button"> Configuración </span>
								</div>
							</li>
							<li>
								<div
									class="dropdown-item d-flex align-items-center gap-1 fw-bold text-danger"
								>
									<span class="material-icons-round">power_settings_new</span>
									<span role="button" @click="logout"> Cerrar sesión </span>
								</div>
							</li>
						</ul>
					</div>
					<div
						class="px-3 pb-3 d-inline d-md-none d-flex align-items-center justify-content-start gap-3"
					>
						<img
							:src="userData.avatar"
							alt="avatar"
							width="55"
							height="55"
							class="rounded-circle"
						/>
						<small class="nameAvatar text-success">{{ userData.name }}</small>
						<div class="ms-auto d-flex flex-column fw-bold gap-3">
							<span class="text-secondary material-icons-round">settings</span>
							<span class="text-danger material-icons-round" @click="logout"
								>power_settings_new</span
							>
						</div>
					</div>
				</div>
			</div>
		</nav>
	</header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useNavBar } from '@/composables/useNavBar'
import { useCaja } from '@/composables/useCaja'

const { userData, logout } = useAuth()
const { itemsNavBar } = useNavBar()
const { cajaActual } = useCaja()
</script>
<style scoped>
.nameAvatar {
	width: 150px;
}
</style>
