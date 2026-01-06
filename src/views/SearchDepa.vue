<template>
  <div class="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-white">
    <div class="flex flex-col min-h-screen">

      <HeaderComponent />

      <main class="flex-grow">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2">
              <div class="mb-8">
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg aria-hidden="true" class="h-5 w-5 text-gray-400 dark:text-gray-500" fill="currentColor"
                      viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path clip-rule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        fill-rule="evenodd"></path>
                    </svg>
                  </div>
                  <input
                    ref="searchInput"
                    v-model="searchQuery"
                    @input="onSearchInput"
                    @keydown.down.prevent="focusNextSuggestion"
                    @keydown.up.prevent="focusPrevSuggestion"
                    @keydown.enter.prevent="onEnterSuggestion"
                    class="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary transition"
                    placeholder="Busca alojamientos cerca de universidades ..." type="text" />

                  <!-- Suggestions dropdown -->
                  <div v-if="showSuggestions && suggestions.length" class="absolute left-0 right-0 mt-1 bg-white dark:!bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                    <ul>
                      <li v-for="(s, i) in suggestions" :key="s.id" :class="['p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex gap-3 items-center', i === suggestionIndex ? 'bg-gray-100 dark:bg-gray-800' : '']" @click="selectSuggestion(s)">
                        <img v-if="s.thumbnail" :src="s.thumbnail" class="h-10 w-16 object-cover rounded" />
                        <div class="flex-1">
                          <div class="font-medium text-sm">{{ s.title }}</div>
                <div class="text-xs text-gray-500">{{ s.address }} · S/{{ s.monthly_price }} · {{ s.rooms }} hab</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>


                <div class="mt-4 flex flex-wrap gap-4 items-center">
                  <FilterButtonMultipleOptions titulo="Selecciona la Universidad" v-if="universities.length"
                    :opciones="universities.map(u => u.name)" @optionFiltroSelected="handleUniversitySelected"
                    :defaultOption="selectedUniversity?.name || ''" />

                  <FilterButtonMultipleOptions titulo="Selecciona la Sede" v-if="selectedUniversity"
                    :opciones="selectedUniversity?.sedes?.map(s => s.name) || []"
                    @optionFiltroSelected="handleSedeSelected" :defaultOption="selectedSede?.name || ''" />

                  <!-- Nuevo filtro: Tipo de alojamiento -->
                  <FilterButtonMultipleOptions
                    titulo="Tipo de alojamiento"
                    v-if="propertyTypes && propertyTypes.length"
                    :opciones="propertyTypes.map(t => t.name)"
                    @optionFiltroSelected="handlePropertyTypeSelected"
                    :defaultOption="selectedPropertyType?.name || ''"
                  />

                  <FilterButtonRange
                    title="Precio"
                    :min="minPrice"
                    :max="maxPrice"
                    :start="priceStart !== null ? priceStart : minPrice"
                    :end="priceEnd !== null ? priceEnd : maxPrice"
                    tipoDato="S/"
                    @rangeSelected="handlePriceSelecter"
                  />

                  <FilterButtonRange
                    title="Habitaciones"
                    :min="minRooms"
                    :max="maxRooms"
                    :start="roomsStart !== null ? roomsStart : minRooms"
                    :end="roomsEnd !== null ? roomsEnd : maxRooms"
                    tipoDato=""
                    @rangeSelected="handleBedroomsSelected"
                  />

                  <!-- Services quick-toggle chips -->
                  <div class="flex gap-2 items-center">
                    <template v-for="svc in services" :key="svc.id">
                      <button @click="toggleService(svc.id)" :class="selectedServices.includes(svc.id) ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'" class="px-3 py-1 rounded-full text-sm">
                        {{ svc.name }}
                      </button>
                    </template>
                  </div>
                  <!-- Acciones: Buscar / Limpiar -->
                  <div class="flex items-center gap-2 ml-2">
                    <button
                      @click="clearFilters()"
                      class="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
                    >
                      Limpiar
                    </button>
                  </div>
                </div>

              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Alojamiento cerca de
                  <span class="text-primary">
                    {{ selectedUniversity?.name || '' }}
                  </span>

                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                 

                  <PropertyCard v-for="(property, index) in propertiesPublicas" :key="property.id"
                    :id="property.id"
                    :title="property.title"
                    :description="property.description"
                    :distance="getRouteAndDistanceForProperty(property).label || ''"
                    :image="property.photos && property.photos.length ? property.photos[0].image : 'https://placehold.co/500x300?text=Sin+imagen' "
                    :isSelected="selectedIndex === index"
                    :price="property.monthly_price"
                    :services="mapServices(property.services)"
                    @card-clicked="handleCardClicked(index)" />

                </div>
                <div class="mt-8 flex justify-center">
                  <nav class="flex items-center gap-2">
                    <button :disabled="!storePropiedades.pagination || !storePropiedades.pagination.previous" @click.prevent="goToPrev()" class="flex items-center justify-center h-10 w-10 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50">
                      <svg aria-hidden="true" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" fill-rule="evenodd"></path>
                      </svg>
                    </button>

                    <div class="px-3 text-sm text-gray-700 dark:text-gray-300">Página {{ currentPage }} de {{ storePropiedades.pagination ? Math.max(1, Math.ceil(storePropiedades.pagination.count / storePropiedades.pageSize)) : 1 }}</div>

                    <button :disabled="!storePropiedades.pagination || !storePropiedades.pagination.next" @click.prevent="goToNext()" class="flex items-center justify-center h-10 w-10 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50">
                      <svg aria-hidden="true" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" fill-rule="evenodd"></path>
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>

            <div v-if="!isCelular" class="hidden lg:block dark:!border-gray-800 border border-gray-200 p-6 rounded-xl">
              <template v-if="selectedProperty">
                  <PropertyDetails
                  :id="selectedProperty.id" :title="selectedProperty.title"
                  :direccion="selectedProperty.address"
                  :precio="Number(selectedProperty.monthly_price)"
                  :habitaciones="selectedProperty.rooms"
                  :servicios="selectedProperty.services"
                  :latitudCasa="selectedProperty.latitude"
                  :longitudCasa="selectedProperty.longitude" :latitudUni="selectedSede?.lat"
                  :longitudUni="selectedSede?.lng" :UniImgUrl="selectedUniversity?.imageUrl || ''"
                  v-bind="(function(){ const r = getRouteAndDistanceForProperty(selectedProperty); return { routeGeoJson: r.route, distanceDisplay: r.label }; })()"
                />
              </template>

              <template v-else>
                <div class="p-6 text-center">
                  <p class="text-gray-600 dark:text-gray-400">No hay alojamientos para los filtros seleccionados.</p>
                  <button @click="showAll()"
                    class="mt-4 inline-block bg-primary text-white px-4 py-2 rounded-lg text-sm">Mostrar todos</button>
                </div>
              </template>

            </div>


            <transition name="fade">
              <div v-if="showModal && isCelular"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm ">
                <div
                  class="relative bg-background-light dark:!bg-background-dark w-11/12 max-h-[90vh] bg-white rounded-2xl shadow-2xl p-4 overflow-hidden">
                  <!-- Botón cerrar -->
                  <button
                    class="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-700 hover:text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-md z-10"
                    @click="showModal = false">
                    ✕
                  </button>

                  <!-- Contenido -->
                  <template v-if="selectedProperty">
                    <PropertyDetails
                      :id="selectedProperty.id" :title="selectedProperty.title"
                      :direccion="selectedProperty.address"
                      :precio="Number(selectedProperty.monthly_price)"
                      :habitaciones="selectedProperty.rooms"
                      :servicios="selectedProperty.services"
                      :latitudCasa="selectedProperty.latitude"
                      :longitudCasa="selectedProperty.longitude" :latitudUni="selectedSede?.lat"
                      :longitudUni="selectedSede?.lng" :UniImgUrl="selectedUniversity?.imageUrl || ''"
                      v-bind="(function(){ const r = getRouteAndDistanceForProperty(selectedProperty); return { routeGeoJson: r.route, distanceDisplay: r.label }; })()" />
                  </template>
                  <template v-else>
                    <div class="p-4 text-center">
                      <p class="text-gray-600 dark:text-gray-400">No hay alojamientos para los filtros seleccionados.</p>
                      <div class="mt-3">
                        <button @click="showAll(true)"
                          class="bg-primary text-white px-4 py-2 rounded-lg text-sm">Mostrar todos</button>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </transition>

          </div>
        </div>
      </main>

      <FooterComponent />

    </div>

  </div>
