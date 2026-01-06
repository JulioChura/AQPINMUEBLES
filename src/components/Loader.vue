<template>
  <div v-if="show" class="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
    <div class="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-white"></div>
    <p class="text-white text-xl font-semibold mt-4">{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true
  },
  message: {
    type: String,
    default: 'Loading...'
  }
})
</script>