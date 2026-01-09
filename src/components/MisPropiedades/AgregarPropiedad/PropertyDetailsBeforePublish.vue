<template>
  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm overflow-hidden p-6 mb-8">
    <!-- Encabezado con switch (sin cambios) -->
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold text-gray-800 dark:text-white">Resumen de la propiedad</h3>
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="open" class="sr-only peer" />
        <div class="relative w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-colors">
          <div class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5">
          </div>
        </div>
        <span class="ml-2 text-sm text-gray-600 dark:text-gray-300">Mostrar detalles</span>
      </label>
    </div>

    <!-- Contenido colapsable mejorado -->
    <transition name="slide-fade">
      <div v-show="open" class="overflow-hidden">
        <div class="space-y-3 text-sm">
          <div v-for="(detail, index) in detallesPropiedad" :key="index" 
               class="flex gap-4 items-start pb-3 border-b border-gray-200 dark:border-gray-600">
            
            <!-- Label con ancho fijo -->
            <div class="w-36 md:w-44 flex-shrink-0">
              <p class="text-gray-700 dark:text-gray-300 font-medium">{{ detail.label }}:</p>
            </div>

            <!-- Contenido flexible -->
            <div class="flex-1 flex items-start justify-between gap-3 min-w-0">
              
              <!-- Valor principal -->
              <div class="flex-1 min-w-0">
                <!-- Amenidades con íconos -->
                <template v-if="detail.label === 'Amenidades'">
                  <div v-if="detail.value.length" class="flex flex-wrap gap-2">
                    <span v-for="a in detail.value" :key="a.id" 
                          class="flex items-center gap-1 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded text-xs">
                      <ServiceIcon :name="a.icon_name || a.icon_class" :url="a.image_url" :size="16" />
                      <span class="max-w-[120px] truncate">{{ a.name }}</span>
                    </span>
                  </div>
                  <span v-else class="text-gray-400 text-sm">No agregadas</span>
                </template>

                <!-- Textos largos con break-words. Si el detalle es 'Reglas de convivencia', renderizamos HTML sanitizado -->
                <template v-else>
                  <div v-if="detail.label === 'Reglas de convivencia'" class="prose text-sm text-gray-700 dark:text-gray-300">
                    <div v-html="sanitize(detail.value)"></div>
                  </div>
                  <span v-else class="text-gray-600 dark:text-gray-400 break-words whitespace-normal line-clamp-3">
                    {{ detail.value }}
                  </span>
                </template>
              </div>

              <!-- Icono de estado -->
              <span class="material-symbols-outlined text-xl flex-shrink-0 mt-0.5"
                    :class="detail.completo ? 'text-green-500' : 'text-orange-400'">
                {{ detail.completo ? 'check_circle' : 'pending' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import DOMPurify from 'dompurify'
//import ServiceIcon from '/src/components/icons/ServiceIcon.vue'
import { useCreateProperty } from '/src/stores/useCreateProperty' // Ajusta la ruta según tu estructura
import { webPageData } from '/src/stores/webPageData.js';


const open = ref(true)
const store = useCreateProperty()
const storeWebPageData = webPageData();

const amenities = ref([])
const tiposPropiedad = ref([])

const fetchAmenities = async () => {
  try {
    amenities.value = await storeWebPageData.getServicios();
  } catch (err) {
    console.error("Error al obtener tipos de servicios:", err);
  }
};

const fetchTipos = async () => {
  try {
    tiposPropiedad.value = await storeWebPageData.getTiposDePropiedad();
  } catch (err) {
    console.error('Error al obtener tipos de propiedad:', err)
  }
}

onMounted(async () => {
  await fetchAmenities()
  await fetchTipos()
})

// Función para mapear IDs de amenidades a nombres + iconos
const amenidadesConIconos = computed(() => {
  if (!store.amenidades?.length || !amenities.value?.length) return []
  return store.amenidades
    .map(id => amenities.value.find(a => a.id === id))
    .filter(Boolean)
})

// Computed para resolver el nombre legible del tipo de inmueble
const tipoNombre = computed(() => {
  if (!store.accommodation_type) return 'No especificado'
  const found = tiposPropiedad.value.find(t => t.id === store.accommodation_type)
  return found ? found.name : store.accommodation_type
})

// Computed: genera los detalles dinámicamente desde el store
const detallesPropiedad = computed(() => [
  { label: 'Título', value: store.title || 'No especificado', completo: !!store.title },
  { label: 'Descripción', value: store.description || 'No especificada', completo: !!store.description },
  { label: 'Dirección', value: store.address || 'No especificada', completo: !!store.address },
  { label: 'Tipo', value: tipoNombre.value || 'No especificado', completo: !!store.accommodation_type },
  { label: 'Habitaciones', value: store.rooms || 'No especificadas', completo: !!store.rooms },
  { label: 'Amenidades', value: amenidadesConIconos.value, completo: !!amenidadesConIconos.value.length },
  { label: 'Imágenes', value: store.imagenes.length ? `${store.imagenes.length} subidas` : 'No subidas', completo: !!store.imagenes.length },
  { label: 'Precio', value: store.monthly_price ? `S/${store.monthly_price}` : 'No definido', completo: !!store.monthly_price },
  { label: 'Reglas de convivencia', value: store.coexistence_rules || 'No definidas', completo: !!store.coexistence_rules },
])

// simple sanitizer wrapper for previewing owner-entered HTML/markdown
const sanitize = (raw) => {
  try {
    if (!raw) return '';
    return DOMPurify.sanitize(String(raw));
  } catch (e) {
    console.warn('sanitize preview failed', e);
    return '';
  }
}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
  overflow: hidden;
}

.slide-fade-enter-from {
  max-height: 0;
  opacity: 0;
}

.slide-fade-enter-to {
  max-height: 1000px;
  opacity: 1;
}

.slide-fade-leave-from {
  max-height: 1000px;
  opacity: 1;
}

.slide-fade-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
