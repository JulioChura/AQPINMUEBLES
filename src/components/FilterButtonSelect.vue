<template>
  <div class="relative" ref="rootEl">
    <button
      @click="toggleMenu"
      :class="isOpen
        ? 'flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors'
        : 'flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'"
      type="button"
    >
      <span>{{ selectedLabel }}</span>
      <svg aria-hidden="true" class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        />
      </svg>
    </button>
    <div
      v-if="isOpen"
      class="absolute top-full mt-2 w-64 bg-white dark:bg-background-dark rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-[2000]"
    >
      <h4 class="font-semibold text-gray-800 dark:text-white mb-2">
        {{ label }}
      </h4>
      <ul>
        <li
          v-for="(option, idx) in options"
          :key="optionKey(option, idx)"
          @click="selectOption(option)"
          :class="[
            'p-2 rounded-md cursor-pointer text-sm font-medium',
            isSelected(option)
              ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-300'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          ]"
        >
          {{ optionLabel(option) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  label: { type: String, default: 'Selecciona una opción' },
  options: { type: Array, default: () => [] },
  modelValue: { type: [String, Number, Object], default: null },
  optionLabelKey: { type: String, default: 'name' },
  optionValueKey: { type: String, default: 'id' },
});

const emit = defineEmits(['update:modelValue', 'select']);

const isOpen = ref(false);
const rootEl = ref(null);
const selected = ref(props.modelValue);

const selectedLabel = computed(() => {
  if (!selected.value) return `-- ${props.label} --`;
  if (typeof selected.value === 'object' && selected.value !== null) {
    return selected.value[props.optionLabelKey] || selected.value.label || selected.value.name || selected.value.toString();
  }
  // Try to find the label from options
  const found = props.options.find(
    o => (typeof o === 'object' ? o[props.optionValueKey] : o) === selected.value
  );
  if (found) {
    return typeof found === 'object' ? found[props.optionLabelKey] : found;
  }
  return selected.value;
});

function optionLabel(option) {
  return typeof option === 'object' ? option[props.optionLabelKey] : option;
}
function optionKey(option, idx) {
  return typeof option === 'object' ? option[props.optionValueKey] ?? idx : option;
}
function isSelected(option) {
  if (typeof option === 'object') {
    return selected.value && selected.value[props.optionValueKey] === option[props.optionValueKey];
  }
  return selected.value === option;
}
function toggleMenu() {
  isOpen.value = !isOpen.value;
}

function handleClickOutside(event) {
  if (!isOpen.value) return;
  const root = rootEl.value;
  if (root && !root.contains(event.target)) {
    isOpen.value = false;
  }
}

import { onMounted, onBeforeUnmount } from 'vue';
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
function selectOption(option) {
  selected.value = option;
  isOpen.value = false;
  emit('update:modelValue', option);
  emit('select', option);
}

watch(() => props.modelValue, (val) => {
  selected.value = val;
});
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
