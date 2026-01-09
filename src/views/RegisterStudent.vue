<template>
  <div
    class="min-h-screen flex flex-col bg-background-dark text-content-light font-display overflow-hidden"
  >
    <HeaderComponent class="bg-background-dark" />

    <!-- Main -->
    <main
      class="flex flex-1 items-center justify-center py-16 px-4 sm:px-6 lg:px-8 animate-fade-in"
    >
      <div
        class="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 space-y-8 border border-gray-100"
      >
        <div class="animate-fade-up">
          <h2 class="text-center text-3xl font-extrabold text-slate-800">
            Crear cuenta
          </h2>
          <p class="mt-2 text-center text-slate-500 text-sm">
            Únete a nuestra comunidad de estudiantes.
          </p>
        </div>

        <form @submit.prevent="registerStudent" class="mt-6 space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              v-model="first_name"
              type="text"
              placeholder="Nombre"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/50 h-12 px-4 text-gray-800 transition-all"
              required
            />
            <input
              v-model="last_name"
              type="text"
              placeholder="Apellido"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/50 h-12 px-4 text-gray-800 transition-all"
              required
            />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              v-model="career"
              type="text"
              placeholder="Carrera"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/50 h-12 px-4 text-gray-800 transition-all"
              required
            />
            <select v-model="gender" class="w-full rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/50 h-12 px-4 text-gray-800 transition-all">
              <option disabled value="">Selecciona tu género</option>
              <option value="F">Femenino</option>
              <option value="M">Masculino</option>
              <option value="O">Otro</option>
            </select>
          </div>

          <input
            v-model="email"
            type="email"
            placeholder="Correo electrónico"
            class="w-full rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/50 h-12 px-4 text-gray-800 transition-all"
            required
          />

          <input
            v-model="password"
            type="password"
            placeholder="Contraseña"
            :minlength="6"
            class="w-full rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/50 h-12 px-4 text-gray-800 transition-all"
            required
          />

          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Confirmar contraseña"
            :minlength="6"
            class="w-full rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/50 h-12 px-4 text-gray-800 transition-all"
            required
          />

          <input
            v-model="phone_number"
            type="tel"
            placeholder="Número de teléfono"
            class="w-full rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/50 h-12 px-4 text-gray-800 transition-all"
            required
          />

          <div class="relative">
            <select
              v-model="selectedCampus"
              class="w-full rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/50 h-12 px-4 text-gray-800 transition-all pr-10"
              required
            >
              <option disabled value="">Selecciona tu campus</option>
              <option
                v-for="campus in campuses"
                :key="campus.id"
                :value="campus.id"
              >
                {{ campus.name }}
              </option>
            </select>
            <span
              class="material-symbols-outlined absolute right-3 top-3 text-gray-400 pointer-events-none"
            >
              expand_more
            </span>
          </div>

          <div class="flex items-center text-sm">
            <input
              v-model="acceptedTerms"
              type="checkbox"
              class="form-checkbox h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label class="ml-2">
              Acepto los
              <a href="#" class="text-primary hover:underline"
                >Términos y condiciones</a
              >.
            </label>
          </div>

          <button
            type="submit"
            class="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-md"
          >
            Registrarse
          </button>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import HeaderComponent from "../components/HeaderComponent.vue";
import { ref, onMounted } from "vue";
import { useAuthStore } from '../stores/auth'
import { useRouter } from "vue-router";
import { webPageData } from '/src/stores/webPageData.js';

const router = useRouter();
const auth = useAuthStore()
const storeWebPageData = webPageData();

const campuses = ref([]);

const fetchCampuses = async () => {
    try {
        campuses.value = await storeWebPageData.getUniversityCampus();
    } catch (err) {
        console.error("Error al obtener los campus:", err);
    }
};

// Asegurar fondo claro al entrar
onMounted(() => {
  fetchCampuses();
  document.documentElement.classList.remove("dark");
});

const first_name = ref("");
const last_name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const phone_number = ref("");
const selectedCampus = ref("");
const career = ref("");
const gender = ref("");
const acceptedTerms = ref(false);

const registerStudent = async () => {
  if (!acceptedTerms.value) return alert("⚠️ Debes aceptar los términos.");
  if (password.value !== confirmPassword.value)
    return alert("⚠️ Las contraseñas no coinciden.");

  const payload = {
    email: email.value,
    password: password.value,
    first_name: first_name.value,
    last_name: last_name.value,
    phone_number: phone_number.value,
    campuses: [selectedCampus.value],
    career: career.value,
    gender: gender.value,
  };

  const res = await auth.registerStudent(payload);
  if (res.success) {
    alert(res.message);
    router.push('/');
  } else {
    alert(`  ${res.message}`);
  }
};

const goToLogin = () => router.push("/");
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}
.animate-fade-up {
  animation: fadeIn 0.7s ease-out;
}
@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-down {
  animation: fadeDown 0.5s ease-out;
}
</style>

