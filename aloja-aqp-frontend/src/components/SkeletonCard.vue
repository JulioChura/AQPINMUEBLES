<template>
  <div class="animate-pulse bg-white dark:bg-background-dark rounded-xl shadow-md overflow-hidden border dark:border-gray-800">
    <div class="w-full h-40 bg-gray-200 dark:bg-gray-700"></div>
    <div class="p-4">
      <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkeletonCard'
}
</script>

<style scoped>
.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}
</style>
