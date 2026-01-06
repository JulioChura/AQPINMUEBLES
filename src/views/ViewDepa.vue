<template>
    <div class="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-white">
        <div class="flex flex-col min-h-screen">
            <HeaderComponent />

            <main class="flex-grow">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div class="mb-4">
                        <button @click="goBack"
                            class="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                            <span class="material-symbols-outlined">arrow_back</span>
                            <span>Volver</span>
                        </button>
                    </div>
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div class="lg:col-span-2">
                            <div>
                                <div v-if="!propiedad?.photos?.length || propiedad.photos.length === 0"
                                    class="h-[500px] bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-500">
                                    Sin imágenes disponibles
                                </div>
                                <template v-else>
                                    <div class="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-xl overflow-hidden md:h-[500px] items-stretch">
                                        <div class="col-span-1 md:col-span-3 h-auto md:h-full aspect-[4/3] md:aspect-auto cursor-pointer" @click="openImageModal(0)">
                                            <img :src="mainPhoto?.image" alt="Imagen principal" class="w-full h-full object-cover" />
                                        </div>
                                        <div class="hidden md:grid col-span-1 grid-rows-4 gap-2 h-full">
                                            <template v-for="(photo, index) in sidePhotos.slice(0, 4)" :key="index">
                                                <div class="relative h-full cursor-pointer" @click="openImageModal(index+1)">
                                                    <img :src="photo.image || defaultImage" alt="Foto adicional" class="w-full h-full object-cover" />
                                                </div>
                                            </template>
                                            <div v-if="sidePhotos.length === 0" class="h-full flex items-center justify-center text-gray-400">Sin imágenes adicionales</div>
                                        </div>
                                    </div>
                                    <div v-if="propiedad.photos.length > 1" class="grid grid-cols-4 gap-2 md:hidden mt-2">
                                        <div v-for="(photo, index) in propiedad.photos.slice(1, 5)" :key="index"
                                            class="aspect-square cursor-pointer" @click="openImageModal(index+1)">
                                            <img :src="photo.image || defaultImage" alt="Foto adicional" class="w-full h-full object-cover rounded-md" />
                                        </div>
                                    </div>
                                    <div v-if="showImageModal" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80">
                                        <div class="relative flex items-center">
                                            <button @click="prevImage" class="absolute left-[-3rem] top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10">
                                                <span class="material-symbols-outlined">chevron_left</span>
                                            </button>
                                            <img :src="currentImage" class="max-h-[80vh] max-w-[90vw] rounded-xl shadow-2xl border-4 border-white z-20" />
                                            <button @click="nextImage" class="absolute right-[-3rem] top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10">
                                                <span class="material-symbols-outlined">chevron_right</span>
                                            </button>
                                            <button @click="closeImageModal" class="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700 font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-md z-30">✕</button>
                                        </div>
                                    </div>
                                </template>
                            </div>

                            <div class="mt-8">
                                <div class="flex flex-col md:flex-row md:items-start md:justify-between">
                                    <div>
                                        <div class="flex flex-wrap items-center gap-3"> <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"> {{ propiedad.title || "aca va el titulo" }}
                                            </h1>
                                            <button @click="toggleFavorite"
                                                :class="[ 'rounded-full flex items-center justify-center transition-all flex-shrink-0', isFavorite ? 'bg-primary text-white p-2' : 'bg-white dark:bg-background-dark border-2 border-primary text-primary p-1' ]"
                                            >
                                                <span v-if="isFavorite" class="material-symbols-outlined">favorite</span>
                                                <span v-else class="material-symbols-outlined">favorite_border</span>
                                            </button>
                                        </div>
                                        <p class="mt-2 text-base sm:text-lg text-gray-600 dark:text-gray-400"> {{ propiedad.address || "aca va la direccion" }}
                                        </p>
                                        <div class="mt-4 flex flex-wrap gap-4 sm:gap-6 text-sm text-gray-600 dark:text-gray-400"> <div class="flex items-center gap-2">
                                                    <span class="material-symbols-outlined text-base">bed</span>
                                                    <span>{{ propiedad.rooms || '-' }} hab</span>
                                                </div>
                                                <div class="flex items-center gap-2">
                                                    <span class="material-symbols-outlined text-base">directions_walk</span>
                                                    <span>{{ routeInfo.label || '—' }}</span>
                                                </div>
                                                <div v-if="routeInfo.durationText" class="flex items-center gap-2 text-sm text-gray-500">
                                                    <span class="material-symbols-outlined text-sm">schedule</span>
                                                    <span>{{ routeInfo.durationText }}</span>
                                                </div>
                                            </div>
                                    </div>
                                    <div class="mt-4 md:mt-0 flex-shrink-0"> <div class="text-2xl sm:text-3xl font-bold text-primary"> {{ propiedad.monthly_price || "aca va monthly_price"
                                            }}<span
                                                class="text-lg font-medium text-gray-500 dark:text-gray-400">/mes</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                                    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                        Acerca de esta propiedad
                                    </h2>
                                    <p class="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {{ propiedad.description || "aca va description" }}
                                    </p>
                                    <div v-if="propiedad.coexistence_rules" class="mt-6">
                                        <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Reglas de convivencia</h3>
                                        <div class="prose max-w-none text-gray-700 dark:text-gray-300" v-html="coexistenceHtml"></div>
                                    </div>
                                </div>
                                <div v-if="propiedad?.services?.length"
                                    class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                                    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                        Servicios
                                    </h2>

                                    <div class="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                        <div v-for="(item, index) in propiedad.services" :key="item.id || index"
                                                class="flex items-center gap-2 text-sm sm:text-base"> <ServiceIcon :name="item.service.icon_name || item.service.icon_class" :url="item.service.image_url" class="text-primary" :size="20" />
                                                <span>{{ item.service.name }}</span>
                                            </div>
                                    </div>
                                </div>

                                <div v-else class="mt-8 text-gray-500 dark:text-gray-400">
                                    No hay servicios disponibles
                                </div>


                                <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                                    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                        Ubicacion
                                    </h2>
                                    <div class="mt-4 flex flex-wrap gap-4">
                                                            <FilterButtonMultipleOptions :opciones="universities.map((u) => u.name)"
                                                                :defaultOption="selectedUniversity?.name || ''"
                                                                @optionFiltroSelected="handleUniversitySelected" />

                                                            <FilterButtonMultipleOptions v-if="selectedUniversity"
                                                                :opciones="selectedUniversity.sedes.map((s) => s.name)"
                                                                :defaultOption="selectedSede?.name || ''"
                                                                @optionFiltroSelected="handleSedeSelected" />
                                    </div>

                                        <div
                                            class="mt-4 aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden">
                                        <MapView v-if="propiedad.latitude && propiedad.longitude"
                                            :latitudCasa="propiedad.latitude" :longitudCasa="propiedad.longitude"
                                            :latitudUni="selectedSede?.lat" :longitudUni="selectedSede?.lng"
                                            :UniImgUrl="selectedUniversity?.imageUrl || ''" :routeGeoJson="routeInfo.route" />
                                    </div>
                                </div>
                                <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                                    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                        Comentarios
                                    </h2>
                                    <div class="mt-6 space-y-6">

                                        <Comentario v-for="review in actualReviews" :key="review.id"
                                            :imagen="review.user.avatar || '/src/public/default_avatar.png'"
                                            :autor="`${toStartCase(review.user.first_name)} ${toStartCase(review.user.last_name)}`"
                                            :diasAntiguedad="calcularDiasAntiguedad(review.review_date)"
                                            :comentario="review.comment" :isAutor="esAutor(review.user.id)" />


                                        <div class="mt-8">
                                            <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                                Deja un comentario
                                            </h3>
                                            <div class="flex items-start gap-4">
                                                <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 flex-shrink-0"
                                                    :style="{
                                                        backgroundImage: `url(${auth.user?.avatar || '/src/public/default_avatar.png'
                                                            })`,
                                                    }"></div>
                                                <div class="flex-1">
                                                    <textarea v-model="nuevoComentarioComment"
                                                        class="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-primary focus:border-primary transition"
                                                        placeholder="Escribe tu comentario..." rows="4"></textarea>
                                                    <button @click="publicarComentario"
                                                        class="mt-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                                                        Publicar Comentario
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="hidden lg:block relative">
                            <div class="sticky top-24">
                                <div
                                    class="bg-white dark:!bg-background-dark rounded-xl shadow-lg border border-gray-200 dark:!border-gray-800 p-6">
                                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                                        Contactar Propietario
                                    </h3>

                                    <div class="mt-4 flex items-center gap-4">
                                        <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-14 flex-shrink-0"
                                            :style="{
                                                backgroundImage: `url(${propiedad.user?.avatar || '/src/public/default_avatar.png'
                                                    })`,
                                            }"></div>

                                        <div>
                                            <p class="font-semibold text-gray-800 dark:text-white">
                                                {{ toStartCase(propiedad.user?.first_name) }}
                                                {{ toStartCase(propiedad.user?.last_name) }}
                                            </p>
                                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                                Agente de Rentas
                                            </p>

                                            <div class="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                                                <div class="flex items-center gap-2">
                                                    <span class="material-symbols-outlined text-base">call</span>
                                                    <span>{{ propiedad.owner?.phone_number || 'Sin número disponible'
                                                        }}</span>
                                                </div>
                                                <div class="flex items-center gap-2">
                                                    <span class="material-symbols-outlined text-base">mail</span>
                                                    <span>{{ propiedad.user?.email || 'Sin correo disponible' }}</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="mt-6 space-y-4">
                                        <button
                                            @click="sendWhatsApp"
                                            class="w-full bg-primary text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                                            <span class="material-symbols-outlined">phone</span>
                                            <span>Consultar sobre la propiedad</span>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        
        <div class="fixed bottom-0 left-0 right-0 lg:hidden p-4 bg-white dark:bg-background-dark shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div class="flex items-center justify-between">
                <div class="text-xl font-bold text-primary">
                    {{ propiedad.monthly_price || "aca va monthly_price" }}
                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">/mes</span>
                </div>
                <button
                    @click="sendWhatsApp"
                    class="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                    <span class="material-symbols-outlined text-base">phone</span>
                    <span>Contactar</span>
                </button>
            </div>
        </div>

    </div>
    <LoginModal :show="showLogin" @close="showLogin = false" @login-success="onLoginSuccess" />
    
