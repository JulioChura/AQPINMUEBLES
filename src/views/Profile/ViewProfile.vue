<template>
    <HeaderComponent />
    <main class="flex-1 p-6 sm:p-8 md:p-10">
        <div class="max-w-4xl mx-auto">
            <div
                class="mb-10 bg-white/50 dark:bg-black/20 p-6 sm:p-8 rounded-xl border border-black/10 dark:border-white/10">
                <h2 class="text-2xl font-bold mb-6 text-black dark:!text-white">Perfil</h2>
                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div class="size-24 sm:size-32 rounded-full bg-cover bg-center flex-shrink-0" :style="{
                        backgroundImage: `url(${auth.user.avatar || '/src/public/default_avatar.png'})`
                    }">
                    </div>
                    <div class="flex-grow">
                        <div class="flex items-center gap-3 mb-1">
                            <h3 class="text-xl font-bold text-black dark:!text-white">{{ auth.user.first_name }} {{
                                auth.user.last_name}}</h3>
                            <span
                                class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                                <span class="material-symbols-outlined text-sm">verified</span>
                                Verificado
                            </span>
                        </div>
                        <p class="text-sm text-black/60 dark:text-white/60">{{ auth.user.email }}</p>
                    </div>
                    <button @click="editProfile"
                        class="flex-shrink-0 ml-auto bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                        Editar Perfil
                    </button>
                </div>
            </div>
            <div class="space-y-10">
                <div>
                    <h2 class="text-2xl font-bold mb-1 text-black dark:!text-white">Acerca de</h2>
                    <p class="text-sm text-black/60 dark:text-white/60 mb-6">Tu información personal y biografía.</p>
                    <div class="divide-y divide-black/10 dark:divide-white/10">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 py-4">
                            <p class="font-medium text-black/60 dark:text-white/60">Género</p>
                            <p class="md:col-span-2 text-black dark:!text-white">{{
                                (genders.find(g => g.value === auth.user.student_profile?.gender)?.label) || 'Otro'
                                }}</p>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 py-4">
                            <p class="font-medium text-black/60 dark:text-white/60">Edad</p>
                            <p class="md:col-span-2 text-black dark:!text-white">{{ auth.user.student_profile?.age ||
                                '00'}}</p>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 py-4">
                            <p class="font-medium text-black/60 dark:text-white/60">Sede de universidad</p>
                            <p class="md:col-span-2 text-black dark:!text-white">{{
                                auth.user.student_profile?.campuses?.[0]?.name || 'Campus UNSA'
                                }}
                            </p>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 py-4">
                            <p class="font-medium text-black/60 dark:text-white/60">Carrera</p>
                            <p class="md:col-span-2 text-black dark:!text-white">{{ auth.user.student_profile?.career ||
                                ''}}</p>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 py-4">
                            <p class="font-medium text-black/60 dark:text-white/60">Biografía</p>
                            <p class="md:col-span-2 leading-relaxed text-black dark:!text-white">{{
                                auth.user.student_profile?.bio || 'Hola, estoy usando AlojaAQP'}}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 class="text-2xl font-bold mb-1 text-black dark:!text-white">Contacto</h2>
                    <p class="text-sm text-black/60 dark:text-white/60 mb-6">Cómo pueden contactarte otros usuarios.</p>
                    <div class="divide-y divide-black/10 dark:divide-white/10">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 py-4">
                            <p class="font-medium text-black/60 dark:text-white/60">Teléfono</p>
                            <p class="md:col-span-2 text-black dark:!text-white">{{
                                auth.user.student_profile?.phone_number || '000-000'}}</p>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 py-4">
                            <p class="font-medium text-black/60 dark:text-white/60">Correo electrónico</p>
                            <p class="md:col-span-2 text-black dark:!text-white">{{ auth.user.email }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

</template>

<script setup lang="ts">
import { useAuthStore } from "../../stores/auth";
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore();
console.log("User Data:", JSON.stringify(auth.user));

const genders = [
    { value: 'F', label: 'Femenino' },
    { value: 'M', label: 'Masculino' },
    { value: 'O', label: 'Otro' },
]

function editProfile() {
    router.push('/perfil/editar-perfil');
}
</script>