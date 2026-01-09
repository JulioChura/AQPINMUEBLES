<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useAuthStore } from './stores/auth'
import { ref } from 'vue'

const auth = useAuthStore()
const isDark = ref(localStorage.getItem("theme") === "dark")

// 🔄 Mantiene sincronizado el login/logout entre pestañas
const syncStorage = () => {
  const storedUser = localStorage.getItem('user_info')
  if (storedUser) {
    auth.user = JSON.parse(storedUser)
    auth.isLogged = true
  } else {
    auth.user = null
    auth.isLogged = false
  }
  if (isDark.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

onMounted(() => {
  syncStorage()
  window.addEventListener('storage', syncStorage)
})

onUnmounted(() => {
  window.removeEventListener('storage', syncStorage)
})
</script>
