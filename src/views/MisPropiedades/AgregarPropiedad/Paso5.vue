<template>
    <StepsBar :step="5" />
    <div class="flex-1 flex flex-col w-full max-w-3xl mx-auto py-6 sm:py-8 px-4 sm:px-6">
        <CardBeforePublish />
        <PropertyDetails />

        <button
            @click="guardarBorrador"
            class="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 sm:h-14 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-lg sm:text-xl font-bold leading-normal tracking-[0.015em] transition-colors duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-600 mt-6"
            :disabled="loading"
        >
            <span class="material-symbols-outlined mr-2 text-xl sm:text-2xl">save</span>
            <span class="truncate">Guardar borrador</span>
        </button>

        <button 
            @click="publicarPropiedad"
            class="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 sm:h-14 bg-primary text-white text-lg sm:text-xl font-bold leading-normal tracking-[0.015em] transition-colors duration-200 ease-in-out hover:bg-blue-600 mt-4 sm:mt-6"
            :disabled="loading"
        >
            <span class="material-symbols-outlined mr-2 text-xl sm:text-2xl">send</span>
            <span class="truncate">Publicar propiedad </span>
        </button>
    </div>
    
    <div class="mt-8 w-full flex justify-start px-4 sm:px-6 max-w-3xl mx-auto">
        <button @click="previousStep"
            class="flex min-w-[100px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 sm:h-12 px-4 sm:px-6 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-base sm:text-lg font-bold leading-normal tracking-[0.015em] transition-colors duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-600"
            :disabled="loading">
            <span class="material-symbols-outlined mr-2 text-xl">arrow_back</span>
            <span class="truncate">Anterior</span>
        </button>
    </div>

    <Loader :show="loading" :message="loaderMessage"/>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCreateProperty } from '../../../stores/useCreateProperty.js'
import PropertyDetails from '../../../components/MisPropiedades/AgregarPropiedad/PropertyDetailsBeforePublish.vue'
import StepsBar from '../../../components/MisPropiedades/AgregarPropiedad/StepsBar.vue';
import CardBeforePublish from '../../../components/MisPropiedades/AgregarPropiedad/CardBeforePublish.vue';
import { useGestionPropiedades } from "/src/stores/useGestionPropiedades.js";
import Loader from '../../../components/Loader.vue';

const router = useRouter()
const store = useCreateProperty()
const storePropiedades = useGestionPropiedades();
const loading = ref(false)
const loaderMessage = ref('')

function previousStep() {
    // Deshabilitar la navegación si se está cargando
    if (!loading.value) {
        router.push('/mis-propiedades/agregar/paso4')
    }
}

async function publicarPropiedad() {

    try {
        loading.value = true
        loaderMessage.value = 'Publicando propiedad...'
        
        // Siempre se guarda como borrador primero
        const idPropertyCreated = await store.publicarPropiedad();
        
        // Poner estado a publicado
        await storePropiedades.publicarPropiedad(idPropertyCreated);
        
        router.push('/mis-propiedades')
    } catch (err) {
        console.error("Error al publicar propiedad:", err.response?.data || err);
        loaderMessage.value = 'Error al publicar';
    } finally {
        // Un pequeño delay para que el mensaje de error o éxito se vea, si es necesario
        // setTimeout(() => { loading.value = false; }, 500);
        loading.value = false
    }

}
async function guardarBorrador() {

    try {
        loading.value = true
        loaderMessage.value = 'Guardando borrador...'
        
        // Se guarda como borrador
        await store.publicarPropiedad(); 
        
        // Actualizar la lista local de propiedades para reflejar el borrador guardado
        await storePropiedades.updateStateMisPropiedades();
        
        router.push('/mis-propiedades')
    } catch (err) {
        console.error("Error al guardar propiedad:", err.response?.data || err);
        loaderMessage.value = 'Error al guardar';
    } finally {
        loading.value = false
    }

}
</script>