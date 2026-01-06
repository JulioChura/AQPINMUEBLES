<template>
  <label class="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      class="sr-only peer"
      :checked="modelValue"
      @change="toggle"
    />
    <div
      class="w-11 h-6 bg-black/20 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 dark:peer-focus:ring-primary rounded-full peer dark:bg-white/20 peer-checked:after:translate-x-[19px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-black/20 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
    ></div>
  </label>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Permitir usar v-model desde el padre
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'change']);

// Cuando el usuario cambia el estado
const toggle = (event) => {
  const checked = event.target.checked;
  emit('update:modelValue', checked); // para v-model
  emit('change', checked);            // evento personalizado opcional
};
</script>