</template>
<script setup>
// Mapea los servicios de la propiedad a objetos con nombre e icono (si existe)
function mapServices(servicesArr) {
  if (!Array.isArray(servicesArr)) return [];
  return servicesArr.map(svc => {
    if (typeof svc === 'object') {
      return {
        name: svc.name || svc.nombre || '',
        icon: svc.icon || svc.icono || '',
        short: svc.short || '',
      };
    }
    // Si es string, solo nombre
    return { name: String(svc), icon: '', short: '' };
  });
}
 import { ref, onMounted, onBeforeUnmount, computed } from "vue";

import PropertyCard from "../components/PropertyCard.vue";
import PropertyDetails from "../components/PropertyDetails.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";
import FilterButtonMultipleOptions from "../components/FilterButtonMultipleOptions.vue";
import FilterButtonRange from "../components/FilterButtonRange.vue";
import { useRoute, useRouter } from "vue-router";

import { webPageData } from "/src/stores/webPageData.js";
import { useGestionPropiedades } from "/src/stores/useGestionPropiedades.js";
// Property type filter state
const propertyTypes = ref([]);
const selectedPropertyType = ref(null);

// Fetch property types for filter
async function fetchPropertyTypes() {
  try {
    const data = await webPageData().getTiposDePropiedad();
    let arr = [];
    if (Array.isArray(data)) arr = data;
    else if (data && Array.isArray(data.results)) arr = data.results;
    propertyTypes.value = arr.filter(Boolean);
  } catch (err) {
    console.error("Error al obtener tipos de propiedad:", err);
  }
}