</template>

<script setup>
// ... (El script permanece sin cambios)

// Modal para ver imagen completa con navegación
import { ref as vueRef } from 'vue';
const showImageModal = vueRef(false);
const currentImage = vueRef('');
const currentImageIdx = vueRef(0);
function openImageModal(idx) {
    if (!propiedad.value?.photos?.length) return;
    currentImageIdx.value = idx;
    currentImage.value = propiedad.value.photos[idx]?.image || defaultImage;
    showImageModal.value = true;
}
function closeImageModal() {
    showImageModal.value = false;
    currentImage.value = '';
}
function nextImage() {
    if (!propiedad.value?.photos?.length) return;
    currentImageIdx.value = (currentImageIdx.value + 1) % propiedad.value.photos.length;
    currentImage.value = propiedad.value.photos[currentImageIdx.value]?.image || defaultImage;
}
function prevImage() {
    if (!propiedad.value?.photos?.length) return;
    currentImageIdx.value = (currentImageIdx.value - 1 + propiedad.value.photos.length) % propiedad.value.photos.length;
    currentImage.value = propiedad.value.photos[currentImageIdx.value]?.image || defaultImage;
}
import LoginModal from "../components/authorization/LoginModal.vue";
import ServiceIcon from '/src/components/icons/ServiceIcon.vue'
import { ref, computed, onMounted } from "vue";
import DOMPurify from 'dompurify';
import { useRoute, useRouter } from "vue-router";
import MapView from "../components/MapView.vue";
import FilterButtonMultipleOptions from "../components/FilterButtonMultipleOptions.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import { useGestionPropiedades } from "/src/stores/useGestionPropiedades.js";
import Comentario from "../components/Comentario.vue";
import { useGestionComments } from "/src/stores/useGestionComments.js";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth";
const auth = useAuthStore();
console.log("usuario en view depa", JSON.stringify(auth.user, null, 2));
const showLogin = ref(false);

