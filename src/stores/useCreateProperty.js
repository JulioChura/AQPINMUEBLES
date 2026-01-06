import { defineStore } from "pinia";
import axios from "axios";

export const useCreateProperty = defineStore("propiedad", {
  state: () => ({
    title: "",
    description: "",
    address: "",
    accommodation_type: "",
    rooms: 1,
    latitude: "",
    longitude: "",
    amenidades: [],
    imagenes: [],
    // índice de la imagen marcada como principal
    main_image_index: 0,
    monthly_price: 0,
    coexistence_rules: "",
  }),

  actions: {
    // 🔹 Paso 1: Crear alojamiento
    async crearAlojamiento(token) {
      // Convertir saltos de línea a <br> para preservar formato en el backend
      const rawRules = this.coexistence_rules || "";
      const coexistenceHtml = String(rawRules).replace(/\r\n/g, "\n").replace(/\n/g, "<br>");

      const data = {
        title: this.title,
        description: this.description,
        accommodation_type: this.accommodation_type,
        address: this.address,
        latitude: parseFloat(this.latitude),
        longitude: parseFloat(this.longitude),
        monthly_price: this.monthly_price,
        coexistence_rules: coexistenceHtml,
        rooms: this.rooms,
      };

      const res = await axios.post(
        "http://127.0.0.1:8000/api/accommodations/",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(`  creado alojamiento:`, res.data);
      return res.data; // devuelve el alojamiento creado (con id)
    },

    // 🔹 Paso 2: Crear servicios (amenidades)
    async crearServicios(accommodationId, token) {
      // amenidades es un array de IDs o de objetos
      for (const servicioId of this.amenidades) {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/accommodation-services/",
          {
            accommodation: accommodationId,
            service: servicioId, // si tu modelo usa FK "service"
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(`  creado servicio:`, res.data);
      }

    },

    // 🔹 Paso 3: Subir fotos
    async subirFotos(accommodationId, token) {
      for (let i = 0; i < this.imagenes.length; i++) {
        const img = this.imagenes[i];
        const formData = new FormData();

        // Si es Base64, convertirla a File
        let file;
        if (typeof img === "string" && img.startsWith("data:image")) {
          const arr = img.split(",");
          const mime = arr[0].match(/:(.*?);/)[1];
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          file = new File([u8arr], `photo_${i}.${mime.split("/")[1]}`, {
            type: mime,
          });
        } else {
          // Si ya es un archivo tipo File
          file = img;
        }

        formData.append("accommodation", accommodationId);
        formData.append("image", file);
        formData.append("order_num", i + 1);
        // marcar la imagen principal según el índice en el store
        formData.append("is_main", i === Number(this.main_image_index) ? "1" : "0");

        const res = await axios.post(
          "http://127.0.0.1:8000/api/accommodation-photos/",
          formData,
          {
            headers: { Authorization: `Bearer ${token}` }, // dejar que axios asigne Content-Type con boundary
          }
        );
        console.log(`  creado foto:`, res.data);
      }
    },
    // 🔹 Flujo completo (si lo quieres automatizar todo)
    async publicarPropiedad() {
      const token = localStorage.getItem("access_token");
      const alojamiento = await this.crearAlojamiento(token);
      await this.crearServicios(alojamiento.id, token);
      await this.subirFotos(alojamiento.id, token);
      this.limpiarDatos();
      return alojamiento.id
    },

    // Métodos para guardar datos paso a paso (como ya tenías)
    setDatosPaso1(data) {
      this.title = data.title || '';
      this.description = data.description || '';
      this.address = data.address || '';
      this.accommodation_type = data.accommodation_type || null;
      this.rooms = data.rooms || 0;
      this.latitude = data.latitude || null;
      this.longitude = data.longitude || null;
      this.coexistence_rules = data.coexistence_rules || '';
    },
    setDatosPaso2(data) {
      this.amenidades = data.amenidades;
    },
    setDatosPaso3(data) {
      this.imagenes = data.imagenes;
    },
    setMainImageIndex(idx) {
      this.main_image_index = idx;
    },
    setDatosPaso4(data) {
      this.monthly_price = data.precio;
      this.coexistence_rules = data.reglas || "";
    },

    limpiarDatos() {
      this.$reset();
    },
  },

  persist: {
    key: "propiedad-data",
    storage: sessionStorage,
  },
});