const storePropiedades = useGestionPropiedades();
const route = useRoute();
const router = useRouter();

const selectedIndex = ref(0);
const showModal = ref(false);
const isCelular = ref(false);
const propertiesPublicas = ref([])
const currentPage = ref(1);

// selectedProperty is a safe accessor for the currently selected property
const selectedProperty = computed(() => {
  if (!propertiesPublicas.value || !Array.isArray(propertiesPublicas.value)) return null;
  if (selectedIndex.value == null) return null;
  if (selectedIndex.value < 0 || selectedIndex.value >= propertiesPublicas.value.length) return null;
  return propertiesPublicas.value[selectedIndex.value];
});

// Prevent infinite auto-fallback loops: attempt automatic "showAll" only once per applyFilters call
const attemptedAutoFallback = ref(false);
// request id to avoid race conditions from concurrent filter requests
const currentFilterRequestId = ref(0);

// search + suggestions state
const searchQuery = ref("");
const searchInput = ref(null);
onMounted(async () => {
  if (route && route.query && route.query.focus === 'true' && searchInput.value) {
    searchInput.value.focus();
  }
  await fetchPropertyTypes();
});
const suggestions = ref([]);
const showSuggestions = ref(false);
const suggestionIndex = ref(-1);

// Cierra la lista de sugerencias si el usuario hace clic fuera
function handleClickOutside(event) {
  const input = searchInput.value;
  const suggestionsList = document.querySelector('.absolute.left-0.right-0.mt-1');
  if (
    input &&
    !input.contains(event.target) &&
    (!suggestionsList || !suggestionsList.contains(event.target))
  ) {
    showSuggestions.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

// filters state
const universities = ref([]);
const services = ref([]);
const selectedUniversity = ref(null);
const selectedSede = ref(null);
const selectedServices = ref([]);
// Keep these null initially so we don't apply unintended filters on load
const priceStart = ref(null);
const priceEnd = ref(null);

// Maneja la selección del tipo de alojamiento
function handlePropertyTypeSelected(nombreTipo) {
  // Busca el objeto completo en propertyTypes por nombre
  const tipo = propertyTypes.value.find(t => t.name === nombreTipo);
  selectedPropertyType.value = tipo || null;
  applyFilters();
}

// Dynamic min/max price for filter (usando valores globales del store)
const minPrice = computed(() => {
  return storePropiedades.globalMinPrice !== null && storePropiedades.globalMinPrice !== undefined
    ? storePropiedades.globalMinPrice
    : 300;
});
const maxPrice = computed(() => {
  return storePropiedades.globalMaxPrice !== null && storePropiedades.globalMaxPrice !== undefined
    ? storePropiedades.globalMaxPrice
    : 3000;
});
const roomsStart = ref(null);
const roomsEnd = ref(null);
// Dynamic min/max rooms for filter (usando valores globales del store)
const minRooms = computed(() => {
  return storePropiedades.globalMinRooms !== null && storePropiedades.globalMinRooms !== undefined
    ? storePropiedades.globalMinRooms
    : 1;
});
const maxRooms = computed(() => {
  return storePropiedades.globalMaxRooms !== null && storePropiedades.globalMaxRooms !== undefined
    ? storePropiedades.globalMaxRooms
    : 10;
});

const fetchPublicProperties = async () => {
  try {
    propertiesPublicas.value = await storePropiedades.getPropiedadesPublicas();
    console.log(JSON.stringify(propertiesPublicas.value, null, 2))
  } catch (err) {
    console.error("Error al obtener propiedades publicas:", err);
  }
};


// will be populated from backend

// ===== Inicialización =====
const initUniversitySelection = async () => {
  const uniParam = route.query.uni;
  console.log("Parámetro recibido:->", uniParam);

  try {
    // fetch universities and services
    const fetchedUnis = await storePropiedades.fetchUniversities();
    const fetchedSvcs = await storePropiedades.fetchPredefinedServices();

    console.log("fetchedUnis raw:", fetchedUnis);
    console.log("fetchedSvcs raw:", fetchedSvcs);

    // guard against non-array responses
    const uniArray = Array.isArray(fetchedUnis) ? fetchedUnis : [];
    const svcArray = Array.isArray(fetchedSvcs) ? fetchedSvcs : [];

    // normalize to previous shape (sedes array with lat/lng)
    const parseNum = (v) => {
      if (v === null || v === undefined) return null;
      const n = Number(v);
      return Number.isFinite(n) ? n : null;
    };

    universities.value = uniArray.map((u) => ({
      id: u.id,
      name: u.name,
      imageUrl: u.logo || u.imageUrl || null,
      sedes: (u.campuses || []).map((c) => {
        // accept several possible latitude/longitude field names
        const latRaw = c.latitude ?? c.lat ?? c.latitud ?? (c.location && c.location.lat) ?? null;
        const lngRaw = c.longitude ?? c.lng ?? c.longitud ?? (c.location && c.location.lng) ?? null;
        return {
          id: c.id,
          name: c.name,
          lat: parseNum(latRaw),
          lng: parseNum(lngRaw),
        };
      }),
    }));

    services.value = svcArray;

    console.log("universities normalized:", universities.value);
    console.log("services normalized:", services.value);

    // Only auto-select a university if it was passed in the query params.
    if (uniParam && universities.value.length) {
      const index = universities.value.findIndex(
        (u) => u.name.toLowerCase().trim() === String(uniParam).toLowerCase().trim()
      );
      if (index !== -1) {
        selectedUniversity.value = universities.value[index];
        selectedSede.value = selectedUniversity.value.sedes?.[0] || null;
      }
    }

    // initial load of properties: show ALL public properties (no filters) on explore
    try {
      await storePropiedades.fetchPropiedadesPublicas();
      propertiesPublicas.value = await storePropiedades.getPropiedadesPublicas();
      console.log("propertiesPublicas count:", propertiesPublicas.value?.length);
    } catch (errProps) {
      console.error("Error fetching public properties inside initUniversitySelection:", errProps);
    }
  } catch (err) {
    console.error("Error in initUniversitySelection:", err);
  }
};

// ===== Eventos =====
const handleUniversitySelected = (universityName) => {
  // Update selection and auto-apply filters (race-condition protections remain in applyFilters)
  selectedUniversity.value = universities.value.find((u) => u.name === universityName) || null;
  selectedSede.value = selectedUniversity.value?.sedes?.[0] || null;
  console.log('handleUniversitySelected ->', { universityName, selectedUniversity: selectedUniversity.value, selectedSede: selectedSede.value });
  // reset selectedIndex so the details panel will reflect the first result after search
  selectedIndex.value = 0;
  applyFilters();
};

const handleSedeSelected = (sedeName) => {
  // Update selected campus and auto-apply filters
  selectedSede.value = selectedUniversity.value?.sedes?.find((s) => s.name === sedeName) || null;
  console.log('handleSedeSelected ->', { sedeName, selectedSede: selectedSede.value });
  selectedIndex.value = 0;
  applyFilters();
};

const handlePriceSelecter = (range) => {
  // Coerce and sanitize range values to numbers and ensure min<=max
  const s = Number(range.start);
  const e = Number(range.end);
  if (isNaN(s) || isNaN(e)) {
    // ignore invalid ranges
    return;
  }
  if (s <= e) {
    priceStart.value = s;
    priceEnd.value = e;
  } else {
    priceStart.value = e;
    priceEnd.value = s;
  }
  // Auto-apply filters after changing price
  applyFilters();
};

const handleBedroomsSelected = (range) => {
  const s = Number(range.start);
  const e = Number(range.end);
  if (isNaN(s) || isNaN(e)) return;
  if (s <= e) {
    roomsStart.value = s;
    roomsEnd.value = e;
  } else {
    roomsStart.value = e;
    roomsEnd.value = s;
  }
  // Auto-apply filters after changing bedroom range
  applyFilters();
};

const handleCardClicked = (index) => {
  // Show preview in sidebar (desktop) or modal (mobile). Do NOT navigate away.
  selectedIndex.value = index;
  const prop = propertiesPublicas.value?.[index];
  if (!prop) return;

  // Keep current selectedUniversity/selectedSede from the filters —
  // the map will draw route only when selectedSede has coordinates.

  if (isCelular.value) {
    showModal.value = true;
  } else {
    // On desktop we simply ensure the right sidebar shows the selectedIndex.
    // Optionally you could scroll to the sidebar or focus it here.
    // No navigation.
    // small UX improvement: ensure sidebar is visible (it's rendered for desktop by layout)
    // we can force a tiny delay to let UI update
    setTimeout(() => {
      const el = document.querySelector('.sticky');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  }
};

// Return route GeoJSON and distance label for a property corresponding to the currently selected university (if any)
const getRouteAndDistanceForProperty = (property) => {
  if (!property || !selectedUniversity.value || !Array.isArray(property.university_distances)) return { route: null, label: null };
  try {
    const match = property.university_distances.find((d) => {
      if (d.campus_university_id != null) return Number(d.campus_university_id) === Number(selectedUniversity.value.id);
      if (d.campus && typeof d.campus === 'string') return d.campus.toLowerCase().includes(String(selectedUniversity.value.name).toLowerCase());
      return false;
    });
    if (!match) {
      console.debug('getRouteAndDistanceForProperty -> no match found for property', { propertyId: property.id, selectedUniversityId: selectedUniversity.value?.id, university_distances: property.university_distances });
      return { route: null, label: null };
    }
    // Debug: show matched university_distance record
    console.log('getRouteAndDistanceForProperty -> matched university_distance', { propertyId: property.id, match });
    // Build a human-friendly label from backend values (distance_km and walk_time_minutes)
    const distanceKm = match.distance_km != null ? String(match.distance_km) : null;
    const minutes = match.walk_time_minutes != null ? String(match.walk_time_minutes) : null;
    const label = distanceKm ? (minutes ? `${distanceKm} km (${minutes} min)` : `${distanceKm} km`) : (minutes ? `${minutes} min` : null);
    return { route: match.route || null, label };
  } catch (e) {
    console.warn('getRouteAndDistanceForProperty error', e);
    return { route: null, label: null };
  }
};

// Show all public properties (used by the "Mostrar todos" buttons)
const showAll = async (hideModal = false) => {
  try {
    await storePropiedades.fetchPropiedadesPublicas();
    const res = await storePropiedades.getPropiedadesPublicas();
    propertiesPublicas.value = res || [];
    selectedIndex.value = propertiesPublicas.value && propertiesPublicas.value.length ? 0 : null;
    if (hideModal) showModal.value = false;
    console.log('showAll -> restored results count', propertiesPublicas.value?.length, 'selectedIndex', selectedIndex.value);
  } catch (err) {
    console.error('showAll error', err);
  }
};

// ===== Ciclo de vida =====
onMounted(async () => {
  // Cargar valores globales de precio min/max al inicio
  await storePropiedades.fetchPropiedadesFiltradas({});
  await fetchPropertyTypes();
  initUniversitySelection();
  // fetch public properties initially is handled inside initUniversitySelection via applyFilters
  isCelular.value = window.innerWidth < 1024;

  const resizeHandler = () => {
    isCelular.value = window.innerWidth < 1024;
  };

  window.addEventListener("resize", resizeHandler);

  onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeHandler);
  });
});

// --------- Helper methods for search/filtering UI ---------
let debounceTimer = null;
const onSearchInput = async () => {
  // debounce
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    if (searchQuery.value && searchQuery.value.length >= 2) {
      suggestions.value = await storePropiedades.autocompletePublicProperties(searchQuery.value, 8);
      showSuggestions.value = suggestions.value.length > 0;
      suggestionIndex.value = -1;
    } else {
      suggestions.value = [];
      showSuggestions.value = false;
    }
  }, 250);
};

