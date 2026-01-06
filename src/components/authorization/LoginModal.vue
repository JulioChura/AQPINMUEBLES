<template>
  <div v-if="show" class="fixed inset-0 bg-black/40 flex min-h-screen items-center justify-center z-[9999] backdrop-blur-sm">
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 relative flex flex-col items-center justify-center mx-auto my-auto">
      <!-- Botón de cerrar -->
      <button @click="$emit('close')" class="absolute top-3 right-3 text-gray-500 hover:text-gray-700">✕</button>

      <!-- Título -->
      <h2 class="text-2xl font-bold mb-6 text-center text-primary">Iniciar sesión</h2>

      <!-- Formulario normal -->
      <form @submit.prevent="loginUser" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2" for="email">Email</label>
          <input
            v-model="email"
            id="email"
            type="email"
            placeholder="tu@email.com"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary bg-white text-gray-900 placeholder-gray-400"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2" for="password">Contraseña</label>
          <input
            v-model="password"
            id="password"
            type="password"
            placeholder="••••••••"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary bg-white text-gray-900 placeholder-gray-400"
          />
        </div>

        <div class="text-right">
          <a href="#" class="text-sm text-primary hover:underline">¿Olvidaste tu contraseña?</a>
        </div>

        <button
          type="submit"
          class="w-full py-3 px-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 focus:ring-2 focus:ring-primary"
        >
          Iniciar sesión
        </button>

        <!-- Separador -->
        <div class="relative flex items-center py-2">
          <div class="flex-grow border-t border-gray-200"></div>
          <span class="mx-4 text-sm text-gray-400">O</span>
          <div class="flex-grow border-t border-gray-200"></div>
        </div>

        <!-- Botón de Google -->
        <div class="flex justify-center">
          <div ref="googleButton"></div>
        </div>
      </form>

      <p class="text-center text-sm mt-8 text-gray-500">
        ¿No tienes una cuenta?
        <button
            @click="goToRegister"
            class="font-medium text-primary hover:underline"
        >
            Regístrate
        </button>
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";


const props = defineProps({ show: Boolean });
const emit = defineEmits(["close", "login-success"]);

//Register
const router = useRouter();
const auth = useAuthStore();

const goToRegister = () => {
  emit("close"); // Cierra el modal
  router.push("/register-student"); // Redirige a la vista de registro
};

const email = ref("");
const password = ref("");
const googleButton = ref(null);

// --- LOGIN NORMAL ---
const loginUser = async () => {
  console.log("Intentando login con:", email.value, password.value);
  const result = await auth.login(email.value, password.value);

  if (result.success) {
    alert("  Inicio de sesión exitoso");
    emit("login-success");
  } else {
    alert("  " + result.message);
  }
};

// --- GOOGLE LOGIN ---
function handleCredentialResponse(response) {
  if (!response.credential) {
    alert("Error: no se recibió ID Token de Google");
    return;
  }

  auth.googleLogin(response.credential).then((result) => {
    if (result.success) {
      alert("  Login exitoso con Google");
      emit("login-success");
    } else {
      alert("  " + result.message);
    }
  });
}

// --- Inicializar Google cuando esté listo ---
function ensureGoogleLoaded(callback) {
  if (window.google && window.google.accounts && window.google.accounts.id) {
    callback();
  } else {
    setTimeout(() => ensureGoogleLoaded(callback), 100);
  }
}

function renderGoogleButton() {
  if (!googleButton.value) return;
  ensureGoogleLoaded(() => {
    if (!window.googleInitialized) {
      console.log(          import.meta.env.VITE_GOOGLE_CLIENT_ID,
)
      window.google.accounts.id.initialize({
        client_id:
          import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
      window.googleInitialized = true;
    }

    // Limpia el contenido anterior para evitar duplicación del botón
    googleButton.value.innerHTML = "";

    window.google.accounts.id.renderButton(googleButton.value, {
      theme: "outline",
      size: "large",
      width: 300,
    });
  });
}

// --- Renderiza el botón al montar y al abrir el modal ---
onMounted(() => renderGoogleButton());

watch(
  () => props.show,
  (visible) => {
    if (visible) {
      // Espera un poco por la animación del modal
      setTimeout(renderGoogleButton, 150);
    }
  }
);
</script>
