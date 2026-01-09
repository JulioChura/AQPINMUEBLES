import { defineStore } from "pinia";
import axios from "axios";

export const useGestionComments = defineStore("gestionComentarios", {
  state: () => ({
    comentarios: null,
    nuevoComentarioComment:'',
    nuevoComentarioAccomodationId:null,
  }),

  actions: {
    getAuthHeaders() {
      const token = localStorage.getItem("access_token");
      const headers = {};
      if (token) headers.Authorization = `Bearer ${token}`;
      return { headers };
    },
    async fetchComentarios() {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/reviews/",
          this.getAuthHeaders()
        );
        this.comentarios = res.data;
        console.log("  comentarios cargadas:", this.comentarios);
      } catch (error) {
        this.error = error.response?.data || error.message;
        console.error("  Error al obtener comentarios:", this.error);
      } finally {
        this.loading = false;
      }
    },
    async getComentarios() {
      if (this.comentarios === null) {
        await this.fetchComentarios();
      }
      return this.comentarios;
    },
    async updateStateComentarios() {
      await this.fetchComentarios();
    },
    async publicarComentario() {
      const data = {
        rating:0,
        comment: this.nuevoComentarioComment,
        accommodation: this.nuevoComentarioAccomodationId,
      };
      console.log("la data a enviar al post comentario es",JSON.stringify(data))
      const res = await axios.post(
        "http://127.0.0.1:8000/api/reviews/",
        data,
        this.getAuthHeaders()
      );
      console.log(`  creado comentario:`, res.data);
      return res.data; // devuelve el alojamiento creado (con id)
    },
  },
});
