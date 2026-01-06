<template>

    <main class="flex-1 flex flex-col items-center justify-center py-10 px-4 md:px-10 lg:px-40">
        <div class="flex flex-col items-center text-center max-w-3xl">
            <div class="size-64 mb-8">
                <img alt="Welcome illustration" class="w-full h-full object-contain"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR54k7ttp9Vgk8oEICtpHti4c_w_vt-FAe174qWGCKcY4CR2hmvTrf3xLCdd9FnRpI9c2PvYCm_BQA7KDxJpD8zGhp-qjNlhDxJF1AstlfBUwFXLcPo4kIhldWoOCyRcAwLGgI7haqMNHnJoIWTgMllUdqt-3rNKgScU4TOeDlVWSxskKUI2I38dK4XeMXOQQYg1hLM5PpNBlFddcuKWweSG0fY57E4BlPByq35qqMg3g0Zu8jd7ZTSqDzXIEGV7gAinHNy2-9z6Y"
                    style='background-image: url("image-f0f5b1d049bb4e8daf8ef014b0dfa322");' />
            </div>
            <h1 class="text-[#111618] dark:text-white text-5xl font-extrabold leading-tight tracking-[-0.033em] mb-4">
                ¡Bienvenido a AlojaAQP, Propietario!
            </h1>
            <p class="text-[#617c89] dark:!text-gray-400 text-lg font-normal leading-relaxed mb-8">
                Comienza tu camino hacia una gestión exitosa de propiedades. Publica tus inmuebles y conecta con
                estudiantes interesados en encontrar su próximo hogar.
            </p>

            <div class="flex flex-col sm:flex-row gap-4">
                <!-- Botón principal -->

                <router-link to="/mis-propiedades/agregar" 
                    class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg flex-shrink-0 transition-all duration-300 hover:bg-[#0b4f82] dark:hover:!bg-[#409fff]">
                    <span class="truncate ">Publica tu primera propiedad</span>
                </router-link >

                <!-- Botón secundario -->
                <a href="#"
                    class="min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-transparent text-primary border border-primary text-base font-bold leading-normal tracking-[0.015em] flex-shrink-0 flex transition-all duration-300 hover:bg-primary hover:text-white dark:!text-primary dark:!border-primary dark:hover:!bg-primary/80 dark:hover:!text-white">
                    Saber más
                </a>

                <!-- Botón terciario -->
                <a href="#"
                    class="min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-transparent text-[#617c89] dark:!text-gray-400 border border-[#e0e3e5] dark:!border-gray-700 text-base font-bold leading-normal tracking-[0.015em] flex-shrink-0 flex transition-all duration-300 hover:bg-[#f5f7f8] hover:text-[#111618] dark:hover:!bg-gray-800 dark:hover:!text-white">
                    Guía de inicio
                </a>
            </div>

        </div>
    </main>
</template>