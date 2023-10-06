<template>
	<Suspense>
		<template #default>
			<RouterView />
		</template>
		<template #fallback>
			<div class="fw-bold">Cargando...</div>
		</template>
	</Suspense>
</template>
