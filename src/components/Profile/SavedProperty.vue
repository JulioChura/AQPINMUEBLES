<template>
  <div
    class="group relative bg-white/50 dark:bg-black/20 rounded-xl overflow-hidden shadow-lg border border-black/10 dark:border-white/10 cursor-grab active:cursor-grabbing property-card"
  >
    <img
      :src="image"
      :alt="title"
      class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
    />

    <div class="p-4 flex flex-col items-start">
      <h3 class="text-lg font-semibold text-black dark:!text-white">{{ title }}</h3>
      <p class="text-sm text-black/60 dark:text-white/60">{{ price }}</p>

      <div
        class="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <button
          class="bg-white/80 dark:bg-black/50 p-2 rounded-full text-black dark:text-white hover:bg-white dark:hover:bg-black"
        >
          <span class="material-symbols-outlined text-base">edit</span>
        </button>
        <button
          class="bg-white/80 dark:bg-black/50 p-2 rounded-full text-red-500 hover:bg-white dark:hover:bg-black"
        >
          <span class="material-symbols-outlined text-base">delete</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
</script>
