<template>
    <HeaderComponent />
    <main class="flex-1 p-6 sm:p-8 md:p-10">
        <div class="max-w-7xl mx-auto">
            <h2 class="text-2xl font-bold mb-1 text-black dark:!text-white">Verificar Perfil</h2>
            <p class="text-sm text-black/60 dark:text-white/60 mb-8">
                Completa estos pasos para verificar tu perfil y mejorar tu seguridad.
            </p>
            <div class="space-y-6">
                <div
                    class="bg-white/50 dark:bg-black/20 rounded-xl p-6 shadow-lg border border-black/10 dark:border-white/10 flex flex-col gap-6">
                    <div class="flex items-center justify-between">
                        <h3 class="text-xl font-semibold text-black dark:!text-white flex items-center gap-3">
                            <span class="material-symbols-outlined text-green-500 text-3xl">check_circle</span>
                            Verificación de Correo Electrónico
                        </h3>
                        <div
                            class="text-sm text-green-600 font-medium bg-green-100 dark:bg-green-800/50 px-3 py-1 rounded-full">
                            Completado
                        </div>
                    </div>
                    <p class="text-black/70 dark:text-white/70">
                        Tu dirección de correo electrónico ha sido verificada exitosamente, asegurando tu método de contacto principal.
                    </p>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div class="bg-primary h-2.5 rounded-full" style="width: 100%;"></div>
                    </div>
                    <button
                        class="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white text-lg font-medium rounded-lg opacity-50 cursor-not-allowed">
                        <span class="material-symbols-outlined text-xl">lock</span>
                        Correo Verificado
                    </button>
                </div>

                <div
                    class="bg-white/50 dark:bg-black/20 rounded-xl p-6 shadow-lg border border-black/10 dark:border-white/10 flex flex-col gap-6">
                    <div class="flex items-center justify-between">
                        <h3 class="text-xl font-semibold text-black dark:!text-white flex items-center gap-3">
                            <span class="material-symbols-outlined text-orange-500 text-3xl">sms</span>
                            Verificación de Número Telefónico
                        </h3>
                        <div
                            class="text-sm text-orange-600 font-medium bg-orange-100 dark:bg-orange-800/50 px-3 py-1 rounded-full">
                            Pendiente
                        </div>
                    </div>
                    <p class="text-black/70 dark:text-white/70">
                        Verifica tu número telefónico para habilitar notificaciones por SMS y opciones de recuperación de cuenta. Esto añade una capa adicional de seguridad.
                    </p>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div class="bg-primary h-2.5 rounded-full" style="width: 50%;"></div>
                    </div>
                    <button
                        class="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white text-lg font-medium rounded-lg hover:bg-primary/90 transition-colors">
                        <span class="material-symbols-outlined text-xl">phone_iphone</span>
                        Verificar Teléfono Ahora
                    </button>
                </div>

                <div
                    class="bg-white/50 dark:bg-black/20 rounded-xl p-6 shadow-lg border border-black/10 dark:border-white/10 flex flex-col gap-6">
                    <div class="flex items-center justify-between">
                        <h3 class="text-xl font-semibold text-black dark:!text-white flex items-center gap-3">
                            <span class="material-symbols-outlined text-gray-500 text-3xl">badge</span>
                            Carga de Documento de Identidad
                        </h3>
                        <div
                            class="text-sm text-gray-600 font-medium bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full">
                            No Iniciado
                        </div>
                    </div>
                    <p class="text-black/70 dark:text-white/70">
                        Sube un documento de identidad emitido por el gobierno para completar la verificación total de identidad. Tus datos serán cifrados y manejados con el máximo cuidado para proteger tu privacidad.
                    </p>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div class="bg-primary h-2.5 rounded-full" style="width: 0%;"></div>
                    </div>
                    <button
                        class="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white text-lg font-medium rounded-lg hover:bg-primary/90 transition-colors">
                        <span class="material-symbols-outlined text-xl">upload_file</span>
                        Subir Documento
                    </button>
                </div>

                <div
                    class="bg-white/50 dark:bg-black/20 rounded-xl p-6 shadow-lg border border-black/10 dark:border-white/10 flex flex-col gap-6">
                    <div class="flex items-center justify-between">
                        <h3 class="text-xl font-semibold text-black dark:!text-white flex items-center gap-3">
                            <span class="material-symbols-outlined text-gray-500 text-3xl">videocam</span>
                            Verificación por Videollamada
                        </h3>
                        <div
                            class="text-sm text-gray-600 font-medium bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full">
                            No Iniciado
                        </div>
                    </div>
                    <p class="text-black/70 dark:text-white/70">
                        Programa una breve videollamada con nuestro equipo de soporte para una confirmación final de identidad. Esto garantiza la máxima confianza y seguridad dentro de nuestra comunidad.
                    </p>
                    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div class="bg-primary h-2.5 rounded-full" style="width: 0%;"></div>
                    </div>
                    <button
                        class="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white text-lg font-medium rounded-lg hover:bg-primary/90 transition-colors">
                        <span class="material-symbols-outlined text-xl">calendar_month</span>
                        Programar Videollamada
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>
