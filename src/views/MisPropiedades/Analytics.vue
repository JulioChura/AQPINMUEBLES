<template>
    <main class="flex-1 p-8 bg-background-light dark:bg-background-dark overflow-y-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="col-span-1 md:col-span-3">
                <h1 class="text-3xl font-bold text-text-light dark:text-text-dark flex items-center gap-2">
                    <span class="material-symbols-outlined text-accent-1 text-4xl">military_tech</span>
                    Your Performance Journey
                </h1>
                <p class="text-lg text-muted-light dark:text-muted-dark mt-1">Celebrate your progress and unlock new
                    achievements!</p>
            </div>
            <div class="bg-white dark:!bg-surface-dark p-6 rounded-lg shadow animate-slide-in-up">
                <h3 class="text-xl font-medium text-text-light dark:text-text-dark flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">trending_up</span>
                    Overall Success Level
                </h3>
                <div class="mt-4">
                    <p class="text-4xl font-bold text-primary">Level 5</p>
                    <p class="text-sm text-muted-light dark:text-muted-dark mt-1">Pathfinder Rank</p>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-3 relative overflow-hidden">
                        <div class="bg-accent-2 h-3 rounded-full transition-all duration-1000 ease-out"
                            style="width: 75%"></div>
                        <div class="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                            75% to Level 6</div>
                    </div>
                </div>
            </div>
            <div class="bg-white dark:!bg-surface-dark p-6 rounded-lg shadow animate-slide-in-up delay-100">
                <h3 class="text-xl font-medium text-text-light dark:text-text-dark flex items-center gap-2">
                    <span class="material-symbols-outlined text-accent-1">workspace_premium</span>
                    Recent Achievement
                </h3>
                <div class="flex items-center gap-4 mt-4">
                    <span class="material-symbols-outlined text-accent-1 text-5xl animate-pulse-grow">stars</span>
                    <div>
                        <p class="text-2xl font-bold text-accent-1">"View King" Badge!</p>
                        <p class="text-sm text-muted-light dark:text-muted-dark mt-1">Achieved 500+ views this month.
                        </p>
                    </div>
                </div>
            </div>
            <div class="bg-white dark:!bg-surface-dark p-6 rounded-lg shadow animate-slide-in-up delay-200">
                <h3 class="text-xl font-medium text-text-light dark:text-text-dark flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">visibility</span>
                    Total Publication Views
                </h3>
                <p class="text-4xl font-bold text-primary mt-2">1,850</p>
                <p class="text-sm text-green-500 flex items-center mt-1">
                    <span class="material-icons text-base">arrow_upward</span>
                    +25% vs last month
                </p>
            </div>
            <div class="md:col-span-2 bg-white dark:!bg-surface-dark p-6 rounded-lg shadow animate-fade-in">
                <h3 class="text-xl font-medium text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">insights</span>
                    Dynamic Performance Flow
                </h3>
                <div class="flex flex-col @container">
                    <div class="flex justify-between items-center mb-4 flex-wrap gap-2">
                        <div class="flex items-center gap-2 flex-wrap">
                            <label class="text-sm font-medium text-text-light dark:text-text-dark sr-only"
                                for="chart-type">Chart Type:</label>
                            <select
                                class="p-2 border border-border-light dark:border-border-dark rounded-lg text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                                id="chart-type">
                                <option value="line">Line Chart</option>
                                <option value="bar">Bar Chart</option>
                                <option value="area">Area Chart</option>
                            </select>
                            <label class="text-sm font-medium text-text-light dark:text-text-dark sr-only"
                                for="timeframe">Timeframe:</label>
                            <select
                                class="p-2 border border-border-light dark:border-border-dark rounded-lg text-text-light dark:text-text-dark bg-background-light dark:!bg-background-dark focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                                id="timeframe">
                                <option value="month">Last Month</option>
                                <option value="quarter">Last Quarter</option>
                                <option value="year">Last Year</option>
                            </select>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <button
                                class="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-primary text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary">
                                <span class="material-symbols-outlined text-base">visibility</span>
                                Views
                            </button>
                            <button
                                class="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary">
                                <span class="material-symbols-outlined text-base">chat_bubble</span>
                                Inquiries
                            </button>
                            <button
                                class="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary">
                                <span class="material-symbols-outlined text-base">event_available</span>
                                Bookings
                            </button>
                        </div>
                    </div>
                    <div class="relative h-72 w-full">
                        <svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 200">
                            <line stroke="#E5E7EB" stroke-width="1" x1="20" x2="380" y1="180" y2="180"></line>
                            <line stroke="#E5E7EB" stroke-width="1" x1="20" x2="20" y1="20" y2="180"></line>
                            <line stroke="#F3F4F6" stroke-dasharray="2,2" stroke-width="1" x1="20" x2="380" y1="140"
                                y2="140"></line>
                            <line stroke="#F3F4F6" stroke-dasharray="2,2" stroke-width="1" x1="20" x2="380" y1="100"
                                y2="100"></line>
                            <line stroke="#F3F4F6" stroke-dasharray="2,2" stroke-width="1" x1="20" x2="380" y1="60"
                                y2="60"></line>
                            <polyline fill="none" points="20,160 80,100 140,120 200,80 260,110 320,70 380,40"
                                stroke="#3B82F6" stroke-width="2"></polyline>
                            <polyline fill="none" points="20,170 80,130 140,110 200,100 260,130 320,110 380,90"
                                stroke="#10B981" stroke-dasharray="4,2" stroke-width="2"></polyline>
                            <circle cx="20" cy="160" fill="#3B82F6" r="3"></circle>
                            <circle cx="80" cy="100" fill="#3B82F6" r="3"></circle>
                            <circle cx="140" cy="120" fill="#3B82F6" r="3"></circle>
                            <circle cx="200" cy="80" fill="#3B82F6" r="3"></circle>
                            <circle cx="260" cy="110" fill="#3B82F6" r="3"></circle>
                            <circle cx="320" cy="70" fill="#3B82F6" r="3"></circle>
                            <circle cx="380" cy="40" fill="#3B82F6" r="3"></circle>
                            <rect class="chart-tooltip" fill="rgba(0,0,0,0.7)" height="0" rx="4" ry="4"
                                style="opacity:0;" width="0" x="0" y="0"></rect>
                            <text class="chart-tooltip-text" fill="white" style="opacity:0; font-size:10px;" x="0"
                                y="0"></text>
                            <rect class="drill-down-area" fill="transparent" height="0" width="0" x="0" y="0"></rect>
                            <text class="drill-down-text" fill="#6B7280" font-size="16" style="opacity:0;"
                                text-anchor="middle" x="50%" y="50%">Click to drill down</text>
                        </svg>
                    </div>
                    <div
                        class="mt-4 text-center text-sm text-muted-light dark:text-muted-dark flex flex-wrap justify-center gap-4">
                        <div class="flex items-center gap-1">
                            <span class="w-3 h-3 rounded-full bg-primary"></span> Views
                        </div>
                        <div class="flex items-center gap-1">
                            <span class="w-3 h-3 rounded-full bg-accent-2"></span> Inquiries
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="md:col-span-1 bg-white dark:!bg-surface-dark p-6 rounded-lg shadow animate-slide-in-up delay-300">
                <h3 class="text-xl font-medium text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">trending_up</span>
                    Views Per Publication
                </h3>
                <div class="space-y-5">
                    <div>
                        <div class="flex justify-between text-base">
                            <span class="text-text-light dark:text-text-dark">123 Maple St</span>
                            <span class="font-medium text-primary">520 views</span>
                        </div>
                        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-2 relative overflow-hidden">
                            <div class="bg-primary h-3 rounded-full transition-all duration-700 ease-out"
                                style="width: 85%"></div>
                            <div
                                class="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                                85% of target</div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between text-base">
                            <span class="text-text-light dark:text-text-dark">456 Oak Ave</span>
                            <span class="font-medium text-primary">480 views</span>
                        </div>
                        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-2 relative overflow-hidden">
                            <div class="bg-primary h-3 rounded-full transition-all duration-700 ease-out"
                                style="width: 78%"></div>
                            <div
                                class="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                                78% of target</div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between text-base">
                            <span class="text-text-light dark:text-text-dark">789 Pine Ln</span>
                            <span class="font-medium text-primary">410 views</span>
                        </div>
                        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-2 relative overflow-hidden">
                            <div class="bg-primary h-3 rounded-full transition-all duration-700 ease-out"
                                style="width: 65%"></div>
                            <div
                                class="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                                65% of target</div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="col-span-1 md:col-span-3 bg-white dark:!bg-surface-dark p-6 rounded-lg shadow animate-slide-in-up delay-400">
                <h3 class="text-xl font-medium text-text-light dark:text-text-dark mb-4 flex items-center gap-2">
                    <span class="material-symbols-outlined text-accent-1">emoji_events</span>
                    Upcoming Challenges &amp; Rewards
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div
                        class="border border-border-light dark:border-border-dark p-4 rounded-lg flex items-center gap-4">
                        <span class="material-symbols-outlined text-accent-2 text-4xl">star_half</span>
                        <div>
                            <p class="font-medium text-text-light dark:text-text-dark">Reach 1000 Total Views</p>
                            <p class="text-sm text-muted-light dark:text-muted-dark">Reward: "Community Hero" Badge</p>
                        </div>
                    </div>
                    <div
                        class="border border-border-light dark:border-border-dark p-4 rounded-lg flex items-center gap-4">
                        <span class="material-symbols-outlined text-accent-2 text-4xl">local_fire_department</span>
                        <div>
                            <p class="font-medium text-text-light dark:text-text-dark">5-Day Listing Streak</p>
                            <p class="text-sm text-muted-light dark:text-muted-dark">Reward: 10% Fee Discount</p>
                        </div>
                    </div>
                    <div
                        class="border border-border-light dark:border-border-dark p-4 rounded-lg flex items-center gap-4">
                        <span class="material-symbols-outlined text-accent-2 text-4xl">thumb_up</span>
                        <div>
                            <p class="font-medium text-text-light dark:text-text-dark">Receive 5 Positive Reviews</p>
                            <p class="text-sm text-muted-light dark:text-muted-dark">Reward: "Tenant's Choice" Badge</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>