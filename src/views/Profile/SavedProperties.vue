<template>
    <main class="flex-1 p-6 sm:p-8 md:p-10">
        <div class="max-w-7xl mx-auto">
            <h2 class="text-2xl font-bold mb-1 text-black dark:!text-white">Propiedades guardadas</h2>
            <p class="text-sm text-black/60 dark:text-white/60 mb-8">Organiza y administra visualmente tus propiedades favoritas.</p>
            <!-- Filtros eliminados para simplificar la vista -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="saved-properties-grid">
                                <PropertyCard
                                    v-for="(property, index) in propertiesList"
                                    :key="property.id || index"
                                    :id="property.id"
                                    :title="property.title"
                                    :description="property.description"
                                    :image="property.photos?.[0]?.image || property.image || defaultImage"
                                    :price="property.monthly_price"
                                    :services="mapServices(property.services)"
                                />
            </div>
        </div>
    </main>
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
import { onMounted, computed } from 'vue';
import { useGestionPropiedades } from '/src/stores/useGestionPropiedades.js';
import PropertyCard from '/src/components/PropertyCard.vue';
import { storeToRefs } from 'pinia';

const store = useGestionPropiedades();
const { favoriteProperties } = storeToRefs(store);
const defaultImage = 'https://placehold.co/500x300?text=Sin+imagen';

// Load favorites on mount. The template binds directly to the store ref
// so changes to `favoriteProperties` will update the UI immediately.
onMounted(async () => {
    await store.fetchFavoriteProperties();
});

const propertiesList = computed(() => favoriteProperties.value || []);
</script>