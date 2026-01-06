<template>
    <StepsBar :step="1" />
    <div class="flex-1 flex flex-col items-center justify-center w-full max-w-5xl mx-auto py-8">
        <h3 class="text-gray-800 dark:text-white text-2xl font-bold mb-6">Detalles de la propiedad</h3>

        <div class="flex flex-col md:flex-row gap-8 w-full">
            <div class="grid grid-cols-1 gap-6 w-full md:w-2/3">
        <!-- Título -->
                <label class="flex flex-col gap-2">
                    <span class="text-lg font-medium text-gray-700 dark:text-gray-300">Titulo de la propiedad</span>
                    <input v-model="title"
            class="form-input w-full h-12 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary placeholder:text-gray-500 text-base"
            placeholder="p.ej., Departamento amplio de 2 habitaciones" type="text" />
                    <transition name="fade-slide">
                      <span v-if="showError.title" class="text-red-600 text-sm mt-1">Es necesario llenar este campo</span>
                    </transition>
                </label>

                <!-- Descripción -->
                <label class="flex flex-col gap-2">
                    <span class="text-lg font-medium text-gray-700 dark:text-gray-300">Descripción de la propiedad</span>
                    <textarea v-model="description"
                        class="form-textarea w-full h-32 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary placeholder:text-gray-500 text-base resize-none"
                        placeholder="Describe tu propiedad con detalle..."></textarea>
                    <transition name="fade-slide">
                      <span v-if="showError.description" class="text-red-600 text-sm mt-1">Es necesario llenar este campo</span>
                    </transition>
                </label>
                    <!-- Reglas de convivencia -->
                    <label class="flex flex-col gap-2">
                        <span class="text-lg font-medium text-gray-700 dark:text-gray-300">Reglas de convivencia</span>
                        <textarea v-model="coexistence_rules" class="form-textarea w-full h-32 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary placeholder:text-gray-500 text-base resize-none" placeholder="Escribe las reglas de convivencia (saltos de línea y viñetas permitidos)"></textarea>
                    </label>

                <!-- Dirección -->
                <label class="flex flex-col gap-2">
                    <span class="text-lg font-medium text-gray-700 dark:text-gray-300">Dirección</span>
                    <input v-model="address"
                        class="form-input w-full h-12 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary placeholder:text-gray-500 text-base"
                        placeholder="Calle, distrito, ciudad" type="text" />
                    <transition name="fade-slide">
                      <span v-if="showError.address" class="text-red-600 text-sm mt-1">Es necesario llenar este campo</span>
                    </transition>
                </label>

                <!-- Tipo y habitaciones -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label class="flex flex-col gap-2">
                        <span class="text-lg font-medium text-gray-700 dark:text-gray-300">
                            Tipo de propiedad
                        </span>

                        <select v-model="accommodation_type"
                            class="form-select w-full h-12 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary text-base">
                            <option value="">-- Selecciona un tipo --</option>
                            <option v-for="t in tiposPropiedad" :key="t.id" :value="t.id">
                                {{ t.name }}
                            </option>
                        </select>
                        <transition name="fade-slide">
                          <span v-if="showError.accommodation_type" class="text-red-600 text-sm mt-1">Es necesario llenar este campo</span>
                        </transition>
                    </label>

                    <label class="flex flex-col gap-2">
                        <span class="text-lg font-medium text-gray-700 dark:text-gray-300">Habitaciones</span>
                        <input v-model.number="rooms"
                            class="form-input w-full h-12 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary placeholder:text-gray-500 text-base"
                            min="1" placeholder="1" type="number" @change="onRoomsChange" />
                        <transition name="fade-slide">
                          <span v-if="showError.rooms" class="text-red-600 text-sm mt-1">Es necesario llenar este campo</span>
                        </transition>
                    </label>
                </div>
            </div>
            <div class="w-full md:w-1/3 flex flex-col gap-4 items-center">
                <span class="text-lg font-medium text-gray-700 dark:text-gray-300">Selecciona la ubicación del alojamiento</span>

                <!-- Lista de campus disponibles -->
                <div class="w-full">
                    <label class="flex flex-col gap-2">
                        <span class="text-sm text-gray-600 dark:text-gray-400">Campus (elige uno para centrar el mapa)</span>
                        <select v-model="selectedCampusId" @change="onCampusChange"
                            class="form-select w-full h-12 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary text-base">
                            <option value="">-- Selecciona un campus --</option>
                            <option v-for="c in campuses" :key="c.id" :value="c.id">{{ c.name }}</option>
                        </select>
                        <transition name="fade-slide">
                          <span v-if="showError.selectedCampusId" class="text-red-600 text-sm mt-1">Es necesario llenar este campo</span>
                        </transition>
                    </label>
                </div>

                <MapSelectUbi :predefinedUbication="selectedCampusCoords" @ubicacion-seleccionada="actualizarUbicacion" />
            </div>
        </div>


    </div>

    <!-- Botón siguiente -->
    <div class="mt-10 w-full flex justify-end">
        <button @click="nextStep"
            class="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-lg font-bold leading-normal tracking-[0.015em] transition-colors duration-200 ease-in-out hover:bg-blue-600">
            <span class="truncate">Siguiente paso</span>
            <span class="material-symbols-outlined ml-2">arrow_forward</span>
        </button>
    </div>
