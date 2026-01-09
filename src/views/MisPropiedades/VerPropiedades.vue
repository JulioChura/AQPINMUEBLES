<template>
  <div v-if="propiedades.length > 0">
    <VerMisPropiedades @sinPropiedades="handleSinPropiedades"/>
  </div>
  <div v-else>
    <NoHayPropiedades/>
  </div>
</template>

<script setup>

import { ref, onMounted } from "vue";
import { useGestionPropiedades } from "/src/stores/useGestionPropiedades.js";
import VerMisPropiedades from "../../components/MisPropiedades/VerMisPropiedades/verMisPropiedades.vue";
import NoHayPropiedades from "../../components/MisPropiedades/VerMisPropiedades/noHayPropiedades.vue";


const storePropiedades = useGestionPropiedades();
const propiedades = ref([]);

const fetchMyProperties = async () => {
  try {
    propiedades.value = await storePropiedades.getMisPropiedades();
    console.log("Propiedades obtenidas:", JSON.stringify(propiedades.value));
  } catch (err) {
    console.error("Error al obtener propiedades:", err);
  }
};

const handleSinPropiedades = () => {
  console.log("No hay más propiedades, cambiar vista o mostrar mensaje");
  fetchMyProperties()
};

onMounted(() => { 
  fetchMyProperties(); 
});
</script>