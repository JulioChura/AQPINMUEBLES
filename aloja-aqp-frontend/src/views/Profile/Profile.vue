<template>

    <body class="font-display bg-background-light dark:bg-background-dark text-black dark:!text-white">
        <div class="flex flex-col min-h-screen">
                <HeaderComponent />
            <div class="flex flex-1">
                <aside class="w-72 p-6 hidden md:flex flex-col border-r border-black/10 dark:border-white/10">
                    <h2 class="text-lg font-bold mb-6 text-black dark:!text-white">Ajustes de la Cuenta</h2>
                    <nav class="flex flex-col gap-2">
                        <router-link to="/perfil/ver-perfil"
                            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            :class="[
                                (route.path === '/perfil/ver-perfil' || route.path === '/perfil/editar-perfil')
                                    ? 'bg-primary/10 text-primary dark:!bg-primary/20 dark:!text-primary'
                                    : ''
                            ]">
                            <span class="material-symbols-outlined text-xl">person</span>
                            Editar Perfil
                        </router-link>
                        <!-- <router-link class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            to="/perfil/verificar-perfil"
                            exact-active-class="bg-primary/10 text-primary dark:!bg-primary/20 dark:!text-primary"
                            >
                            <span class="material-symbols-outlined text-xl">verified_user</span>
                            Verificar Perfil
                        </router-link> -->
                        <!-- <router-link class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative"
                            to="/perfil/mensajes"
                            exact-active-class="bg-primary/10 text-primary dark:!bg-primary/20 dark:!text-primary">
                            <span class="material-symbols-outlined text-xl">chat_bubble</span>
                            Mensajes
                            <span class="absolute right-3 top-1/2 -translate-y-1/2 size-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">3</span>
                        </router-link> -->
                        <router-link class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            to="/perfil/propiedades-guardadas"
                            exact-active-class="bg-primary/10 text-primary dark:!bg-primary/20 dark:!text-primary">
                            
                            <span class="material-symbols-outlined text-xl">bookmark</span>
                            Propiedades Guardadas
                        </router-link>
                        <router-link
                            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            to="/perfil/configuracion"
                            exact-active-class="bg-primary/10 text-primary dark:!bg-primary/20 dark:!text-primary">
                            <span class="material-symbols-outlined text-xl">settings</span>
                            Configuracion
                        </router-link>
                    </nav>
                </aside>
                <router-view />
            </div>
        </div>

    </body>
</template>
<script setup lang="ts">
import HeaderComponent from "../../components/HeaderComponent.vue";
import ProfileButton from '../../components/ProfileButton.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>