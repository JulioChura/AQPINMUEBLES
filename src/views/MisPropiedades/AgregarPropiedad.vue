

<template>
    <div class="flex flex-col bg-white dark:!bg-gray-800 rounded-xl shadow-sm p-8 relative">
        <!-- Botón de cerrar -->
        <router-link to="/mis-propiedades" class="absolute top-4 right-4 text-gray-400 hover:text-primary transition-colors text-2xl" title="Salir">
            <span class="material-symbols-outlined">close</span>
        </router-link>
        <div class="mb-8">
            <h2 class="text-gray-800 dark:text-white text-3xl font-bold leading-tight mb-2">Añadir nueva propiedad</h2>
            <p class="text-gray-500 dark:text-gray-400 text-lg">Sigue los pasos para publicar tu propiedad correctamente.</p>
        </div>
        <router-view />
    </div>
</template>
