import { createApp } from 'vue'
import App from './App.vue'

// 🧭 Router
import router from './router'

// 📦 Pinia
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { useAuthStore } from './stores/auth'


// Crear instancia de Vuetify
const vuetify = createVuetify({
  components,
  directives,
})
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
// Crear app y registrar plugins
const app = createApp(App)

app.use(pinia) // estado global
app.use(router)        // rutas
app.use(vuetify)       // UI


const auth = useAuthStore()
auth.loadUser()

app.mount('#app')
