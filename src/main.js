import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { useAuthStore } from './stores/auth'

// Toastification
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'


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

app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 2500,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
})


const auth = useAuthStore()
auth.loadUser()

app.mount('#app')
