<template>
  <div
    class="min-h-screen flex flex-col bg-background-light text-content-light font-display overflow-hidden"
  >
    <HeaderComponent />

    <!-- Main -->
    <main
      class="flex flex-1 items-center justify-center py-16 px-4 sm:px-6 lg:px-8 animate-fade-in"
    >
      <div
        class="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 space-y-8 border border-gray-100"
      >
        <div class="animate-fade-up">
          <h2 class="text-center text-3xl font-extrabold text-slate-800">
            Registro de propietario
          </h2>
          <p class="mt-2 text-center text-slate-500 text-sm">
            Asegúrate de que tus nombres coincidan con los de tu DNI.
          </p>
        </div>

        <form @submit.prevent="registerOwner" class="mt-6 space-y-5">
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

          <input
            v-model="dni"
            type="text"
            placeholder="DNI"
            class="w-full rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/50 h-12 px-4 text-gray-800 transition-all"
            required
          />

          <input
            v-model="phone_number"
            type="tel"
            placeholder="Número de contacto"
            class="w-full rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/50 h-12 px-4 text-gray-800 transition-all"
            required
          />

          <input
            v-model="contact_address"
            type="text"
            placeholder="Dirección de contacto"
            class="w-full rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/50 h-12 px-4 text-gray-800 transition-all"
            required
          />

          <button
            type="submit"
            class="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-md"
          >
            Registrar perfil de propietario
          </button>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import HeaderComponent from "../components/HeaderComponent.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const auth = useAuthStore();

const first_name = ref("");
const last_name = ref("");
const dni = ref("");
const phone_number = ref("");
const contact_address = ref("");

// Asegurar tema claro al entrar
onMounted(() => {
  document.documentElement.classList.remove("dark");

  if (auth.user) {

    first_name.value = auth.user.first_name || "";
    last_name.value = auth.user.last_name || "";
  }
});

const registerOwner = async () => {
  const payload = {
    first_name: first_name.value,
    last_name: last_name.value,
    phone_number: phone_number.value,
    dni: dni.value,
    contact_address: contact_address.value,
  }

  const result = await auth.registerOwner(payload)

  if (result.success) {
    router.push("/")
  } else if (result.redirect) {
    router.push("/") // si no hay token
  }
}

const goHome = () => router.push("/");
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
