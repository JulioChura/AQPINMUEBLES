<template>
  <section class="py-16 sm:py-24" id="universidades">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Encuentra alojamiento por universidad</h2>
        <p class="text-lg text-slate-600 dark:text-slate-400 mt-2">Selecciona tu universidad para ver los alojamientos disponibles cerca.</p>
      </div>
      <div class="flex flex-col items-center gap-8">
        <div class="flex justify-center gap-8 md:gap-16">
          <router-link class="group flex flex-col items-center text-center w-40"
            :to="{ path: '/search', query: { uni: 'Universidad Nacional de San Agustin' } }">
            <div class="w-28 h-28 flex items-center justify-center">
              <img alt="Logo Universidad 1"
                class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                src="../public/Escudo_UNSA.png" />
            </div>
            <span class="mt-4 font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">Universidad Nacional de San Agustín</span>
          </router-link>
          <router-link class="group flex flex-col items-center text-center w-40"
            :to="{ path: '/search', query: { uni: 'Universidad Catolica de Santa Maria' } }">
            <div class="w-28 h-28 flex items-center justify-center">
              <img alt="Logo Universidad 2"
                class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                src="../public/Escudo_UCSM.png" />
            </div>
            <span class="mt-4 font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">Universidad Católica de Santa María</span>
          </router-link>
          <router-link class="group flex flex-col items-center text-center w-40"
            :to="{ path: '/search', query: { uni: 'Universidad Tecnologica del Peru' } }">
            <div class="w-28 h-28 flex items-center justify-center">
              <img alt="Logo Universidad 3"
                class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                src="../public/Escudo_UTP.png" />
            </div>
            <span class="mt-4 font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">Universidad Tecnológica del Perú</span>
          </router-link>
        </div>
        <div class="flex justify-center gap-8 md:gap-16">
          <router-link class="group flex flex-col items-center text-center w-40"
            :to="{ path: '/search', query: { uni: 'Universidad Continental' } }">
            <div class="w-28 h-28 flex items-center justify-center">
              <img alt="Logo Universidad 4"
                class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                src="../public/Escudo_Continental.jpg" />
            </div>
            <span class="mt-4 font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">Universidad Continental</span>
          </router-link>
          <router-link class="group flex flex-col items-center text-center w-40"
            :to="{ path: '/search', query: { uni: 'Universidad de San Martin de Porres' } }">
            <div class="w-28 h-28 flex items-center justify-center">
              <img alt="Logo Universidad 5"
                class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                src="../public/Escudo_USMP.png" />
            </div>
            <span class="mt-4 font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">Universidad de San Martín de Porres</span>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No logic needed, purely presentational
</script>