// Accedemos al parámetro "id" desde la URL
const route = useRoute();
const router = useRouter();
const id = computed(() => route.params.id);
const storePropiedades = useGestionPropiedades();
const storeComentarios = useGestionComments();
const isPrivate = route.query.isPrivate === "true";

const { nuevoComentarioComment, nuevoComentarioAccomodationId } = storeToRefs(storeComentarios);
const actualReviews = ref([])

const publicarComentario = async () => {
    if (auth.user){
        const newComentario= await storeComentarios.publicarComentario();
        actualReviews.value = [...actualReviews.value, newComentario]
    }else{
        //si el usuario no esta logeado abrir modal
        showLogin.value = true;
    }
    
};

const onLoginSuccess = () => {
    console.log('Evento login-success recibido');
  showLogin.value = false;
};

// Variables reactivas
const universities = ref([]);
const selectedUniversity = ref(null);
const selectedSede = ref(null);

// Load universities from API and normalize shape (id, name, imageUrl, sedes with lat/lng)
const loadUniversities = async () => {
    try {
        const fetched = await storePropiedades.fetchUniversities();
        const uniArray = Array.isArray(fetched) ? fetched : [];
        const parseNum = (v) => {
            if (v === null || v === undefined) return null;
            const n = Number(v);
            return Number.isFinite(n) ? n : null;
        };
        universities.value = uniArray.map((u) => ({
            id: u.id,
            name: u.name,
            imageUrl: u.logo || u.imageUrl || null,
            sedes: (u.campuses || []).map((c) => ({
                id: c.id,
                name: c.name,
                lat: parseNum(c.latitude ?? c.lat ?? c.latitud ?? (c.location && c.location.lat) ?? null),
                lng: parseNum(c.longitude ?? c.lng ?? c.longitud ?? (c.location && c.location.lng) ?? null),
            })),
        }));

        // default selection: first university + first campus if not already set
        if (!selectedUniversity.value && universities.value.length) {
            selectedUniversity.value = universities.value[0];
            selectedSede.value = selectedUniversity.value.sedes?.[0] || null;
        }
    } catch (e) {
        console.error('loadUniversities error', e);
        universities.value = [];
    }
};
const propiedad = ref({});

