<template>
  <div class="inline-flex items-center justify-center" :class="$attrs.class">
    <component v-if="IconComp" :is="IconComp" :size="size" :stroke-width="strokeWidth" v-bind="$attrs" />
    <img v-else-if="url" :src="url" :alt="name" :style="{width: size + 'px', height: size + 'px'}" />
    <svg v-else xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import * as Lucide from 'lucide-vue-next'

const props = defineProps({
  name: { type: String, default: '' },
  url: { type: String, default: '' },
  size: { type: Number, default: 20 },
  strokeWidth: { type: [Number, String], default: 2 }
})

// Convert a name like "droplet" or "local_laundry_service" to PascalCase expected by Lucide exports
function toPascalCase(s) {
  if (!s) return ''
  return s
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .split(' ')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

const IconComp = computed(() => {
  const pascal = toPascalCase(props.name)
  return Lucide[pascal] || null
})
</script>

<style scoped>
.inline-flex > svg {
  display: block;
}
</style>
