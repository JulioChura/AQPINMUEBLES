<template>
  <header class="bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-8">
          <a class="flex items-center gap-2 text-gray-900 dark:text-white" href="#">
            <svg class="h-8 w-8 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd"
                d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
                fill="currentColor" fill-rule="evenodd"></path>
              <path clip-rule="evenodd"
                d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                fill="currentColor" fill-rule="evenodd"></path>
            </svg>
            <router-link to="/" class="text-xl font-bold">
              AlojaAQP
            </router-link>
          </a>
          <nav class="hidden md:flex items-center gap-6">
            <router-link to="/search" class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Explorar alojamientos</router-link>
            <a href="#universidades" class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors" @click.prevent="scrollToUniversidades">Universidades</a>
            <router-link v-if="auth.user" to="/perfil/propiedades-guardadas" class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Mis favoritos</router-link>
            <a class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors" href="#">Ayuda</a>
          </nav>
        </div>

        <div class="hidden md:flex items-center gap-4">
          <template v-if="auth.user">
            <button @click="handlePublishClick"
              class="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg">
              <span class="truncate">
                {{ isOwner ? "Publica aquí" : "Publica tu alojamiento" }}
              </span>
            </button>
            <!-- <NotificacionButton /> -->
            <ProfileButton />
          </template>
          <template v-else>
            <button @click="showLogin = true"
              class="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
              Iniciar sesión
            </button>
          </template>
        </div>

        <div class="md:hidden flex items-center">
          <button @click="mobileMenuOpen = !mobileMenuOpen" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-primary hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary" aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg v-if="!mobileMenuOpen" class="block h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
            <svg v-else class="block h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div v-if="mobileMenuOpen" 
           class="fixed inset-x-0 top-16 bottom-0 z-40 md:hidden 
                  bg-indigo-900/95 dark:bg-slate-900/95 
                  flex flex-col items-center justify-start 
                  pt-8 px-6 overflow-y-auto min-h-screen">
        <div class="w-full flex flex-col items-center gap-6 mb-4">
          <template v-if="auth.user">
            <div class="flex gap-6 mb-2">
              <!-- <NotificacionButton class="text-white hover:text-primary-light" /> -->
              <ProfileButton class="text-white hover:text-primary-light" />
            </div>
          </template>
        </div>
        <nav class="w-full flex flex-col gap-6 border-b border-indigo-700/50 dark:border-slate-700/50 pb-6">
          <router-link @click="mobileMenuOpen = false" to="/search" class="text-xl font-bold text-white hover:text-primary transition-colors">Explorar alojamientos</router-link>
          <a @click.prevent="scrollToUniversidades(); mobileMenuOpen = false" href="#universidades" class="text-xl font-bold text-white hover:text-primary transition-colors">Universidades</a>
          <router-link v-if="auth.user" @click="mobileMenuOpen = false" to="/perfil/propiedades-guardadas" class="text-xl font-bold text-white hover:text-primary transition-colors">Mis favoritos</router-link>
          <a @click="mobileMenuOpen = false" href="#" class="text-xl font-bold text-white hover:text-primary transition-colors">Ayuda</a>
        </nav>
        <div class="mt-8 w-full flex flex-col gap-4 items-center">
          <template v-if="auth.user">
            <button @click="() => { handlePublishClick(); mobileMenuOpen = false; }" 
                    class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg text-base">
              <span class="truncate">{{ isOwner ? "Publica aquí" : "Publica tu alojamiento" }}</span>
            </button>
          </template>
          <template v-else>
            <button @click="showLogin = true; mobileMenuOpen = false" 
                    class="w-full bg-primary text-white px-4 py-3 rounded-lg text-base font-bold hover:bg-primary/90 transition-colors shadow-lg">
                    Iniciar sesión
            </button>
          </template>
        </div>
      </div>
    </transition>
    <LoginModal :show="showLogin" @close="showLogin = false" @login-success="onLoginSuccess" />
  </header>
</template>

<script setup>
// ... (El bloque script se mantiene igual ya que la lógica es correcta)
import { ref, onBeforeMount ,computed} from "vue";
import NotificacionButton from "./NotificacionButton.vue";
import { useAuthStore } from "../stores/auth";
import LoginModal from "../components/authorization/LoginModal.vue";
import ProfileButton from "../components/ProfileButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = useAuthStore();
const isDark = ref(false);
const showLogin = ref(false);
const mobileMenuOpen = ref(false);

const scrollToUniversidades = () => {
  const el = document.getElementById('universidades');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  } else {
    // fallback: ir a home y luego scroll
    router.push('/').then(() => {
      setTimeout(() => {
        const el2 = document.getElementById('universidades');
        if (el2) el2.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    });
  }
};

const isOwner = computed(() => {
  return auth.user?.roles?.includes("owner");
});

onBeforeMount(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    isDark.value = true;
    document.documentElement.classList.add("dark");
  }
});

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

const onLoginSuccess = () => {
  showLogin.value = false;
};
</script>

<style scoped>
/* Transición opcional, si no está en un archivo de estilos global */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>