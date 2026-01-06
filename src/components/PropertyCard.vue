<template>
  <div
  class="relative cursor-pointer"
    :class="[
      isSelected
        ? 'bg-blue-50 dark:bg-primary/20 ring-2 ring-primary rounded-xl shadow-2xl overflow-hidden transition-shadow duration-300'
        : 'shadow-2xl bg-white dark:!bg-background-dark rounded-xl shadow-md overflow-hidden transition-shadow duration-300 dark:!border-gray-800 shadow-lg border'
    ]"
    @click="$emit('card-clicked')"
  >
    <div class="w-full h-40 bg-cover bg-center relative" :style="{ backgroundImage: `url(${image})` }">
      <!-- Price badge -->
      <div v-if="price" class="absolute top-2 left-2 bg-primary text-white px-3 py-1 rounded-lg shadow text-sm font-bold z-10">
        S/{{ price }}
      </div>
    </div>
    <div class="p-4">
      <div class="flex items-start">
        <h3 class="font-semibold text-lg text-gray-800 dark:text-white">{{ title }}</h3>
      </div>
      <!-- Heart button: absolute top-right -->
      <button
        @click.stop="toggleFavorite"
        :title="isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'"
        :class="[
          'absolute top-3 right-3 rounded-full flex items-center justify-center transition-all',
          isFavorite ? 'bg-primary text-white p-2' : 'bg-white dark:bg-background-dark border-2 border-primary text-primary p-1'
        ]"
      >
        <span v-if="isFavorite" class="material-symbols-outlined">favorite</span>
        <span v-else class="material-symbols-outlined">favorite_border</span>
      </button>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ description }}</p>
      <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">{{ distance }}</p>
    </div>
  </div>
</template>

<script>
import { useGestionPropiedades } from '/src/stores/useGestionPropiedades.js';
import { useAuthStore } from '/src/stores/auth';
export default {
  name: "PropertyCard",
  props: {
    id: {
      type: [Number, String],
      required: false,
    },
    title: String,
    description: String,
    distance: String,
    image: String,
    isSelected: {
      type: Boolean,
      default: false,
    },
    price: {
      type: [Number, String],
      required: false,
    },
    services: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  
  computed: {
    isFavorite() {
      try {
        const store = useGestionPropiedades();
        // read snapshot so Vue tracks changes to the favoritesMap object
        const snapshot = store.favoritesMap ? JSON.stringify(store.favoritesMap) : '';
        void snapshot;
        return !!(store.favoritesMap && store.favoritesMap[this.id]);
      } catch (e) {
        return false;
      }
    }
  },
  methods: {
    async toggleFavorite() {
      const store = useGestionPropiedades();
      const auth = useAuthStore();
      if (!auth.user) {
        // user not authenticated — do not attempt to call protected endpoint
        console.warn('toggleFavorite: usuario no autenticado.');
        // Optionally you could emit an event to open a login modal
        this.$emit && this.$emit('require-login');
        return;
      }
      // if no id, nothing to do
      if (!this.id) return;
      try {
        if (store.favoritesMap && store.favoritesMap[this.id]) {
          await store.removeFavoriteByAccommodation(this.id);
        } else {
          // if user isn't authenticated, backend will error — let store/outer UI handle login
          await store.addFavorite(this.id);
        }
      } catch (err) {
        console.error('toggleFavorite error', err);
      }
    }
  }
};
</script>
