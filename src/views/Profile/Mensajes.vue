<template>
    <HeaderComponent />
    <main class="flex-1 p-6 sm:p-8 md:p-10">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold mb-1 text-black dark:!text-white">Messages</h2>
            <p class="text-sm text-black/60 dark:text-white/60 mb-8">Your inbox for all communications on UniRentals.
            </p>
            <div
                class="bg-white/50 dark:bg-black/20 p-6 rounded-xl shadow-lg border border-black/10 dark:border-white/10 mb-8">
                <h3 class="text-xl font-semibold text-black dark:!text-white mb-4">Recent Conversations</h3>
                <div class="space-y-4">
                    <div
                        class="flex items-center gap-4 p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
                        <div class="size-12 rounded-full bg-cover bg-center"
                            style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbcSJGXjwe15FmpE-nQeMV0Nxiocw-qrqL7JhxnO5kbra1GVc6jQhPfxdCMd1S5qaZb2-rx0sjTuvz78s9pbvc4E-gOHZacQXPYjCbyaq_0aLG76oTwXDKBSbiOoQfBK3hz11-mfC2ZOfLa4dNmFG1aeK0T5dSJirbm_jDsCi-LvxG2fZCrsnllJuBJui1dih7JmF0ot9QmUGz_nX8TE_FdB_Vzi5pa4dkJYh-ZlJHcHph0iYCBMshkWvJTafeH4aH5FOFG9gouai7");'>
                        </div>
                        <div class="flex-1">
                            <div class="flex justify-between items-center">
                                <span class="font-medium text-black dark:!text-white">Alice Smith</span>
                                <span class="text-xs text-black/60 dark:text-white/60">2 hours ago</span>
                            </div>
                            <p class="text-sm text-black/70 dark:text-white/70 truncate">Hey, is the apartment near the
                                university still available?</p>
                        </div>
                        <span class="size-3 bg-red-500 rounded-full"></span>
                    </div>
                    <div
                        class="flex items-center gap-4 p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
                        <div class="size-12 rounded-full bg-cover bg-center"
                            style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbcSJGXjwe15FmpE-nQeMV0Nxiocw-qrqL7JhxnO5kbra1GVc6jQhPfxdCMd1S5qaZb2-rx0sjTuvz78s9pbvc4E-gOHZacQXPYjCbyaq_0aLG76oTwXDKBSbiOoQfBK3hz11-mfC2ZOfLa4dNmFG1aeK0T5dSJirbm_jDsCi-LvxG2fZCrsnllJuBJui1dih7JmF0ot9QmUGz_nX8TE_FdB_Vzi5pa4dkJYh-ZlJHcHph0iYCBMshkWvJTafeH4aH5FOFG9gouai7");'>
                        </div>
                        <div class="flex-1">
                            <div class="flex justify-between items-center">
                                <span class="font-medium text-black dark:!text-white">John Doe</span>
                                <span class="text-xs text-black/60 dark:text-white/60">Yesterday</span>
                            </div>
                            <p class="text-sm text-black/70 dark:text-white/70 truncate">Thanks for showing me the
                                place! I'll think about it.</p>
                        </div>
                    </div>
                    <div
                        class="flex items-center gap-4 p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
                        <div class="size-12 rounded-full bg-cover bg-center"
                            style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbcSJGXjwe15FmpE-nQeMV0Nxiocw-qrqL7JhxnO5kbra1GVc6jQhPfxdCMd1S5qaZb2-rx0sjTuvz78s9pbvc4E-gOHZacQXPYjCbyaq_0aLG76oTwXDKBSbiOoQfBK3hz11-mfC2ZOfLa4dNmFG1aeK0T5dSJirbm_jDsCi-LvxG2fZCrsnllJuBJui1dih7JmF0ot9QmUGz_nX8TE_FdB_Vzi5pa4dkJYh-ZlJHcHph0iYCBMshkWvJTafeH4aH5FOFG9gouai7");'>
                        </div>
                        <div class="flex-1">
                            <div class="flex justify-between items-center">
                                <span class="font-medium text-black dark:!text-white">UniRentals Support</span>
                                <span class="text-xs text-black/60 dark:text-white/60">3 days ago</span>
                            </div>
                            <p class="text-sm text-black/70 dark:text-white/70 truncate">Your listing "Cozy Studio near
                                Campus" has been approved!</p>
                        </div>
                        <span class="size-3 bg-red-500 rounded-full"></span>
                    </div>
                </div>
                <button
                    class="mt-6 w-full bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors">
                    View All Messages
                </button>
            </div>
        </div>
    </main>
</template>