</template>

<script setup>
import { reactive } from 'vue'

// Estado para mostrar errores temporales
const showError = reactive({
    title: false,
    description: false,
    address: false,
    accommodation_type: false,
    rooms: false,
    selectedCampusId: false,
});
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useCreateProperty } from '../../../stores/useCreateProperty.js'
import StepsBar from '../../../components/MisPropiedades/AgregarPropiedad/StepsBar.vue';
import MapSelectUbi from '../../../components/MisPropiedades/AgregarPropiedad/MapSelectUbi.vue';
import { webPageData } from '/src/stores/webPageData.js';
import { storeToRefs } from 'pinia'


const router = useRouter()
const store = useCreateProperty()
const storeWebPageData = webPageData();


const { title, description, address, accommodation_type, latitude, longitude, rooms, coexistence_rules } = storeToRefs(store)

const tiposPropiedad = ref([]);
const campuses = ref([]);
const selectedCampusId = ref("");
const selectedCampusCoords = ref(null);

const fetchTiposPropiedad = async () => {
    try {
        const data = await storeWebPageData.getTiposDePropiedad();
        // normalize paginated or non-paginated responses
        let arr = [];
        if (Array.isArray(data)) arr = data;
        else if (data && Array.isArray(data.results)) arr = data.results;
        tiposPropiedad.value = arr.filter(Boolean);
    } catch (err) {
        console.error("Error al obtener tipos de propiedad:", err);
    }
};

const fetchCampuses = async () => {
    try {
        const data = await storeWebPageData.getUniversityCampus();
        // normalize paginated or non-paginated responses
        let arr = [];
        if (Array.isArray(data)) arr = data;
        else if (data && Array.isArray(data.results)) arr = data.results;
        campuses.value = arr.filter(Boolean);
    } catch (err) {
        console.error('Error al obtener campus:', err);
    }
};

onMounted(async () => {
    await fetchTiposPropiedad();
    await fetchCampuses();
    if (tiposPropiedad.value.length > 0) {
        accommodation_type.value = tiposPropiedad.value[0].id;
    }
});

// Guardar y avanzar al siguiente paso
function nextStep() {

        // Validar campos obligatorios
        let valid = true;
        if (!title.value || !title.value.trim()) {
            showError.title = true;
            valid = false;
            setTimeout(() => (showError.title = false), 3000);
        }
        if (!description.value || !description.value.trim()) {
            showError.description = true;
            valid = false;
            setTimeout(() => (showError.description = false), 2300);
        }
        if (!address.value || !address.value.trim()) {
            showError.address = true;
            valid = false;
            setTimeout(() => (showError.address = false), 2300);
        }
        if (!accommodation_type.value) {
            showError.accommodation_type = true;
            valid = false;
            setTimeout(() => (showError.accommodation_type = false), 2300);
        }
        if (!rooms.value || Number(rooms.value) < 1) {
            showError.rooms = true;
            valid = false;
            setTimeout(() => (showError.rooms = false), 2300);
        }
        if (!selectedCampusId.value) {
            showError.selectedCampusId = true;
            valid = false;
            setTimeout(() => (showError.selectedCampusId = false), 2300);
        }
        // coexistence_rules NO es obligatorio

        if (!valid) return;

        console.log("datos en pinia", JSON.stringify(store.$state))
        router.push('/mis-propiedades/agregar/paso2') // siguiente paso
}
function actualizarUbicacion({ latitud: lat, longitud: lng, address: addr = null }) {
    // Guardar coordenadas internamente (aunque no mostramos los campos)
    if (lat != null && lng != null) {
        latitude.value = Number(lat).toFixed(6);
        longitude.value = Number(lng).toFixed(6);
    }

    // Si el reverse geocoding devolvió dirección, actualizar el campo address (disabled)
    if (addr) {
        address.value = addr;
    } else {
        // opcional: podríamos llamar a un reverse geocode aquí si el Map no lo envía
    }
}

function onCampusChange() {
    const sel = campuses.value.find((c) => c.id == selectedCampusId.value);
    if (sel) {
        // esperar formato: sel.lat, sel.lng or sel.latitude/longitude
        const lat = sel.lat || sel.latitude || sel.latitud || sel.latitude;
        const lng = sel.lng || sel.longitude || sel.longitud || sel.longitude;
        if (lat && lng) {
            selectedCampusCoords.value = { latitud: lat, longitud: lng };
        } else {
            // if campus item has nested structure, try sedes
            if (sel.sedes && sel.sedes.length) {
                const s = sel.sedes[0];
                selectedCampusCoords.value = { latitud: s.lat || s.latitude, longitud: s.lng || s.longitude };
            }
        }
    } else {
        selectedCampusCoords.value = null;
    }
}

function onRoomsChange() {
    // Ensure at least 1 bedroom
    if (!rooms.value || Number(rooms.value) < 1) {
        rooms.value = 1;
    }
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
