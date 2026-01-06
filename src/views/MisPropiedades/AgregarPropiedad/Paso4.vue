<template>
    <transition name="fade-slide">
        <div v-if="showError" class="fixed top-4 sm:top-6 right-4 sm:right-6 z-50 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
            {{ errorMsg }}
        </div>
    </transition>
    
    <StepsBar :step="4" />

    <div class="flex-1 flex flex-col w-full max-w-4xl mx-auto py-6 sm:py-8 px-4 sm:px-6">
        <h3 class="text-gray-800 dark:text-white text-xl sm:text-2xl font-bold mb-3 text-center">
            Establece el precio de tu propiedad
        </h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm sm:text-base text-center mb-6 sm:mb-8">
            Define rápidamente los detalles de precio para publicar tu alojamiento.
        </p>

        <div class="flex flex-col gap-6">
            <label class="block">
                <span class="text-gray-700 dark:text-gray-300 text-base sm:text-lg font-medium mb-2 block">
                    Precio mensual
                </span>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span class="text-gray-500 dark:text-gray-400 text-lg sm:text-xl font-bold">S/</span>
                    </div>
                    <input v-model="precio"
                        class="form-input text-gray-800 dark:text-white w-full rounded-lg bg-gray-100 dark:bg-gray-700 border-none focus:ring-primary focus:border-primary text-xl sm:text-2xl py-2 sm:py-3 pl-10 pr-4 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        placeholder="p.ej., 400" type="number" min="1"
                        :class="{ 'ring-2 ring-red-500': showErrorPrecio }" />
                </div>
            </label>

            <div class="bg-primary/10 dark:bg-primary/20 border border-primary/30 rounded-lg p-4 sm:p-6 text-center mt-4 sm:mt-6">
                <p class="text-base sm:text-lg text-primary font-medium mb-1 sm:mb-2">Precio mensual recomendado</p>
                <p class="text-primary text-3xl sm:text-4xl font-bold">S/ 400</p>
                <p class="text-primary/80 dark:text-primary/90 text-xs sm:text-sm mt-1 sm:mt-2">
                    Basado en el tamaño y ubicación de la propiedad.
                </p>
            </div>
        </div>
    </div>

    <div class="mt-8 sm:mt-10 w-full flex justify-between gap-4 px-4 sm:px-6">
        <button @click="previousStep"
            class="flex flex-1 items-center justify-center overflow-hidden rounded-lg h-10 sm:h-12 px-4 sm:px-6 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-base sm:text-lg font-bold leading-normal tracking-[0.015em] transition-colors duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-600">
            <span class="material-symbols-outlined mr-2 text-xl">arrow_back</span>
            <span class="truncate">Anterior</span>
        </button>

        <button @click="nextStep"
            class="flex flex-1 items-center justify-center overflow-hidden rounded-lg h-10 sm:h-12 px-4 sm:px-6 bg-primary text-white text-base sm:text-lg font-bold leading-normal tracking-[0.015em] transition-colors duration-200 ease-in-out hover:bg-blue-600">
            <span class="truncate">Siguiente</span>
            <span class="material-symbols-outlined ml-2 text-xl">arrow_forward</span>
        </button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useCreateProperty } from '../../../stores/useCreateProperty.js'
import StepsBar from '../../../components/MisPropiedades/AgregarPropiedad/StepsBar.vue';
import { storeToRefs } from 'pinia'

const router = useRouter()
const propiedadStore = useCreateProperty()
const { monthly_price: precio } = storeToRefs(propiedadStore)

const showErrorPrecio = ref(false)
const showError = ref(false)
const errorMsg = ref("")
let errorTimeout = null
function showTempError(msg) {
    errorMsg.value = msg
    showError.value = true
    if (errorTimeout) clearTimeout(errorTimeout)
    errorTimeout = setTimeout(() => {
        showError.value = false
        errorMsg.value = ""
    }, 3000)
}

function nextStep() {
    if (!precio.value || Number(precio.value) < 1) {
        showErrorPrecio.value = true
        showTempError('Es necesario ingresar el precio mensual')
        setTimeout(() => (showErrorPrecio.value = false), 3000)
        return
    }
    router.push('/mis-propiedades/agregar/paso5')
}

function previousStep() {
    router.push('/mis-propiedades/agregar/paso3')
}
</script>

<style>
.fade-slide-enter-active, .fade-slide-leave-active {
    transition: opacity 0.4s, transform 0.4s;
}
.fade-slide-enter-from, .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-16px);
}
.fade-slide-enter-to, .fade-slide-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>