const fetchMyPropertiePrivate = async (id) => {
    try {
        await storePropiedades.updateStateMyPropiedadActual(id);
        propiedad.value = await storePropiedades.getMyPropiedadActual(id);
        nuevoComentarioAccomodationId.value = propiedad.value.id
        actualReviews.value = propiedad.value.reviews
    } catch (err) {
        console.error("Error al obtener propiedad id ", id, " :", err);
    }
};
const fetchMyPropertiePublic = async (id) => {
    try {
        // Pass selected university id so serializer can include route GeoJSON for that university
        const params = {};
        if (selectedUniversity.value && selectedUniversity.value.id) params.university_id = selectedUniversity.value.id;
        await storePropiedades.updateStatePropiedadPublicaActual(id, params);
        propiedad.value = await storePropiedades.getPropiedadPublicaActual(id);
        nuevoComentarioAccomodationId.value = propiedad.value.id
        actualReviews.value = propiedad.value.reviews
    } catch (err) {
        console.error("Error al obtener propiedad id ", id, " :", err);
    }
};

const defaultImage = "https://placehold.co/500x300?text=Sin+imagen";

// Compute route/distance/duration info for the currently selected university/campus
const routeInfo = computed(() => {
    try {
        if (!propiedad.value || !selectedUniversity.value || !Array.isArray(propiedad.value.university_distances)) {
            return { route: null, label: null, durationText: null };
        }

        const match = propiedad.value.university_distances.find((d) => {
            if (d.campus_university_id != null) return Number(d.campus_university_id) === Number(selectedUniversity.value.id);
            if (d.campus && typeof d.campus === 'string') return d.campus.toLowerCase().includes(String(selectedUniversity.value.name).toLowerCase());
            // fallback: if selectedSede coordinates are available, try match by coordinates
            if (selectedSede.value && d.campus_lat != null && d.campus_lng != null) {
                const a = Number(d.campus_lat);
                const b = Number(d.campus_lng);
                return Math.abs(a - selectedSede.value.lat) < 0.0005 && Math.abs(b - selectedSede.value.lng) < 0.0005;
            }
            return false;
        });

        if (!match) {
            return { route: null, label: null, durationText: null };
        }

        // Build label and duration
        const distanceKm = match.distance_km != null ? String(match.distance_km) : (match.distance_meters != null ? `${(Number(match.distance_meters)/1000).toFixed(2)}` : null);
        const minutes = match.walk_time_minutes != null ? Number(match.walk_time_minutes) : (match.duration_seconds != null ? Math.round(Number(match.duration_seconds)/60) : null);
        const label = distanceKm ? (minutes ? `${distanceKm} km` : `${distanceKm} km`) : (minutes ? `${minutes} min` : null);
        const durationText = minutes ? `${minutes} min` : (match.duration_text || null);

        return { route: match.route || null, label, durationText };
    } catch (e) {
        console.warn('routeInfo compute error', e);
        return { route: null, label: null, durationText: null };
    }
});

