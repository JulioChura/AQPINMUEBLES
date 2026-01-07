<template>
    <HeaderComponent />
    <main class="flex-1 p-6 sm:p-8 md:p-10">
        <div class="max-w-4xl mx-auto">
            <div
                class="mb-10 bg-white/50 dark:bg-black/20 p-6 sm:p-8 rounded-xl border border-black/10 dark:border-white/10">
                <h2 class="text-2xl font-bold mb-6 text-black dark:!text-white ">Perfil</h2>
                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div class="relative inline-block">
                        <!-- Imagen de perfil -->
                        <div class="size-24 sm:size-32 rounded-full bg-cover bg-center flex-shrink-0" :style="{
                            backgroundImage: `url(${auth.user.avatar || '/src/public/default_avatar.png'})`
                        }">
                        </div>

                        <!-- Botón de cambiar imagen -->
                        <button
                            class="absolute bottom-0 right-0 bg-white text-gray-700 rounded-full p-1.5 shadow hover:bg-gray-100 transition"
                            title="Cambiar imagen de perfil">
                            <span class="material-symbols-outlined text-lg">edit</span>
                        </button>
                    </div>
                    <div class="flex-grow">
                        <div class="flex items-center gap-3 mb-1">
                            <h3 class="text-xl font-bold text-black dark:!text-white">{{ auth.user.first_name }} {{
                                auth.user.last_name }}</h3>
                            <span
                                class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                                <span class="material-symbols-outlined text-sm">verified</span>
                                Verificado
                            </span>
                        </div>
                        <p class="text-sm text-black/60 dark:!text-white/60">{{ auth.user.email }}</p>
                    </div>
                </div>
            </div>
            <div class="space-y-10">
                <div>
                    <h2 class="text-2xl font-bold mb-1 text-black dark:!text-white">Acerca de ti</h2>
                    <p class="text-sm text-black/60 dark:!text-white/60 mb-6">Tu información personal y biografía.</p>
                    <div
                        class="grid grid-cols-1 md:grid-cols-2 gap-4 divide-y md:divide-y-0 divide-black/10 dark:divide-white/10">
                        <div class="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                            <div class="flex flex-col">
                                <label class="font-medium text-black/60 dark:!text-white/60 text-sm mb-1"
                                    for="first-name">Nombre</label>
                                <input v-model="form.first_name"
                                    class="w-full px-4 py-2 text-black dark:!text-white bg-transparent border border-black/20 dark:border-white/20 focus:border-primary focus:ring-primary rounded-lg transition-all"
                                    id="first-name" type="text"
                                    @focus="(e) => e.target.select()" />
                            </div>
                            <div class="flex flex-col">
                                <label class="font-medium text-black/60 dark:!text-white/60 text-sm mb-1"
                                    for="last-name">Apellido</label>
                                <input v-model="form.last_name"
                                    class="w-full px-4 py-2 text-black dark:!text-white bg-transparent border border-black/20 dark:border-white/20 focus:border-primary focus:ring-primary rounded-lg transition-all"
                                    id="last-name" type="text"
                                    @focus="(e) => e.target.select()" />
                            </div>
                        </div>
                        <div class="flex flex-col pt-4 md:pt-0">
                            <label class="font-medium text-black/60 dark:!text-white/60 text-sm mb-1"
                                for="gender">Gender</label>
                            <SelectDropDown v-model="form.gender" :options="genders" />
                        </div>
                        <div class="flex flex-col pt-4 md:pt-0">
                            <label class="font-medium text-black/60 dark:!text-white/60 text-sm mb-1"
                                for="age">Age</label>
                            <input v-model="form.age"
                                class="w-full px-4 py-2 text-black dark:!text-white bg-transparent border border-black/20 dark:border-white/20 focus:border-primary focus:ring-primary rounded-lg transition-all"
                                id="age" type="text"
                                @focus="(e) => e.target.select()" />
                        </div>
                        <div class="flex flex-col pt-4 md:pt-0">
                            <label class="font-medium text-black/60 dark:!text-white/60 text-sm mb-1"
                                for="university">University Campus</label>
                            <SelectDropDown v-model="form.campus" :options="campuses" />
                        </div>
                        <div class="flex flex-col pt-4 md:pt-0">
                            <label class="font-medium text-black/60 dark:!text-white/60 text-sm mb-1"
                                for="carrera">Carrera</label>
                            <input v-model="form.career"
                                class="w-full px-4 py-2 text-black dark:!text-white bg-transparent border border-black/20 dark:border-white/20 focus:border-primary focus:ring-primary rounded-lg transition-all"
                                id="carrera" type="text"
                                @focus="(e) => e.target.select()" />
                        </div>
                        <div class="col-span-full flex flex-col pt-4">
                            <label class="font-medium text-black/60 dark:!text-white/60 text-sm mb-1"
                                for="bio">Bio</label>
                            <textarea v-model="form.bio"
                                class="w-full px-4 py-2 text-black dark:!text-white bg-transparent border border-black/20 dark:border-white/20 focus:border-primary focus:ring-primary rounded-lg transition-all"
                                id="bio" rows="4"
                                @focus="(e) => e.target.select()"></textarea>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 class="text-2xl font-bold mb-1 text-black dark:!text-white ">Contact</h2>
                    <p class="text-sm text-black/60 dark:!text-white/60 mb-6">How others can get in touch with you.</p>
                    <div class="divide-y divide-black/10 dark:divide-white/10">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 py-4 items-center">
                            <p class="font-medium text-black/60 dark:!text-white/60">Phone</p>
                            <input v-model="form.phone_number"
                                class="md:col-span-2 w-full px-4 py-2 text-black dark:!text-white bg-transparent border border-black/20 dark:border-white/20 focus:border-primary focus:ring-primary rounded-lg transition-all"
                                type="text"
                                maxlength="9"
                                @focus="(e) => e.target.select()" />
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 py-4 items-center">
                            <p class="font-medium text-black/60 dark:!text-white/60">Email</p>
                            <input v-model="form.email" disabled
                                class="md:col-span-2 w-full px-4 py-2 text-black dark:!text-white bg-transparent border border-black/20 dark:border-white/20 focus:border-primary focus:ring-primary rounded-lg transition-all"
                                type="email" />
                        </div>
                    </div>
                </div>
            </div>
            <button @click="updateUser"
                class="w-full flex-shrink-0 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity mt-8">
                Guardar Cambios
            </button>
        </div>
    </main>
