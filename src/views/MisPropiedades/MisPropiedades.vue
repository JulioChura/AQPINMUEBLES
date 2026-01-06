<template>
    <div class="bg-background-light dark:!bg-background-dark font-display min-h-screen">
        <HeaderComponent />
        <div class="flex min-h-screen">
            <!-- SideNavBar: solo visible en desktop -->
            <aside class="hidden md:flex w-64 bg-background-light/80 dark:bg-background-dark/80 border-r border-gray-200 dark:border-gray-800 backdrop-blur-sm flex-col p-4">
                <nav class="flex flex-col gap-2">
                    <router-link class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/30"
                        to="/mis-propiedades"
                        exact-active-class="bg-primary/20 dark:bg-primary/30 text-primary"
                    >
                        <span class="material-symbols-outlined">apartment</span>
                        <p class="text-sm font-medium">Mis propiedades</p>
                    </router-link>
                    <router-link class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/30"
                        to="/mis-propiedades/agregar"
                        active-class="bg-primary/20 dark:bg-primary/30 text-primary"
                    >
                        <span class="material-symbols-outlined">add_circle_outline</span>
                        <p class="text-sm font-medium">Agregar propiedad</p>
                    </router-link>
                    <router-link class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/30"
                        to="/mis-propiedades/analytics"
                        exact-active-class="bg-primary/20 dark:bg-primary/30 text-primary"
                    >
                        <span class="material-symbols-outlined">analytics</span>
                        <p class="text-sm font-medium">Analitica</p>
                    </router-link>
                    <a class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/30"
                        href="#">
                        <span class="material-symbols-outlined">settings</span>
                        <p class="text-sm font-medium">Configuraciones</p>
                    </a>
                </nav>
            </aside>
            <!-- Main Content Area: ocupa todo el ancho en móvil -->
            <div class="flex-1 flex flex-col bg-background-light/80 dark:bg-background-dark/80 min-h-screen">
                <main class="flex-1 p-4 md:p-8">
                    <router-view />
                </main>
                <!-- Botón flotante + para agregar propiedad, visible en móvil y desktop -->
                <router-link to="/mis-propiedades/agregar"
                    class="fixed bottom-6 right-4 h-14 w-14 rounded-full bg-primary text-white shadow-lg shadow-blue-500/30 flex items-center justify-center hover:scale-105 transition-transform z-40 md:hidden"
                    aria-label="Agregar propiedad">
                    <span class="material-symbols-outlined text-2xl">add</span>
                </router-link>
            </div>
        </div>
    </div>
   
</template>

<script setup lang="ts">


import NotificacionButton from '../../components/NotificacionButton.vue';
import ProfileButton from '../../components/ProfileButton.vue';
import HeaderComponent from '../../components/HeaderComponent.vue';



</script>