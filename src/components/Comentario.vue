<template>
  <div class="flex gap-4">
    <!-- Imagen del autor -->
    <div
      class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
      :style="`background-image: url('${imagen}');`"
    ></div>

    <!-- Contenido del comentario -->
    <div class="flex-1">
      <div class="flex items-center gap-2">
        <p class="font-semibold text-gray-800 dark:text-white">
          {{ autor }}
        </p>

        <!-- Etiqueta de Author si isAutor es true -->
        <span
          v-if="isAutor"
          class="text-xs bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 px-2 py-0.5 rounded-full"
        >
          Author
        </span>
      </div>

      <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
        hace {{ diasAntiguedad }} {{ diasAntiguedad === 1 ? 'día' : 'días' }}
      </p>

      <p class="text-gray-600 dark:text-gray-300">
        {{ comentario }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  imagen: {
    type: String,
    required: true,
  },
  autor: {
    type: String,
    required: true,
  },
  diasAntiguedad: {
    type: [Number, String],
    required: true,
  },
  comentario: {
    type: String,
    required: true,
  },
  isAutor: {
    type: Boolean,
    default: false,
  },
});
</script>
