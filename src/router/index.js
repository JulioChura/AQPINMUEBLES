import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SearchDepa from '../views/SearchDepa.vue'
import ViewDepa from '../views/ViewDepa.vue'
import RegisterStudent from '../views/RegisterStudent.vue'
import RegisterOwner from '../views/RegisterOwner.vue'
import MisPropiedades from '../views/MisPropiedades/MisPropiedades.vue'
import AgregarPropiedad from '../views/MisPropiedades/AgregarPropiedad.vue'
import VerPropiedades from '../views/MisPropiedades/VerPropiedades.vue'
import Paso1 from '../views/MisPropiedades/AgregarPropiedad/Paso1.vue'
import Paso2 from '../views/MisPropiedades/AgregarPropiedad/Paso2.vue'
import Paso3 from '../views/MisPropiedades/AgregarPropiedad/Paso3.vue'
import Paso4 from '../views/MisPropiedades/AgregarPropiedad/Paso4.vue'
import Paso5 from '../views/MisPropiedades/AgregarPropiedad/Paso5.vue'
import Profile from '../views/Profile/Profile.vue'
import ViewProfile from '../views/Profile/ViewProfile.vue'
import EditProfile from '../views/Profile/EditProfile.vue'
import Settings from '../views/Profile/Settings.vue'
import SavedProperties from '../views/Profile/SavedProperties.vue'
import VerificarPerfil from '../views/Profile/VerifyProfile.vue'
import Mensajes from '../views/Profile/Mensajes.vue'
import Analytics from '../views/MisPropiedades/Analytics.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/search', name: 'SearchDepa', component: SearchDepa },
  { path: '/view/:id', name: 'VerDepa', component: ViewDepa },
  { path: '/register-student', name: 'RegisterStudent', component: RegisterStudent },
  { path: '/register-owner', name: 'RegisterOwner', component: RegisterOwner },
  {
    path: "/mis-propiedades",
    component: MisPropiedades,
    children: [
      { path: "", name: "VerPropiedades", component: VerPropiedades },
      { path: "analytics", name: "Analytics", component: Analytics },
      {
        path: "agregar",
        component: AgregarPropiedad,
        children: [
          { path: "", redirect: { name: "Paso1" } }, 
          { path: "paso1", name: "Paso1", component: Paso1 },
          { path: "paso2", name: "Paso2", component: Paso2 },
          { path: "paso3", name: "Paso3", component: Paso3 },
          { path: "paso4", name: "Paso4", component: Paso4 },
          { path: "paso5", name: "Paso5", component: Paso5 },
        ],
      },
    ],
  },
  { path: '/perfil',
     component: Profile ,
     children: [
      { path: "", redirect: { name: "VerPerfil" } },
      { path: "ver-perfil", name: "VerPerfil", component: ViewProfile },
      { path: "editar-perfil", name: "EditarPerfil", component: EditProfile },
      { path: "configuracion", name: "Configuracion", component: Settings },
      { path: "propiedades-guardadas", name: "PropiedadesGuardadas", component: SavedProperties },
      { path: "verificar-perfil", name: "VerificarPerfil", component: VerificarPerfil },
      { path: "mensajes", name: "Mensajes", component: Mensajes },
     ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Si el navegador guarda la posición (por ejemplo, al usar "back"), la usa
    if (savedPosition) {
      return savedPosition
    } else {
      // De lo contrario, siempre sube al tope de la página
      return { top: 0 }
    }
  },
})

export default router