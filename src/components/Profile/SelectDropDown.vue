<template>
  <div ref="dropdownRef" class="relative md:col-span-2">
    <!-- Botón principal -->
    <button
      @click="toggle"
      class="w-full flex justify-between items-center px-4 py-2 text-left
             text-black dark:!text-white bg-transparent
             border border-black/20 dark:border-white/20
             focus:border-primary focus:ring-primary
             rounded-lg transition-all"
    >
      <span>{{ selectedOptionLabel }}</span>
      <span
        class="material-symbols-outlined text-gray-600 dark:text-white transition-transform"
        :class="{ 'rotate-180': open }"
      >
        expand_more
      </span>
    </button>

    <!-- Menú desplegable -->
    <transition name="fade-slide">
      <ul
        v-if="open"
        class="absolute z-10 w-full mt-1 bg-white dark:!bg-gray-800
               border border-black/20 dark:border-white/20
               rounded-lg shadow-lg overflow-hidden"
      >
        <li
          v-for="(option, index) in options"
          :key="index"
          @click="selectOption(option)"
          class="px-4 py-2 cursor-pointer
                 hover:bg-gray-100 dark:hover:bg-gray-700
                 text-black dark:!text-white transition-colors"
        >
          {{ option.name }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  modelValue: [String, Number],
  options: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const open = ref(false)

function toggle() {
  open.value = !open.value
}

function selectOption(option) {
  emit('update:modelValue', option.id)
  open.value = false
}

const selectedOptionLabel = computed(() => {
  const found = props.options.find(opt => opt.id === props.modelValue)
  return found ? found.name : 'Select a option'
})

// Cierra si se hace clic afuera
onClickOutside(() => (open.value = false))
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.15s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
