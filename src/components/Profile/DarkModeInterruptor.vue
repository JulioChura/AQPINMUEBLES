<template>

    <Interruptor :model-value="isDark" @change="toggleDarkMode" />

</template>

<script setup>
import Interruptor from "./Interruptor.vue";
import { ref } from 'vue'

const isDark = ref(localStorage.getItem("theme") === "dark")


function toggleDarkMode() {
    isDark.value = !isDark.value;

    if (isDark.value) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
    }
}
</script>