const mainPhoto = computed(
    () =>
        propiedad.value?.photos?.find((p) => p.is_main) ||
        propiedad.value?.photos?.[0] ||
        null
);

const sidePhotos = computed(
    () => propiedad.value?.photos?.filter((p) => !p.is_main) || []
);

const coexistenceHtml = computed(() => {
    try {
        const raw = propiedad.value?.coexistence_rules || '';
        // DOMPurify.sanitize returns a string safe for v-html
        return DOMPurify.sanitize(raw);
    } catch (e) {
        console.warn('coexistenceHtml sanitize failed', e);
        return '';
    }
});

const calcularDiasAntiguedad = (fecha) => {
  const fechaReview = new Date(fecha)
  const hoy = new Date()
  const diff = Math.floor((hoy - fechaReview) / (1000 * 60 * 60 * 24))
  return diff
}

// Determina si el usuario actual es el autor
const esAutor = (userId) => userId === propiedad.value.user.id


// Inicialización
onMounted(async () => {
    console.log("ID recibido desde la URL:", id.value);
    // load universities first so we have real ids and campus coords
    await loadUniversities();
    // Ensure favoritesMap is populated for authenticated users so heart state is correct
    try {
        if (auth.user) await storePropiedades.fetchFavorites();
    } catch (e) {
        console.warn('Could not fetch favorites on mount', e);
    }
    if (isPrivate) {
        console.log("propiedad privada");
        fetchMyPropertiePrivate(id.value);
    } else {
        console.log("propiedad publica");
        await fetchMyPropertiePublic(id.value);
    }
});

// Métodos
const handleUniversitySelected = (universityName) => {
    // pick the university object from the normalized `universities` list
    const found = universities.value.find((u) => u.name === universityName) || null;
    selectedUniversity.value = found;
    selectedSede.value = found ? (found.sedes?.[0] || null) : null;
    console.log("Universidad seleccionada:", selectedUniversity.value);
    // After user selects a different university, refetch the public property detail
    // so backend can include route/distance for the newly selected university.
    if (!isPrivate) {
        fetchMyPropertiePublic(id.value);
    }
};

const handleSedeSelected = (sedeName) => {
    if (!selectedUniversity.value) return;
    selectedSede.value = selectedUniversity.value.sedes.find(
        (s) => s.name === sedeName
    );
    console.log("Sede seleccionada:", selectedSede.value);
};
const toStartCase = (text) => {
    if (!text) return ''; // si es null, undefined o vacío → devuelve cadena vacía
    return text
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase());
};

