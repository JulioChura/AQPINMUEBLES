<template>
    <transition name="fade-slide">
        <div v-if="showError" class="fixed top-4 sm:top-6 right-4 sm:right-6 z-50 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
            {{ errorMsg }}
        </div>
    </transition>
    
    <StepsBar :step="3" />

    <div class="flex-1 flex flex-col w-full max-w-4xl mx-auto py-6 sm:py-8 px-4 sm:px-6">
        <h3 class="text-gray-800 dark:text-white text-xl sm:text-2xl font-bold mb-3 text-center">
            ¡Da vida a tu propiedad!
        </h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm sm:text-base text-center mb-6 sm:mb-8">
            Carga y organiza rápidamente las fotos de tu propiedad aquí.
        </p>

        <div class="border-2 border-dashed border-primary/50 bg-primary/5 dark:bg-primary/10 rounded-xl p-6 text-center flex flex-col items-center justify-center transition-all duration-300 hover:border-primary cursor-pointer h-36 sm:h-40"
            @dragover.prevent @drop.prevent="handleDrop" @click="fileInput.click()">
            <span class="material-symbols-outlined text-primary text-4xl sm:text-5xl mb-1">cloud_upload</span>
            <p class="text-base sm:text-lg font-semibold text-primary">Arrastra y suelta las fotos aquí</p>
            <p class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                o <span class="text-primary font-medium">buscar archivos</span> (máx. 10MB por imagen)
            </p>
            <input type="file" accept="image/*" multiple class="hidden" ref="fileInput" @change="handleFiles" />
        </div>

        <div class="mt-6 pb-4">
            <div class="flex flex-col gap-3 sm:flex-row sm:gap-4" id="image-filmstrip">
                <div v-for="(img, index) in imagenes" :key="index"
                    :class="[
                        // W-full en móvil para aprovechar el ancho, W-48 en sm
                        'relative overflow-hidden shadow-md aspect-video flex-shrink-0 w-full sm:w-48 rounded-lg', 
                        index === mainImageIndex ? 'ring-4 ring-primary/40' : 'bg-gray-100 dark:bg-gray-700'
                    ]">
                    
                    <img :src="img" alt="Imagen de la propiedad" class="w-full h-full object-cover" />

                    <div class="absolute top-1 left-1">
                        <button @click.stop="setMain(index)"
                            :class="index === mainImageIndex ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700 border border-gray-200'"
                            class="rounded-full px-2 py-0 sm:px-3 sm:py-0.5 text-xs font-semibold shadow-sm flex items-center gap-1 transition-colors duration-200">
                            <span v-if="index === mainImageIndex" class="inline-block w-2 h-2 rounded-full bg-white/90"></span>
                            <span>{{ index === mainImageIndex ? 'Principal' : 'Marcar' }}</span>
                        </button>
                    </div>

                    <div class="absolute top-1 right-1 cursor-grab text-white bg-black/30 rounded-full p-0.5 flex items-center justify-center">
                        <span class="material-symbols-outlined text-xs">drag_indicator</span>
                    </div>

                    <button @click="removeImage(index)"
                        title="Eliminar imagen"
                        class="absolute bottom-1 right-1 size-5 sm:size-7 bg-red-500/80 backdrop-blur-sm rounded-full text-white flex items-center justify-center hover:bg-red-600 transition-colors">
                        <span class="material-symbols-outlined text-xs sm:text-sm">delete</span>
                    </button>
                </div>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCreateProperty } from '../../../stores/useCreateProperty.js'
import StepsBar from '../../../components/MisPropiedades/AgregarPropiedad/StepsBar.vue';
import { storeToRefs } from 'pinia'

const router = useRouter()
const store = useCreateProperty()
const fileInput = ref(null)

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
    }, 2300)
}

const { imagenes, main_image_index } = storeToRefs(store)

const maxImages = 10
const minImages = 3

const mainImageIndex = main_image_index

function handleFiles(event) {
    const files = event.target.files
    processFiles(files)
}

function handleDrop(event) {
    const files = event.dataTransfer.files
    processFiles(files)
}

function processFiles(files) {
    const capacity = maxImages - imagenes.value.length
    if (capacity <= 0) {
        showTempError(`Has alcanzado el máximo de ${maxImages} imágenes.`)
        return
    }

    let accepted = 0
    for (const file of files) {
        if (accepted >= capacity) break
        if (!file.type.startsWith('image/')) continue
        if (file.size > 10 * 1024 * 1024) {
            console.warn('Skipped file > 10MB', file.name)
            continue
        }
        const reader = new FileReader()
        reader.onload = e => imagenes.value.push(e.target.result)
        reader.readAsDataURL(file)
        accepted++
    }
    if (accepted < files.length) {
        showTempError(`Solo se aceptaron ${accepted} archivos. Límite máximo ${maxImages}.`)
    }
}

function removeImage(index) {
    const wasMain = Number(mainImageIndex.value) === index
    imagenes.value.splice(index, 1)

    if (wasMain) {
        const newIndex = imagenes.value.length > 0 ? 0 : -1;
        store.setMainImageIndex(newIndex)
    } 
    else if (Number(mainImageIndex.value) > index) {
        store.setMainImageIndex(Number(mainImageIndex.value) - 1)
    }
}

function setMain(idx) {
    store.setMainImageIndex(idx)
}

function nextStep() {
    if (imagenes.value.length < minImages) {
        showTempError(`Debes subir al menos ${minImages} imágenes antes de continuar.`)
        return
    }
    router.push('/mis-propiedades/agregar/paso4')
}

function previousStep() {
    router.push('/mis-propiedades/agregar/paso2')
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