<template>
  <div class="flex justify-between items-start mb-8 relative px-4 sm:px-0">
    <div class="absolute w-[95%] sm:w-full h-1 bg-gray-200 dark:bg-gray-700 top-1/2 -translate-y-1/2 rounded-full left-1/2 -translate-x-1/2"></div>

    <div
      class="absolute h-1 bg-primary top-1/2 -translate-y-1/2 rounded-full transition-all duration-500 left-[2.5%] sm:left-0"
      :style="{ width: progressWidth }"
    ></div>

    <div
      v-for="(s, index) in steps"
      :key="index"
      class="flex flex-1 justify-center items-center flex-col gap-2 relative z-10 mx-1 sm:mx-0"
      :class="{
        'pointer-events-none': index === 0, // Evita que el primer elemento influya en el espaciado si no lo necesitas
      }"
    >
      <div
        class="size-10 flex items-center justify-center rounded-full font-bold transition-colors duration-300 flex-shrink-0"
        :class="{
          'bg-primary text-white': step >= s.number,
          'bg-gray-200 dark:bg-gray-700 text-gray-500': step < s.number
        }"
      >
        {{ s.number }}
      </div>
      <p
        class="text-xs sm:text-sm font-medium transition-colors duration-300 text-center leading-tight mt-1"
        :class="step >= s.number ? 'text-primary' : 'text-gray-500 dark:text-gray-400'"
      >
        {{ s.label }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  step: {
    type: Number,
    required: true,
  },
});

const steps = [
  { number: 1, label: "Detalles" }, 
  { number: 2, label: "Amenidades" },
  { number: 3, label: "Fotos" },
  { number: 4, label: "Precio" },
  { number: 5, label: "Publicar" }, 
];


const progressWidth = computed(() => {
  const numSteps = steps.length; // 5
  const intervals = numSteps - 1; // 4
  
  const calculatedWidth = ((props.step - 1) / intervals) * 100;


  if (props.step === 1) return "0%"; 
  if (props.step === 2) return "25%"; 
  if (props.step === 3) return "50%";
  if (props.step === 4) return "75%";
  return "100%";
});

</script>