const selectSuggestion = (s) => {
  // navigate to detail page
  showSuggestions.value = false;
  searchQuery.value = "";
  suggestions.value = [];
  router.push({ name: "VerDepa", params: { id: s.id } });
};

const focusNextSuggestion = () => {
  if (!suggestions.value.length) return;
  suggestionIndex.value = (suggestionIndex.value + 1) % suggestions.value.length;
};
const focusPrevSuggestion = () => {
  if (!suggestions.value.length) return;
  suggestionIndex.value = (suggestionIndex.value - 1 + suggestions.value.length) % suggestions.value.length;
};
const onEnterSuggestion = () => {
  if (suggestionIndex.value >= 0 && suggestions.value[suggestionIndex.value]) {
    selectSuggestion(suggestions.value[suggestionIndex.value]);
  } else if (searchQuery.value) {
    // if no selection, apply filters with q
    applyFilters();
  }
};

const toggleService = (id) => {
  const idx = selectedServices.value.indexOf(id);
  if (idx === -1) selectedServices.value.push(id);
  else selectedServices.value.splice(idx, 1);
  // Auto-apply filters when services change
  applyFilters();
};

// Pagination navigation helpers: prefer reading page number from backend `next`/`previous` URLs
const goToNext = async () => {
  let targetPage = null;
  try {
    const nextUrl = storePropiedades.pagination?.next;
    if (nextUrl) {
      const u = new URL(nextUrl);
      const p = u.searchParams.get('page');
      if (p) targetPage = Number(p);
    }
  } catch (e) {
    console.warn('goToNext -> parse next url failed', e);
  }
  if (!targetPage) targetPage = currentPage.value + 1;
  await applyFilters(targetPage);
};

