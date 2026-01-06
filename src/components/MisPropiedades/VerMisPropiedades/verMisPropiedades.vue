<template>
    <div class="px-4 sm:px-6 py-4">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
            <h2 class="text-gray-800 dark:text-white text-2xl sm:text-3xl font-bold leading-tight">
                Mis Propiedades
            </h2>
            
            <div class="flex flex-wrap gap-2 sm:gap-3">
                <button
                    v-for="op in ['all','published','hidden','draft']"
                    :key="op"
                    @click="filtroEstado = op"
                    class="px-3 py-1 sm:px-4 sm:py-2 rounded-lg border transition text-sm sm:text-base font-medium whitespace-nowrap"
                    :class="filtroEstado === op
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'"
                >
                    {{ op === 'all' ? 'Todos' :
                       op === 'published' ? 'Publicados' :
                       op === 'hidden' ? 'Ocultos' :
                       'Borradores'
                    }}
                </button>
            </div>
        </div>

        <TransitionGroup 
            name="fade" 
            tag="div" 
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 sm:gap-6 justify-center"
        >
            <MyPropertyCard 
                v-for="propiedad in propiedadesFiltradas" 
                :key="propiedad.id" 
                :id="propiedad.id" 
                :titulo="propiedad.title"
                :precio="propiedad.monthly_price" 
                :estado="propiedad.status" 
                :imagen="propiedad.photos[0]?.image ? propiedad.photos[0].image : 'https://placehold.co/500x300?text=Sin+imagen'" 
                @editar="editarPropiedad" 
                @ver="verPropiedad" 
                @eliminar="confirmarEliminacion" 
                @cambiar-estado="cambiarEstado" 
            />
        </TransitionGroup>

        <div v-if="showConfirm" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div class="bg-white dark:!bg-gray-800 rounded-xl p-6 shadow-2xl w-full max-w-sm text-center">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    ¿Eliminar propiedad?
                </h3>
                <p class="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                    Esta acción no puede deshacerse.
                </p>
                <div class="flex justify-between gap-3">
                    <button @click="showConfirm = false"
                        class="flex-1 px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 transition text-sm">
                        Cancelar
                    </button>
                    <button @click="eliminarPropiedad(confirmId)"
                        class="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition text-sm">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    </div>
    <Loader :show="loading" :message="loaderMessage" />
    <EditarPropiedad v-if="selectedPropertyId !== null" :id="selectedPropertyId" :visible="showEditarModal" @close="cerrarModal"/>
</template>

<script setup>
import Loader from '../../../components/Loader.vue';
import { ref, onMounted, computed } from "vue";
import { useGestionPropiedades } from "/src/stores/useGestionPropiedades.js";
import MyPropertyCard from "/src/components/MisPropiedades/MyPropertyCard.vue"
import { useRouter } from 'vue-router';
import EditarPropiedad from '/src/components/MisPropiedades/EditarPropiedad/EditarPropiedad.vue';


const storePropiedades = useGestionPropiedades();
const propiedades = ref([]);
const showConfirm = ref(false);
const confirmId = ref(null);
const emit = defineEmits(["sinPropiedades"]);
const loading = ref(false)
const loaderMessage = ref('')
const router = useRouter();
const showEditarModal = ref(false);
const selectedPropertyId = ref(null);
const filtroEstado = ref("all");

const propiedadesFiltradas = computed(() => {
    if (filtroEstado.value === "all") return propiedades.value;

    return propiedades.value.filter(
        (p) => p.status === filtroEstado.value
    );
});

const fetchMyProperties = async () => {
    try {
        propiedades.value = await storePropiedades.getMisPropiedades();
    } catch (err) {
        console.error("Error al obtener propiedades:", err);
    }
};

const editarPropiedad = (id) => {
    selectedPropertyId.value = id
    showEditarModal.value = true;
};

const verPropiedad = ({ id, estado }) => {
    let isPrivate = true

    if (estado == "published") isPrivate = false;

    router.push({
        path: `/view/${id}`,
        query: { isPrivate }  
    });
};

const confirmarEliminacion = (id) => {
    confirmId.value = id;
    showConfirm.value = true;
};

const cambiarEstado = async ({ id, estado }) => {
    try {
        loading.value = true
        
        if (estado == "published") {
            loaderMessage.value = 'Cambiando estado a publicado...'
            propiedades.value = await storePropiedades.publicarPropiedad(id);

        } else if (estado == "hidden") {
            loaderMessage.value = 'Cambiando estado a oculto...'
            propiedades.value = await storePropiedades.ocultarPropiedad(id);

        } else if (estado == "draft") {
            loaderMessage.value = 'Cambiando estado a borrador...'
        } else {
            console.warn("Estado inválido proporcionado:", estado)
        }

    } catch (err) {
        console.error("Error al cambiar estado:", err);
    } finally {
        loading.value = false
    }

};

const cerrarModal = () => {
    showEditarModal.value = false
    selectedPropertyId.value = null
    // Re-fetch properties just in case edits were made
    fetchMyProperties();
}

const eliminarPropiedad = async (id) => {
    showConfirm.value = false;
    try {
        propiedades.value = await storePropiedades.eliminarPropiedad(id);

        if (propiedades.value.length <= 0) emit("sinPropiedades");

    } catch (err) {
        console.error("Error al eliminar propiedad", id, " :", err);
    }
};

onMounted(() => {
    fetchMyProperties();
});
</script>

<style scoped>
/* Animación de desaparición suave */
.fade-enter-active,
.fade-leave-active {
    transition: all 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
}
</style>