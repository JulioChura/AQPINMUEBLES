<template>
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        id="property-editor-modal">
        <div
            class="bg-background-light dark:bg-background-dark rounded-xl shadow-2xl max-w-5xl w-full h-[90vh] flex flex-col p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-[#333333] dark:text-white">Editar Propiedad</h2>
                <button class="text-[#888888] hover:text-primary" id="close-modal-button" @click="closeModal">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>
            <div class="flex flex-1 gap-6 overflow-hidden">
                <div class="flex flex-col flex-1 gap-6">
                    <div class="bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden flex-1 relative">
                        <MapSelectUbi v-if="propiedadEditable.latitude && propiedadEditable.longitude"
                            @ubicacion-seleccionada="actualizarUbicacion"
                            :predefinedUbication="{ latitud: propiedadEditable.latitude, longitud: propiedadEditable.longitude }" />
                        <div v-if="openSection !== 'basic'"
                            class="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-white text-lg font-semibold"
                            style="z-index: 9999">
                            Activa el mapa abriendo Información Básica
                        </div>
                    </div>
                    <div
                        class="flex flex-col gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <h3 class="text-lg font-semibold text-[#333333] dark:text-white">Imágenes de la Propiedad</h3>
                        <div class="grid grid-cols-3 gap-3 max-h-[100px] overflow-y-auto ">
                            <!-- Imágenes existentes -->
                            <div v-for="(photo, index) in propiedadEditable.nextPhotos" :key="index"
                                class="relative w-full h-24 bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center text-gray-500">
                                <img :alt="`Imagen de la Propiedad ${index + 1}`" class="w-full h-full object-cover"
                                    :src="photo" />
                                <button @click="removeImage(index)"
                                    class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600">
                                    <span class="material-symbols-outlined text-sm">delete</span>
                                </button>
                            </div>
                            <div @click="triggerFileSelect" @dragover.prevent @dragenter.prevent
                                @drop.prevent="handleDrop"
                                class="w-full h-24 bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 text-[#888888] dark:text-gray-400 transition">
                                <span class="material-symbols-outlined text-2xl">add_a_photo</span>
                                <p class="text-xs mt-1">Agregar Imagen</p>
                            </div>
                        </div>
                        <button @click="triggerFileSelect"
                            class="flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90">
                            Subir Nueva Imagen
                        </button>
                        <input ref="fileInput" type="file" multiple accept="image/*" class="hidden"
                            @change="handleFiles" />
                    </div>
                </div>
                <div class="flex flex-col w-96 min-w-80 gap-6  overflow-auto">
                    <!-- 🔹 Basic Information -->
                    <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <div class="flex justify-between items-center cursor-pointer text-lg font-semibold text-[#333333] dark:text-white"
                            @click="toggleSection('basic')">
                            Información Básica
                            <span class="material-symbols-outlined">
                                {{ openSection === 'basic' ? 'expand_less' : 'expand_more' }}
                            </span>
                        </div>

                        <transition name="fade">
                            <div v-if="openSection === 'basic'" class="mt-4">
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-[#333333] dark:text-white mb-2"
                                        for="property-title">Título de la Propiedad</label>
                                    <input
                                        class="form-input w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-gray-700 text-[#333333] dark:text-white p-2"
                                        id="property-title" type="text" v-model="propiedadEditable.title" />
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-[#333333] dark:text-white mb-2"
                                        for="property-address">Dirección</label>
                                    <input
                                        class="form-input w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-gray-700 text-[#333333] dark:text-white p-2"
                                        id="property-address" type="text" v-model="propiedadEditable.address" />
                                </div>
                                <div class="flex gap-4 mb-4">
                                    <div class="flex-1">
                                        <label class="block text-sm font-medium text-[#333333] dark:text-white mb-2"
                                            for="latitude">Latitud</label>
                                        <input
                                            class="form-input w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-gray-700 text-[#333333] dark:text-white p-2"
                                            id="latitude" type="text" v-model="propiedadEditable.latitude" disabled />
                                    </div>
                                    <div class="flex-1">
                                        <label class="block text-sm font-medium text-[#333333] dark:text-white mb-2"
                                            for="longitude">Longitud</label>
                                        <input
                                            class="form-input w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-gray-700 text-[#333333] dark:text-white p-2"
                                            id="longitude" type="text" v-model="propiedadEditable.longitude" disabled />
                                    </div>

                                </div>
                                <!-- Tipo y habitaciones -->
                                <div class="flex gap-4">
                                    <div class="flex-1">
                                        <label class="block text-sm font-medium text-[#333333] dark:text-white mb-2"
                                            for="accommodation_typ">Tipo de Propiedad</label>
                                        <select id="accommodation_typ"
                                            class="form-select w-full rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary text-base"
                                            v-model="propiedadEditable.accommodation_type">
                                            <option v-for="t in tiposPropiedad" :key="t.id" :value="t.id">
                                                {{ t.name }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="flex-1">
                                        <label class="block text-sm font-medium text-[#333333] dark:text-white mb-2"
                                            for="bedrooms">Habitaciones</label>
                                        <input id="bedrooms"
                                            class="form-input w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-gray-700 text-[#333333] dark:text-white p-2"
                                            type="text" v-model="propiedadEditable.rooms" />
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>

                    <!-- 🔹 Description -->
                    <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <div class="flex justify-between items-center cursor-pointer text-lg font-semibold text-[#333333] dark:text-white"
                            @click="toggleSection('description')">
                            Descripción
                            <span class="material-symbols-outlined">
                                {{ openSection === 'description' ? 'expand_less' : 'expand_more' }}
                            </span>
                        </div>

                        <transition name="fade">
                            <div v-if="openSection === 'description'" class="mt-4">
                                <textarea
                                    class="form-textarea w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-gray-700 text-[#333333] dark:text-white p-2 min-h-[100px]"
                                    placeholder="Ingresa una descripción detallada de la propiedad."
                                    v-model="propiedadEditable.description"></textarea>

                                <!-- Reglas de convivencia (editable) -->
                                <div class="mt-4">
                                    <label class="block text-sm font-medium text-[#333333] dark:text-white mb-2">Reglas de convivencia</label>
                                    <textarea
                                        class="form-textarea w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-gray-700 text-[#333333] dark:text-white p-2 min-h-[120px]"
                                        placeholder="Escribe las reglas de convivencia. Los saltos de línea se preservarán al guardar."
                                        v-model="propiedadEditable.coexistence_rules"></textarea>
                                </div>
                            </div>
                        </transition>
                    </div>
                    <!-- 🔹 Amenities -->
                    <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <div class="flex justify-between items-center select-none cursor-pointer text-lg font-semibold text-[#333333] dark:text-white"
                            @click="toggleSection('amenities')">
                            Servicios
                            <span class="material-symbols-outlined">
                                {{ openSection === 'amenities' ? 'expand_less' : 'expand_more' }}
                            </span>
                        </div>

                        <transition name="fade">
                            <div v-if="openSection === 'amenities'" class="mt-4">
                                <div class="grid grid-cols-2 gap-3">
                                    <button v-for="item in amenities" :key="item.id" @click="toggleAmenity(item.id)"
                                        class="max-h-[50px]"
                                        :class="[
                                            'flex items-center gap-2 rounded-lg p-2 border transition-all',
                                            propiedadEditable.nextServices.includes(item.id)
                                                ? 'bg-blue-500 text-white border-blue-600'
                                                : 'bg-white dark:!bg-gray-700 border-gray-300 dark:!border-gray-600 text-gray-700 dark:!text-white hover:bg-gray-100 dark:hover:!bg-gray-600',
                                        ]">
                                        <ServiceIcon :name="item.icon_name || item.icon_class" :url="item.image_url" :size="24" :class="propiedadEditable.nextServices.includes(item.id) ? 'text-white' : 'text-gray-700 dark:text-white'" />
                                        <span>{{ item.name }}</span>
                                    </button>
                                </div>
                            </div>

                        </transition>
                    </div>
                    <!-- 🔹 Price -->
                    <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <div class="flex justify-between items-center cursor-pointer text-lg font-semibold text-[#333333] dark:text-white"
                            @click="toggleSection('price')">
                            Precio
                            <span class="material-symbols-outlined">
                                {{ openSection === 'price' ? 'expand_less' : 'expand_more' }}
                            </span>
                        </div>

                        <transition name="fade">
                            <div v-if="openSection === 'price'" class="mt-4">
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-[#333333] dark:text-white mb-2"
                                        for="price">Precio Mensual</label>
                                    <input
                                        class="form-input w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-gray-700 text-[#333333] dark:text-white p-2"
                                        id="price" type="number" v-model.number="propiedadEditable.monthly_price" />
                                </div>
                            </div>

                        </transition>
                    </div>
                </div>
            </div>
            <div class="flex justify-end gap-3 mt-6">
                <button @click="closeModal"
                    class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 border border-gray-300 dark:border-gray-600 text-[#333333] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-100 dark:hover:bg-gray-700">
                    <span class="truncate">Cancelar</span>
                </button>
                <button @click="saveChanges"
                    class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90">
                    <span class="truncate">Guardar Cambios</span>
                </button>
            </div>
        </div>
    </div>
    <Loader :show="loading" :message="loaderMessage" />
</template>

<script setup>
import ServiceIcon from '/src/components/icons/ServiceIcon.vue';
import { ref, watch, onMounted } from "vue";
import { useGestionPropiedades } from "/src/stores/useGestionPropiedades.js";
import { webPageData } from '/src/stores/webPageData.js';
import MapSelectUbi from '/src/components/MisPropiedades/AgregarPropiedad/MapSelectUbi.vue';
import Loader from '/src/components/Loader.vue';

const storePropiedades = useGestionPropiedades();
const openSection = ref(null); // Guarda el nombre de la sección abierta
const tiposPropiedad = ref([]);
const amenities = ref([])
const storeWebPageData = webPageData();
const fileInput = ref(null);

const propiedadEditable = ref({
    id: 0,
    title: "",
    description: "",
    address: "",
    accommodation_type: "",
    rooms: 0,
    latitude: "",
    longitude: "",
    previousServices: [],
    nextServices: [],
    photos: [],
    monthly_price: 0,
    coexistence_rules: "",
});
const loading = ref(false)
const loaderMessage = ref('')


const props = defineProps({
    id: { type: [String, Number], required: true, },
    visible: { type: Boolean, default: true, },
});

function toggleAmenity(id) {
    const current = propiedadEditable.value.nextServices;
    const index = current.indexOf(id);

    if (index === -1) {
        current.push(id);
    } else {
        current.splice(index, 1);
    }

    console.log("  Amenidades seleccionadas (nextServices):", JSON.stringify(current));
}


function toggleSection(sectionName) {
    // Si se hace clic en la misma, se cierra; si es otra, se cambia
    openSection.value = openSection.value === sectionName ? null : sectionName;
}

const fetchMyPropertiePrivate = async (id) => {
    try {
        const data = await storePropiedades.getMyPropiedadActual(id);

        propiedadEditable.value = {
            id: data.id || 0,
            title: data.title || "",
            description: data.description || "",
            address: data.address || "",
            accommodation_type: data.accommodation_type || "",
            rooms: data.rooms || 0,
            latitude: data.latitude || "",
            longitude: data.longitude || "",
            previousServices: data.services || [],
            nextServices: (data.services || [])
                .map(serviceObj => serviceObj.service?.id)
                .filter(id => id !== undefined && id !== null),
            photos: data.photos || [],
            nextPhotos: (data.photos || [])
                .map(photo => photo.image)
                .filter(image => image !== undefined && image !== null),
            monthly_price: data.monthly_price || 0,
            // Convertir <br> y <p> a saltos de línea para mostrar en textarea al editar
            coexistence_rules: (function () {
                const raw = data.coexistence_rules || "";
                // Reemplaza <br> por \n y separa párrafos <p>...</p> con doble salto
                let text = String(raw).replace(/<br\s*\/?>/gi, '\n');
                text = text.replace(/<\/p>\s*<p>/gi, '\n\n');
                // Elimina etiquetas HTML restantes
                text = text.replace(/<[^>]+>/g, '');
                return text;
            })(),
        };


        console.log("🆕 nextServices cargadas:", JSON.stringify(propiedadEditable.value.nextServices));
        console.log("🆕 nextPhotos cargadas:", JSON.stringify(propiedadEditable.value.nextPhotos));

    } catch (err) {
        console.error("Error al obtener propiedad id ", id, " :", err);
    }
};

const fetchTiposPropiedad = async () => {
    try {
        tiposPropiedad.value = await storeWebPageData.getTiposDePropiedad();
    } catch (err) {
        console.error("Error al obtener tipos de propiedad:", err);
    }

};
const fetchAmenities = async () => {
    try {
        amenities.value = await storeWebPageData.getServicios()
    } catch (err) {
        console.error("Error al obtener tipos de servicios:", err)
    }
}

function actualizarUbicacion({ latitud: lat, longitud: lng }) {
    // Acepta lat/lng como number o string; normaliza a number antes de usar toFixed
    const latNum = typeof lat === 'string' ? parseFloat(lat) : Number(lat);
    const lngNum = typeof lng === 'string' ? parseFloat(lng) : Number(lng);

    if (!Number.isFinite(latNum) || !Number.isFinite(lngNum)) {
        console.warn('actualizarUbicacion: coordenadas no numéricas recibidas', lat, lng);
        // Guarda los valores tal cual (evita romper), pero no aplicar toFixed
        propiedadEditable.value.latitude = lat;
        propiedadEditable.value.longitude = lng;
        return;
    }

    propiedadEditable.value.latitude = latNum.toFixed(6);
    propiedadEditable.value.longitude = lngNum.toFixed(6);
}
function triggerFileSelect() {
    fileInput.value?.click();
}

function handleFiles(event) {
    const files = event.target.files;
    processFiles(files);
}

function handleDrop(event) {
    const files = event.dataTransfer.files;
    processFiles(files);
}

function processFiles(files) {
    for (const file of files) {
        if (!file.type.startsWith('image/')) continue;
        if (file.size > 10 * 1024 * 1024) continue; // límite 10MB
        const reader = new FileReader();
        reader.onload = (e) => {
            propiedadEditable.value.nextPhotos.push(e.target.result);
            console.log("imagen agregada :", JSON.stringify(propiedadEditable.value.nextPhotos))
        };
        reader.readAsDataURL(file);
    }

    // Limpia el input después de cada carga (para poder volver a seleccionar las mismas imágenes)
    if (fileInput.value) {
        fileInput.value.value = "";
    }
}

function removeImage(index) {
    propiedadEditable.value.nextPhotos.splice(index, 1);
    console.log("imagen eliminada :", JSON.stringify(propiedadEditable.value.nextPhotos))
}
const emit = defineEmits(["close"]);

function closeModal() {
    emit("close");
}

async function saveChanges() {
    const payload = {
        ...propiedadEditable.value,
    };
    try {
        loading.value = true
        loaderMessage.value = 'Actualizando Propiedad...'
        console.log("Formulario listo para enviar:", JSON.stringify(payload));

        await storePropiedades.actualizarMyPropiedadAllProperties(payload)
        //volver a cargar mis propiedades
        await storePropiedades.updateStateMisPropiedades();
        emit("close");
    } catch (err) {
        console.error("  Error al publicar propiedad:", err.response?.data || err);
    } finally {
        loading.value = false
    }

}
onMounted(async () => {
    await fetchTiposPropiedad();
    await fetchAmenities();
});
// 🔹 Se ejecuta cada vez que cambia props.id
watch(
    () => props.id,
    (newId, oldId) => {
        if (newId !== oldId) {
            fetchMyPropertiePrivate(newId);
        }
    },
    { immediate: true } // puedes poner true si quieres que también corra al montar
);
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    max-height: 0;
    overflow: hidden;
}
</style>