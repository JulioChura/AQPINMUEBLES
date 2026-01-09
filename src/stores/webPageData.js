import { defineStore } from "pinia";
import axios from "axios";

export const webPageData = defineStore("webPageData", {
  state: () => ({
    cache: {}, // aquí se guardan todas las respuestas por nombre
  }),

  actions: {
    async fetchData(resourceName, endpoint) {
      try {
        const token = localStorage.getItem("access_token");

        const headers = {};
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const res = await axios.get(`http://127.0.0.1:8000/api/${endpoint}/`, { headers });

        console.log(`  ${resourceName}:`, res.data);
        this.cache[resourceName] = res.data;
        return res.data;
      } catch (error) {
        console.error(
          `  Error al obtener ${resourceName}:`,
          error.response?.data || error.message
        );
        throw error;
      }
    },

    async getData(resourceName, endpoint) {
      if (!this.cache[resourceName]) {
        await this.fetchData(resourceName, endpoint);
      }
      return this.cache[resourceName];
    },

    async getTiposDePropiedad() {
      return await this.getData("tiposDePropiedad", "accommodation-types");
    },
    async getServicios() {
      return await this.getData("servicios", "predefined-services");
    },
    async getUniversityCampus() {
      return await this.getData(
        "universityCampus",
        "universities/university-campuses"
      );
    },
  },
});