</template>

<script setup lang="ts">

import SelectDropDown from "../../components/Profile/SelectDropDown.vue";
import { useAuthStore } from "../../stores/auth";
import { useRouter } from 'vue-router'
import { reactive, ref, onMounted } from 'vue'
import { webPageData } from '/src/stores/webPageData.js';
import { useToast } from 'vue-toastification';


const router = useRouter()
const auth = useAuthStore();
const storeWebPageData = webPageData();
const toast = useToast();

const genders = [
    { id: 'F', name: 'Femenino' },
    { id: 'M', name: 'Masculino' },
    { id: 'O', name: 'Otro' },
]

const campuses = ref([]);

const fetchCampuses = async () => {
    try {
        campuses.value = await storeWebPageData.getUniversityCampus();

        // Asignar el campus correspondiente del usuario
        const campusFound = campuses.value.find(
            c => c.name === auth.user.student_profile.campuses?.[0]?.name
        );
        if (campusFound) {
            form.campus = campusFound.id;
        }
    } catch (err) {
        console.error("Error al obtener los campus:", err);
    }
};

onMounted(() => {
    fetchCampuses();
});

const form = reactive({
    first_name: auth.user.first_name,
    last_name: auth.user.last_name,
    gender: auth.user.student_profile.gender || 'F',
    age: auth.user.student_profile.age || '00',
    campus: null,
    career: auth.user.student_profile.career || 'Ing. Nuclear',
    bio: auth.user.student_profile.bio || 'Hola estoy usando AlojaAQP',
    phone_number: auth.user.student_profile.phone_number,
    email: auth.user.email,
})

const hasChanges = () => {
    const original = {
        first_name: auth.user.first_name,
        last_name: auth.user.last_name,
        gender: auth.user.student_profile.gender,
        age: auth.user.student_profile.age,
        campus: auth.user.student_profile.campuses?.[0]?.id || null,
        career: auth.user.student_profile.career,
        bio: auth.user.student_profile.bio,
        phone_number: auth.user.student_profile.phone_number,
        email: auth.user.email,
    };

    return Object.keys(form).some(key => {
        return form[key] != original[key]; // != para cubrir string vs número
    });
};

const validatePhoneNumber = (number) => {
    // Perú: 9 dígitos, inicia con 9, solo números
    const regex = /^9\d{8}$/;
    return regex.test(number);
}

const updateUser = async () => {
    if (!hasChanges()) {
        router.push('/perfil/ver-perfil');
        return;
    }

    // Validación de número peruano
    if (!validatePhoneNumber(form.phone_number)) {
        toast.error('El número debe tener 9 dígitos y empezar con 9 (ej: 9XXXXXXXX)');
        return;
    }

    // Construir el payload correctamente y asegurar gender como string
    const payload = {
        ...form,
        gender: typeof form.gender === 'object' && form.gender?.id ? form.gender.id : String(form.gender),
        campuses: form.campus ? [form.campus] : [],
    };
    delete payload.campus;

    const result = await auth.updateUserInfo(payload)
    if (result.success) {
        toast.success('Registro actualizado');
        setTimeout(() => {
            router.push('/perfil/ver-perfil');
        }, 1200);
    }
}



</script>