const goToPrev = async () => {
  let targetPage = null;
  try {
    const prevUrl = storePropiedades.pagination?.previous;
    if (prevUrl) {
      const u = new URL(prevUrl);
      const p = u.searchParams.get('page');
      if (p) targetPage = Number(p);
    }
  } catch (e) {
    console.warn('goToPrev -> parse previous url failed', e);
  }
  if (!targetPage) targetPage = Math.max(1, currentPage.value - 1);
  await applyFilters(targetPage);
};

// Clear all filters and restore all properties
const clearFilters = async () => {
  selectedUniversity.value = null;
  selectedSede.value = null;
  selectedServices.value = [];
  priceStart.value = null;
  priceEnd.value = null;
  roomsStart.value = null;
  roomsEnd.value = null;
  selectedPropertyType.value = null;
  searchQuery.value = "";
  // restore full list
  await showAll();
};

async function applyFilters() {
  let page = 1;
  if (arguments && arguments.length && Number.isInteger(arguments[0])) {
    page = arguments[0];
  }
  console.log('applyFilters -> start', {
    selectedIndex: selectedIndex.value,
    selectedUniversity: selectedUniversity.value,
    selectedSede: selectedSede.value,
    priceStart: priceStart.value,
    priceEnd: priceEnd.value,
    roomsStart: roomsStart.value,
    roomsEnd: roomsEnd.value,
    selectedServices: selectedServices.value
  });
  const params = {};
  if (searchQuery.value) params.q = searchQuery.value;
  if (selectedUniversity.value) params.university_id = selectedUniversity.value.id;
  if (selectedSede.value) params.campus_id = selectedSede.value.id;
  if (selectedPropertyType.value) params.accommodation_type = selectedPropertyType.value.id;
  if (priceStart.value != null) params.min_price = Number(priceStart.value);
  if (priceEnd.value != null) params.max_price = Number(priceEnd.value);
  if (roomsStart.value != null) params.min_rooms = Number(roomsStart.value);
  if (roomsEnd.value != null) params.max_rooms = Number(roomsEnd.value);
  if (selectedServices.value.length) params.services = selectedServices.value.join(',');

  // If no filters provided, fetch all public properties (explore behavior)
  if (Object.keys(params).length === 0) {
    // request all public properties (paginated)
    params.page = page;
    const pageResults = await storePropiedades.fetchPropiedadesPublicas(page);
    console.log('applyFilters -> fetched public page', { page, pageResultsLength: pageResults?.length, pagination: storePropiedades.pagination });
    propertiesPublicas.value = pageResults || [];
    console.log('applyFilters -> no-params results count', propertiesPublicas.value?.length);
    // ensure selectedIndex points to a valid result (or null)
    if (propertiesPublicas.value && propertiesPublicas.value.length > 0) selectedIndex.value = 0;
    else selectedIndex.value = null;
    console.log('applyFilters -> selectedIndex after no-params', selectedIndex.value, 'selectedProperty', selectedProperty.value);
    currentPage.value = page;
    return;
  }
  console.log('applyFilters -> params', params);

  // bump request id and capture locally
  currentFilterRequestId.value += 1;
  const myRequestId = currentFilterRequestId.value;
  console.log('applyFilters -> requestId', myRequestId);

  // clear current results immediately so UI doesn't show stale items while loading
  propertiesPublicas.value = [];
  selectedIndex.value = null;

  params.page = page;
  const results = await storePropiedades.fetchPropiedadesFiltradas(params);
  console.log('applyFilters -> received results for requestId', myRequestId, 'len=', results?.length);

  // if a newer request started, ignore this (stale) response
  if (myRequestId !== currentFilterRequestId.value) {
    console.log('applyFilters -> stale response ignored for requestId', myRequestId);
    return;
  }
  // if the request was cancelled by a newer request, the store returns null -> ignore
  if (results === null) {
    console.log('applyFilters -> request was cancelled, ignoring results for requestId', myRequestId);
    return;
  }
  if (results === null) {
    // request was cancelled by a newer one; ignore
    return;
  }

  // Apply whatever the server returned (may be empty array)
  propertiesPublicas.value = results || [];
  currentPage.value = page;
  if (propertiesPublicas.value && propertiesPublicas.value.length > 0) {
    selectedIndex.value = 0;
  } else {
    // show empty state - do NOT auto restore all properties; let the user click "Mostrar todos" if desired
    selectedIndex.value = null;
    console.log('applyFilters -> no results (server returned 0)');
  }
  console.log('applyFilters -> selectedIndex after results', selectedIndex.value, 'selectedProperty', selectedProperty.value);
}
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
}
</style>
