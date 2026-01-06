
<template>
    <HeaderComponent />
    <main class="flex-1 p-6 sm:p-8 md:p-10">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold mb-1 text-black dark:!text-white">Quick Access Dashboard</h2>
            <p class="text-sm text-black/60 dark:text-white/60 mb-8">Manage your most frequent settings quickly and
                easily.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                    class="bg-white/50 dark:bg-black/20 p-6 rounded-xl border border-black/10 dark:border-white/10 flex flex-col items-start">
                    <div class="flex items-center justify-between w-full mb-4">
                        <h3 class="text-lg font-semibold text-black dark:!text-white">Notifications</h3>
                        <Interruptor />
                    </div>
                    <p class="text-sm text-black/60 dark:text-white/60 mb-4">Receive alerts for new messages and
                        property updates.</p>
                    <button class="text-primary text-sm font-medium hover:underline">Customize</button>
                </div>
                <div
                    class="bg-white/50 dark:bg-black/20 p-6 rounded-xl border border-black/10 dark:border-white/10 flex flex-col items-start">
                    <div class="flex items-center justify-between w-full mb-4">
                        <h3 class="text-lg font-semibold text-black dark:!text-white">Privacy Settings</h3>
                        <Interruptor />
                    </div>
                    <p class="text-sm text-black/60 dark:text-white/60 mb-4">Control who can view your profile and
                        contact information.</p>
                    <button class="text-primary text-sm font-medium hover:underline">Manage Privacy</button>
                </div>
                <div
                    class="bg-white/50 dark:bg-black/20 p-6 rounded-xl border border-black/10 dark:border-white/10 flex flex-col items-start">
                    <div class="flex items-center justify-between w-full mb-4">
                        <h3 class="text-lg font-semibold text-black dark:!text-white">Linked Accounts</h3>
                        <span class="material-symbols-outlined text-primary text-2xl">link</span>
                    </div>
                    <p class="text-sm text-black/60 dark:text-white/60 mb-4">Connect or disconnect social media and
                        other platforms.</p>
                    <button class="text-primary text-sm font-medium hover:underline">View Connections</button>
                </div>
                <div
                    class="bg-white/50 dark:bg-black/20 p-6 rounded-xl border border-black/10 dark:border-white/10 flex flex-col items-start">
                    <div class="flex items-center justify-between w-full mb-4">
                        <h3 class="text-lg font-semibold text-black dark:!text-white">Email Preferences</h3>
                        <span class="material-symbols-outlined text-black/60 dark:text-white/60 text-2xl">mail</span>
                    </div>
                    <p class="text-sm text-black/60 dark:text-white/60 mb-4">Choose the types of emails you receive from
                        UniRentals.</p>
                    <button class="text-primary text-sm font-medium hover:underline">Edit Preferences</button>
                </div>
                <div
                    class="bg-white/50 dark:bg-black/20 p-6 rounded-xl border border-black/10 dark:border-white/10 flex flex-col items-start">
                    <div class="flex items-center justify-between w-full mb-4">
                        <h3 class="text-lg font-semibold text-black dark:!text-white">Theme</h3>
                        <div class="flex items-center gap-2">
                            <span
                                class="material-symbols-outlined text-black/60 dark:text-white/60 text-2xl">light_mode</span>
                            <DarkModeInterruptor />
                            <span
                                class="material-symbols-outlined text-black/60 dark:text-white/60 text-2xl">dark_mode</span>
                        </div>
                    </div>
                    <p class="text-sm text-black/60 dark:text-white/60 mb-4">Switch between light and dark mode for the
                        interface.</p>
                    <button class="text-primary text-sm font-medium hover:underline">Change Theme</button>
                </div>
                <div
                    class="bg-white/50 dark:bg-black/20 p-6 rounded-xl border border-black/10 dark:border-white/10 flex flex-col items-start">
                    <div class="flex items-center justify-between w-full mb-4">
                        <h3 class="text-lg font-semibold text-black dark:!text-white">Security</h3>
                        <span
                            class="material-symbols-outlined text-black/60 dark:text-white/60 text-2xl">security</span>
                    </div>
                    <p class="text-sm text-black/60 dark:text-white/60 mb-4">Update your password or enable two-factor
                        authentication.</p>
                    <button class="text-primary text-sm font-medium hover:underline">Manage Security</button>
                </div>
            </div>
        </div>
    </main>
</template>


<script setup lang="ts">
import DarkModeInterruptor from '../../components/Profile/DarkModeInterruptor.vue';
import Interruptor from '../../components/Profile/Interruptor.vue';

</script>
