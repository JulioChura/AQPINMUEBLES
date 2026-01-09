<template>
  <div class="relative" ref="dropdown">
    <!-- Botón de notificaciones -->
    <button
      @click="toggleNotifications"
      class="relative text-primary dark:!text-primary-dark transition-colors "
    >
      <span class="material-symbols-outlined text-3xl">notifications</span>
      <span
        class="absolute top-0 right-0 -mt-1 -mr-1 size-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold"
      >
        3
      </span>
    </button>

    <!-- Dropdown -->
    <div
      v-show="notificationsOpen"
      class="absolute right-0 mt-2 w-80 bg-white dark:!bg-background-dark rounded-lg shadow-lg overflow-hidden z-50"
    >
      <div class="p-4">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white">Notifications</h3>
          <button
            @click="notificationsOpen = false"
            class="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <span class="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
      </div>

      <div class="divide-y divide-slate-200 dark:divide-slate-700 whitespace-normal">
        <a class="block p-4 hover:bg-slate-50 dark:hover:bg-slate-800" href="#">
          <div class="flex items-start gap-4">
            <span class="material-symbols-outlined text-primary mt-1 text-xl">info</span>
            <div>
              <p class="font-semibold text-sm text-slate-900 dark:text-white">
                New message from Landlord John Doe
              </p>
              <p class="text-xs text-slate-600 dark:text-slate-400">2 hours ago</p>
            </div>
          </div>
        </a>

        <a class="block p-4 hover:bg-slate-50 dark:hover:bg-slate-800" href="#">
          <div class="flex items-start gap-4">
            <span class="material-symbols-outlined text-primary mt-1 text-xl">home</span>
            <div>
              <p class="font-semibold text-sm text-slate-900 dark:text-white">
                New listing matching your preferences
              </p>
              <p class="text-xs text-slate-600 dark:text-slate-400">1 day ago</p>
            </div>
          </div>
        </a>

        <a class="block p-4 hover:bg-slate-50 dark:hover:bg-slate-800" href="#">
          <div class="flex items-start gap-4">
            <span class="material-symbols-outlined text-amber-500 mt-1 text-xl">warning</span>
            <div>
              <p class="font-semibold text-sm text-slate-900 dark:text-white">
                Verify your email address
              </p>
              <p class="text-xs text-slate-600 dark:text-slate-400">3 days ago</p>
            </div>
          </div>
        </a>
      </div>

      <div class="p-4 text-center">
        <a class="text-sm font-medium text-primary hover:underline" href="#">
          View all notifications
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const notificationsOpen = ref(false);
const dropdown = ref(null);

function toggleNotifications() {
  notificationsOpen.value = !notificationsOpen.value;
}

// Cerrar al hacer clic fuera
function handleClickOutside(event) {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    notificationsOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
