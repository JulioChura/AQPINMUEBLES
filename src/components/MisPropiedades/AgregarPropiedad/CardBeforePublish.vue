<template>
  <div
    class="mb-4 relative rounded-2xl overflow-hidden shadow-lg group transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
  >
    <!-- Imagen de fondo -->
    <div
      class="w-full h-64 bg-cover bg-center transition-all duration-500 group-hover:brightness-90"
      :style="{ backgroundImage: `url('${imagenFondo}')` }"
    ></div>

    <!-- Capa con gradiente para mejorar contraste -->
    <div class="absolute inset-0 bg-black/60"></div>

    <!-- Contenido superpuesto -->
    <div class="absolute bottom-0 p-6 text-white">
      <h4 class="text-2xl font-bold mb-1 drop-shadow-lg">
        {{ store.title || "Propiedad sin título" }}
      </h4>
      <p class="text-3xl font-extrabold mb-2 text-primary drop-shadow-lg">
        ${{ store.monthly_price || "0" }}
        <span class="text-sm font-medium text-gray-200">/mes</span>
      </p>
      <p class="text-sm text-gray-300 font-medium">
        🛏 {{ store.rooms ?? store.habitaciones ?? 0 }} habitaciones
      </p>
    </div>
  </div>
</template>

<script setup>
import { useCreateProperty } from '../../../stores/useCreateProperty.js'
import { computed } from 'vue'


const store = useCreateProperty()
const urlDefecto = "https://lh3.googleusercontent.com/aida-public/AB6AXuDNJsh0Mz5hqwGwGlRdr2jGZkE8N1CxU0ziEVsZX50Q_xyyNGpyNLNJTTPtRivPU_1MkLF8mWXw-T5u1xxXkUshEWDtPa3ayKOg760ZrAOboWiRk88wZaMotmxvO8N47_IwKEN_R_mIpgfIUMOOeVM3xt4_kK-1MqMOB29A5qBquLLNXHL0yNLx_jgh2-JhRaIhEGg2zxHB_PxHnHQQzQ36wdkEsS9jLOd2e6s50teKnMFgJael9f6cv8hFN61cdhBWpjVnsfiMzhQ"


const imagenFondo = computed(() => {
  if (store.imagenes && store.imagenes.length > 0) {
    const idx = Number(store.main_image_index) || 0
    if (idx >= 0 && idx < store.imagenes.length) return store.imagenes[idx]
    return store.imagenes[0]
  }
  return urlDefecto
})
</script>