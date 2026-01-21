<template>
  <div class="relative" ref="menu">
    <!-- Botón del perfil -->
    <button @click="toggleMenu" class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" :style="{
      backgroundImage: `url(${auth.user.avatar || '/src/public/default_avatar.png'})`
    }"></button>

    <!-- Menú desplegable -->
    <transition name="fade">
      <div v-if="profileOpen"
        class="absolute right-0 mt-2 w-56 bg-white dark:!bg-background-dark rounded-lg shadow-lg overflow-hidden z-20">
        <div class="p-4 border-b border-slate-200 dark:!border-slate-700">
          <p class="font-semibold text-slate-900 dark:text-white whitespace-normal">{{ auth.user.first_name }} {{
            auth.user.last_name }}</p>
          <p class="text-sm text-slate-500 dark:text-slate-400">{{ auth.user.email }}</p>
        </div>

        <nav class="py-2">
          <router-link to="/perfil"
            class="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            <span class="material-symbols-outlined text-base">person</span>
            <span>Profile Settings</span>
          </router-link>
          <router-link to="/perfil/propiedades-guardadas" class="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            <span class="material-symbols-outlined text-base">favorite</span>
            <span>My Favorites</span>
          </router-link>
        </nav>

        <div class="border-t border-slate-200 dark:border-slate-700 py-2">
          <button @click="onLogoutClick"
            class="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            <span class="material-symbols-outlined text-base">logout</span>
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import Loader from './Loader.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const profileOpen = ref(false)
const menu = ref(null)
const auth = useAuthStore();

console.log(JSON.stringify(auth.user, null, 2));

const toggleMenu = () => {
  profileOpen.value = !profileOpen.value
}

// Cierra el menú si haces click fuera
const handleClickOutside = (event) => {
  if (menu.value && !menu.value.contains(event.target)) {
    profileOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
const onLogoutClick = async () => {
  // Emit event to parent to show global logout spinner
  // Parent (HeaderComponent) will handle the spinner and redirect
  // This keeps the spinner overlay global
  // Use $emit for Options API, or defineEmits for script setup
  emit('logout');
};

const emit = defineEmits(['logout']);

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
