<template>
  <div class="flex flex-col gap-3 pb-3 bg-white dark:!bg-gray-800 rounded-xl shadow-sm max-w-sm">
    <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-t-xl" data-alt="Imagen de la propiedad"
      :style="{ backgroundImage: `url(${props.imagen})` }"></div>

    <div class="p-4 flex flex-col gap-3">
      <p class="text-gray-800 dark:text-white text-lg font-semibold">
        {{ props.titulo }}
      </p>

      <div class="flex items-center justify-between">
        <p class="text-primary text-lg font-bold">
          ${{ props.precio }}/mensual
        </p>
      </div>

      <div class="flex items-center justify-between">
        <!-- Estado visual -->
        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" :class="estadoClase">
          {{ estadoLabel }}
        </span>

        <!-- Botones de acción -->
        <div class="flex gap-2 items-center">


          <!-- Botones CRUD -->
          <button aria-label="Editar propiedad"
            class="flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white text-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 ease-in-out"
            @click="$emit('editar', props.id)">
            <span class="material-symbols-outlined">edit</span>
          </button>

          <button aria-label="Ver propiedad"
            class="flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary/20 text-primary text-xl hover:bg-primary/30 transition-colors duration-200 ease-in-out"
            @click="$emit('ver', { id: props.id, estado: props.estado })">
            <span class="material-symbols-outlined">visibility</span>
          </button>

          <button aria-label="Eliminar propiedad"
            class="flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-red-100 text-red-700 text-xl hover:bg-red-200 dark:hover:bg-red-900 transition-colors duration-200 ease-in-out"
            @click="$emit('eliminar', props.id)">
            <span class="material-symbols-outlined">delete</span>
          </button>

            <!-- 🔽 Selector de estado -->
            <div class="relative" @click.stop="toggleMenu" ref="menuRef">
              <button aria-label="Cambiar estado"
                class="flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-blue-100 text-blue-700 text-xl hover:bg-blue-200 dark:hover:!bg-blue-900 transition-colors duration-200 ease-in-out">
                <span class="material-symbols-outlined">more_vert</span>
              </button>

              <!-- Menú desplegable -->

              <div v-if="menuAbierto"
                class="absolute right-0 mt-2 w-40 bg-white dark:!bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-150">
                <button v-for="estado in estadosFiltrados" :key="estado.value"
                  class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
                  @click.stop="cambiarEstado(estado.value)">
                  {{ estado.label }}
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { onClickOutside } from '@vueuse/core'
//   Definimos las props y las guardamos en una variable
const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  precio: {
    type: [String, Number],
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
    required: true,
  },
});

//cambiar el valor de estado a español para mostrarlo en la pagina
const estadoLabel = computed(() => {
  switch (props.estado.toLowerCase()) {
    case "published":
      return "Publicado"
    case "hidden":
      return "Oculto"
    case "draft":
      return "Borrador"
    default:
      return props.estado
  }
})

const emit = defineEmits(["editar", "ver", "eliminar", "cambiar-estado"]);
const menuAbierto = ref(false);
const menuRef = ref(null)

onClickOutside(menuRef, () => {
  menuAbierto.value = false
})

const estadosDisponibles = [
  { value: "published", label: "Publicar" },
  { value: "hidden", label: "Ocultar" },
];
//  Filtrar los estados diferentes al actual
const estadosFiltrados = computed(() =>
  estadosDisponibles.filter((e) => e.value !== props.estado)
);

const toggleMenu = () => {
  menuAbierto.value = !menuAbierto.value;
};

const cambiarEstado = (nuevoEstado) => {
  menuAbierto.value = false;
  emit("cambiar-estado", { id: props.id, estado: nuevoEstado });
};
//   Computed para cambiar color según estado
const estadoClase = computed(() => {
  const estado = props.estado.toLowerCase();

  if (estado === "published") return "bg-green-100 text-green-800";  //   Publicado
  if (estado === "draft") return "bg-yellow-100 text-yellow-800";    // 📝 Borrador
  if (estado === "hidden") return "bg-gray-200 text-gray-800";       // 👁️‍🗨️ Oculto
  if (estado === "deleted") return "bg-red-100 text-red-800";        //   Eliminado
  return "bg-gray-100 text-gray-800";
});
</script>
