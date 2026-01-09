<template>
  <div class="relative" ref="rootEl">
    <!-- Botón -->
    <button
        @click="toggleMenu"
        :class="isOpen 
            ? 'flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors' 
            : 'flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'"
        >
      <span>{{ selectedOption }}</span>
      <svg
        aria-hidden="true"
        class="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        />
      </svg>
    </button>

    <!-- Ventana modal -->
    <div
      v-if="isOpen"
      class="absolute top-full mt-2 w-64 bg-white dark:!bg-background-dark rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-[2000]"
    >
      <h4 class="font-semibold text-gray-800 dark:text-white mb-2">
        {{ titulo }}
      </h4>
      <ul>
        <li
          v-for="(opcion, index) in opciones"
          :key="index"
          @click="selectOption(opcion)"
          :class="[
            'p-2 rounded-md cursor-pointer text-sm font-medium',
            opcion === selectedOption
              ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-300'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          ]"
        >
          {{ opcion }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterButtonMultipleOptions",
  props: {
    titulo: {
      type: String,
      default: "Seleccione una opción",
    },
    opciones: {
      type: Array,
      default: () => [
        "Harvard University",
        "MIT",
        "Stanford University",
        "UC Berkeley",
      ],
    },
    defaultOption: {
        type: String,
        default: "",
    },
  },
  data() {
    return {
      isOpen: false,
      selectedOption: null,
    };
  },
  mounted() {
    // Initialize selectedOption with defaultOption when provided,
    // otherwise show a friendly placeholder based on the title.
    if (this.defaultOption && String(this.defaultOption).trim().length) {
      this.selectedOption = this.defaultOption;
    } else {
      this.selectedOption = `-- ${this.titulo} --`;
    }
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  watch: {
    opciones(newVal, oldVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal) && newVal && newVal.length > 0) {
        // If current selectedOption is not present in the new options, default to the first
        if (!this.selectedOption || !newVal.includes(this.selectedOption)) {
          this.selectedOption = newVal[0];
        }
      }
    },
  },
  
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    selectOption(opcion) {
      this.selectedOption = opcion;
      this.isOpen = false; // cerrar después de seleccionar
      this.$emit("optionFiltroSelected", opcion); // emitir evento con la opción seleccionada
    },
    handleClickOutside(event) {
      if (!this.isOpen) return;
      const root = this.$refs.rootEl;
      if (root && !root.contains(event.target)) {
        this.isOpen = false;
      }
    },
  },
};
</script>
