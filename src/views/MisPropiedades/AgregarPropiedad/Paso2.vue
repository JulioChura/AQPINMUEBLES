<template>
    <StepsBar :step="2" />
    <div class="flex-1 flex flex-col w-full max-w-4xl mx-auto py-6 sm:py-8 px-4 sm:px-6">
        <h3 class="text-gray-800 dark:text-white text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
            Selector de características: ¡Añade Servicios!
        </h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm sm:text-base text-center mb-6 sm:mb-8">
            Selecciona los servicios que el inquilino podrá disfrutar en tu propiedad, pero que están incluidos en el precio final.
        </p>

        <div class="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700">
            <h4 class="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-0">
                Servicios seleccionados:
                <span class="text-primary font-bold">{{ selectedAmenities.length }}</span>
            </h4>
            <div class="flex items-center gap-2 text-primary text-center sm:text-left">
                <span class="material-symbols-outlined text-lg">lightbulb</span>
                <p class="text-xs sm:text-sm font-medium">
                    Añade {{ Math.max(0, 3 - selectedAmenities.length) }} más para que tu propiedad conecte con más estudiantes.
                </p>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6 w-full">
            <div v-for="amenity in amenities" :key="amenity.id" @click="toggleAmenity(amenity.id)"
                class="flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 ease-in-out cursor-pointer group h-full"
                :class="[
                    selectedAmenities.includes(amenity.id)
                        ? 'bg-primary/10 border-primary shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-primary/10'
                ]">
                <div class="bg-white dark:bg-gray-800 rounded-full size-12 sm:size-16 flex items-center justify-center mb-2 sm:mb-3 shadow-md group-hover:scale-110 transition-transform">
                    <ServiceIcon :name="amenity.icon_name || amenity.icon_class" :url="amenity.image_url" :class="selectedAmenities.includes(amenity.id) ? 'text-primary' : 'text-gray-500 group-hover:text-primary'" :size="24" />
                </div>
                <p class="text-sm sm:text-lg font-medium mb-2 text-center leading-tight" :class="selectedAmenities.includes(amenity.id)
                    ? 'text-primary'
                    : 'text-gray-700 dark:text-gray-300 group-hover:text-primary'">
                    {{ amenity.name }}
                </p>

                <button
                    class="flex items-center gap-1 px-3 py-1 sm:px-4 sm:py-2 bg-primary text-white rounded-full text-xs sm:text-sm font-semibold transition-all duration-300"
                    :class="[
                        selectedAmenities.includes(amenity.id)
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
                    ]">
                    <span class="material-symbols-outlined text-sm">
                        {{ selectedAmenities.includes(amenity.id) ? 'check' : 'add' }}
                    </span>
                    {{ selectedAmenities.includes(amenity.id) ? 'Agregado' : 'Agregar' }}
                </button>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCreateProperty } from '../../../stores/useCreateProperty.js'
import StepsBar from '../../../components/MisPropiedades/AgregarPropiedad/StepsBar.vue'
import { webPageData } from '/src/stores/webPageData.js'
import ServiceIcon from '/src/components/icons/ServiceIcon.vue'

const router = useRouter()
const store = useCreateProperty()
const storeWebPageData = webPageData()

const { amenidades } = storeToRefs(store)

const amenities = ref([])

const fetchAmenities = async () => {
    try {
        amenities.value = await storeWebPageData.getServicios()
    } catch (err) {
        console.error("Error al obtener tipos de servicios:", err)
    }
}

onMounted(() => {
    fetchAmenities()
})

const selectedAmenities = amenidades

function toggleAmenity(id) {
    const index = selectedAmenities.value.indexOf(id)
    if (index >= 0) {
        selectedAmenities.value.splice(index, 1)
    } else {
        selectedAmenities.value.push(id)
    }
}

function nextStep() {
    console.log("datos en pinia", JSON.stringify(store.$state))
    router.push('/mis-propiedades/agregar/paso3')
}

function previousStep() {
    router.push('/mis-propiedades/agregar/paso1')
}
</script>