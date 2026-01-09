<template>
  <div class="bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200">
    <div class="flex flex-col min-h-screen">
      <HeaderComponent />
      <main class="flex-grow">


        <section class="relative min-h-[600px] flex items-center justify-center pt-16 overflow-hidden">
          <!-- Imagen de fondo (reemplaza el video por la imagen de ejemplo, puedes volver a poner el video si lo prefieres) -->
          <div class="absolute inset-0 z-0">
            <video autoplay muted loop playsinline class="w-full h-full object-cover">
              <source src="../public/arequipa.mp4" type="video/mp4">
            </video>
            <div class="absolute inset-0 bg-gradient-to-b from-surface-dark/80 via-surface-dark/50 to-background-dark"></div>
          </div>
          <div class="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mt-10 sm:mt-0">
            <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6 drop-shadow-lg">
              Encuentra tu alojamiento <br class="hidden sm:block"/> estudiantil en Arequipa
            </h1>
            <p class="text-lg sm:text-xl text-gray-200 mb-10 max-w-2xl mx-auto drop-shadow-md font-medium">
              La forma más fácil de encontrar y reservar tu alojamiento cerca de las mejores universidades.
            </p>
            <div class="flex justify-center">
              <button @click="goToSearchAndFocus" class="bg-primary hover:bg-primary-hover text-white text-lg px-8 py-3.5 rounded-lg font-semibold shadow-xl shadow-blue-900/30 transition-all transform hover:-translate-y-1 hover:shadow-2xl flex items-center gap-2">
                <span>Empieza a explorar</span>
                <span class="material-icons text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        <section class="py-16 sm:py-24">
          <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Cómo funciona AlojaAQP</h2>
              <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Simplificamos tu búsqueda del
                alojamiento perfecto en tres pasos sencillos.</p>
            </div>
            <div class="grid md:grid-cols-3 gap-8 text-center">
              <div class="flex flex-col items-center">
                <div class="flex items-center justify-center size-16 rounded-full bg-primary/10 mb-4">
                  <span class="material-symbols-outlined text-3xl text-primary">search</span>
                </div>
                <h3 class="text-xl font-semibold mb-2">Busca fácilmente</h3>
                <p class="text-slate-600 dark:text-slate-400">Usa nuestro mapa interactivo y filtros para encontrar
                  alojamiento cerca
                  de tu universidad.</p>
              </div>
              <div class="flex flex-col items-center">
                <div class="flex items-center justify-center size-16 rounded-full bg-primary/10 mb-4">
                  <span class="material-symbols-outlined text-3xl text-primary">schedule</span>
                </div>
                <h3 class="text-xl font-semibold mb-2">Ahorra tiempo</h3>
                <p class="text-slate-600 dark:text-slate-400">Consulta al instante los tiempos a pie o en bus hasta tu
                  campus.</p>
              </div>
              <div class="flex flex-col items-center">
                <div class="flex items-center justify-center size-16 rounded-full bg-primary/10 mb-4">
                  <span class="material-symbols-outlined text-3xl text-primary">task_alt</span>
                </div>
                <h3 class="text-xl font-semibold mb-2">Reserva con seguridad</h3>
                <p class="text-slate-600 dark:text-slate-400">Reserva tu alojamiento ideal a través de nuestra
                  plataforma segura y confiable.</p>
              </div>
            </div>
          </div>
        </section>

        <UniversidadesSection />

        <section class="bg-slate-100 dark:bg-slate-900/50 py-16 sm:py-24 relative overflow-hidden">
          <div class="absolute right-10 top-0 bottom-0 z-0 flex justify-end">
            <img alt="Arequipa Cathedral" :class="[
              'w-full h-full object-contain object-bottom opacity-10 dark:opacity-5 pointer-events-none transition-all duration-500',
              isDark ? 'invert brightness-200 contrast-100' : ''
            ]" src="../public/catedral.png" />
          </div>
          <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-4xl mx-auto text-center">
              <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">¿Listo para encontrar tu
                nuevo hogar?</h2>
              <p class="text-lg text-slate-600 dark:text-slate-400 mb-8">Explora cientos de anuncios verificados. Tu
                aventura en Arequipa te espera.</p>
              <div class="relative max-w-xl mx-auto">
                <span
                  class="material-symbols-outlined absolute left-4 top-7 -translate-y-1/2 text-slate-400 dark:text-slate-500">search</span>
                <input
                  class="w-full h-14 pl-12 pr-32 bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
                  placeholder="Busca por universidad o zona..." type="text"
                  @focus="goToSearchAndFocus" @click="goToSearchAndFocus"
                />
                <button
                  class="absolute right-4 top-7 -translate-y-1/2 bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  @click="goToSearchAndFocus">
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterComponent />


    </div>



    <LoginModal :show="showLogin" @close="closeLoginModal" @login-success="onLoginSuccess" />

  </div>
</template>


<script setup>
import HeaderComponent from "../components/HeaderComponent.vue";
import { ref, computed, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import FooterComponent from "../components/FooterComponent.vue";
import LoginModal from "../components/authorization/LoginModal.vue";
import NotificacionButton from "../components/NotificacionButton.vue";
import ProfileButton from "../components/ProfileButton.vue";

import UniversidadesSection from "../components/UniversidadesSection.vue";

const router = useRouter();
const isDark = ref(false);
const showLogin = ref(false);

// Redirige a /search y enfoca la barra de búsqueda
const goToSearchAndFocus = () => {
  router.push({ path: '/search', query: { focus: 'true' } });
};

const auth = useAuthStore();

// Computed para saber si el usuario es owner
const isOwner = computed(() => {
  return auth.user?.roles?.includes("owner");
});

// --- Publicar propiedad ---
const handlePublishClick = () => {
  if (!auth.user) {
    // no está logeado → abrir modal de login
    showLogin.value = true;
  } else if (isOwner.value) {
    router.push("/mis-propiedades");
  } else {
    router.push("/register-owner");
  }
};

// --- Cargar tema oscuro y usuario guardado ---
onBeforeMount(() => {
  const savedTheme = localStorage.getItem("theme");
  if (
    savedTheme === "dark" ||
    (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    isDark.value = true;
    document.documentElement.classList.add("dark");
  }

  auth.loadUser();
});

// --- Publicar propiedad ---
const publishProperty = () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    // Si no está logueado → abrir modal de login
    showLogin.value = true;
    return;
  }

  // Si ya tiene rol de propietario
  if (auth.user && auth.user?.roles?.includes("owner")) {
    alert("  Ya eres propietario. Puedes publicar tus anuncios desde tu perfil.");
    return;
  }

  // Si está logueado pero no es propietario → ir al formulario
  router.push("/register-owner");
};

// --- Login exitoso ---
const onLoginSuccess = () => {
  showLogin.value = false;
};

const closeLoginModal = () => {
  showLogin.value = false;
};

</script>


<style scoped>
.overlay-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  /* ajusta el alto de la sombra */
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.0) 100%);
  z-index: 0;
  pointer-events: none;
  /* evita que bloquee clics */
}
</style>