const goBack = () => {
    router.back();
};

// WhatsApp helper: build an emoji-rich message and open WhatsApp Web/mobile
const sendWhatsApp = () => {
    try {
        const ownerPhone = propiedad.value?.owner?.phone_number || propiedad.value?.user?.phone_number || '';
        let rawPhone = String(ownerPhone || '').trim();
        if (!rawPhone) {
            alert('Número del anunciante no disponible');
            return;
        }

        // Normalize phone: keep digits and plus sign, then remove leading + for wa.me
        const cleaned = rawPhone.replace(/[^\d+]/g, '');
        const waPhone = cleaned.replace(/^\+/, '');

        // Prepare plain-text rules from stored HTML (convert <br> and <p> to newlines)
        const rawRulesHtml = propiedad.value?.coexistence_rules || '';
        let rulesText = 'No especificadas';
        if (rawRulesHtml) {
            const sanitized = DOMPurify.sanitize(rawRulesHtml, { ALLOWED_TAGS: ['br', 'p'] });
            rulesText = String(sanitized).replace(/<br\s*\/?\s*>/gi, '\n').replace(/<\/p>\s*<p>/gi, '\n\n').replace(/<[^>]+>/g, '');
            rulesText = rulesText.trim();
        }

        const title = propiedad.value?.title || 'Sin título';
        const price = propiedad.value?.monthly_price ? `S/${propiedad.value.monthly_price}` : 'No especificado';
        const address = propiedad.value?.address || 'No especificada';
        const rooms = propiedad.value?.rooms != null ? propiedad.value.rooms : '—';
        const link = window.location.href;

        // Try to use authenticated user's name if available
        const userName = auth.user ? `${auth.user.first_name || ''} ${auth.user.last_name || ''}`.trim() : '';
        const greeting = userName ? `Hola, soy ${userName}.` : 'Hola';

        const message = [
            `${greeting} Vi tu publicación en AQPinMuebles y me interesa esta opción.`,
            '',
            `Título: ${title}`,
            `Precio: ${price}`,
            `Dirección: ${address}`,
            `Habitaciones: ${rooms}`,
            '',
            `Reglas de convivencia:\n${rulesText}`,
            '',
            `Enlace: ${link}`,
            '',
            '¿Está disponible? ¿Podríamos coordinar una visita esta semana? Muchas gracias.'
        ].join('\n');

        const encoded = encodeURIComponent(message);

        // Use wa.me link (works on web and mobile). If the phone seems too short, warn user.
        if (waPhone.length < 7) {
            if (!confirm('El número parece incompleto. ¿Deseas abrir WhatsApp de todos modos?')) return;
        }

        const url = `https://wa.me/${waPhone}?text=${encoded}`;
        window.open(url, '_blank');
    } catch (e) {
        console.error('sendWhatsApp error', e);
        alert('No se pudo abrir WhatsApp. Revisa la consola para más detalles.');
    }
};

// Favorites helpers
const isFavorite = computed(() => {
    const id = propiedad.value?.id;
    if (!id) return false;
    // Read a snapshot of favoritesMap so Vue tracks changes to it
    const snapshot = storePropiedades.favoritesMap ? JSON.stringify(storePropiedades.favoritesMap) : '';
    void snapshot;
    return !!(storePropiedades.favoritesMap && storePropiedades.favoritesMap[id]);
});

const toggleFavorite = async () => {
    const id = propiedad.value?.id;
    if (!id) return;
    if (!auth.user) {
        showLogin.value = true;
        return;
    }
    try {
        if (storePropiedades.favoritesMap && storePropiedades.favoritesMap[id]) {
            await storePropiedades.removeFavoriteByAccommodation(id);
        } else {
            await storePropiedades.addFavorite(id);
        }
    } catch (err) {
        console.error('toggleFavorite error', err);
    }
};
</script>