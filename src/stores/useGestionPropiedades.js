import { defineStore } from "pinia";
import axios from "axios";

// Controller to cancel in-flight filter requests
let _lastFilterAbortController = null;

export const useGestionPropiedades = defineStore("gestionPropiedades", {
  state: () => ({
    myPropiedades: null, // lista de alojamientos del usuario
    myPropiedadActual: null, // alojamiento seleccionado
    propiedadesPublicas: null,
      pagination: null,
      // page size must match backend `PublicAccommodationViewSet.TenPerPagePagination.page_size`
      pageSize: 6,
      // favorites: map of accommodationId -> favoriteId and cached favorite properties
      favoritesMap: {},
      favoriteProperties: [],
    propiedadPublicaActual: null,
    loading: false,
    error: null,
  }),

  actions: {
    // 🔐 Configura encabezados con token
    getAuthHeaders() {
      const token = localStorage.getItem("access_token");
      const headers = {};
      if (token) headers.Authorization = `Bearer ${token}`;
      return { headers };
    },
    getAuthHeaderDelete() {
      const token = localStorage.getItem("access_token");
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn("⚠️ No hay token en localStorage (access_token).");
      }
      return { headers };
    },

    // 📥 Listar mis propiedades
    async fetchMisPropiedades() {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/accommodations/",
          this.getAuthHeaders()
        );
        this.myPropiedades = res.data;
        console.log("  Propiedades cargadas:", this.myPropiedades);
      } catch (error) {
        this.error = error.response?.data || error.message;
        console.error("  Error al obtener mys Propiedades:", this.error);
      } finally {
        this.loading = false;
      }
    },
    async getMisPropiedades() {
      if (this.myPropiedades === null) {
        await this.fetchMisPropiedades();
      }
      return this.myPropiedades;
    },
    async updateStateMisPropiedades() {
      await this.fetchMisPropiedades();
    },
    // 🗑️ Eliminar (borrado lógico)
    async eliminarPropiedad(id) {
      try {
        const res = await axios.post(
          `http://127.0.0.1:8000/api/accommodations/${id}/delete-original/`,
          {},
          this.getAuthHeaders()
        );
        console.log("  Propiedad eliminada lógicamente:", res.data);
        await this.fetchMisPropiedades();
        return this.myPropiedades;
      } catch (error) {
        console.error(
          "  Error al eliminar propiedad:",
          error.response?.data || error.message
        );
        throw error;
      }
    },

    // 🌐 Publicar propiedad
    async publicarPropiedad(id) {
      try {
        const res = await axios.post(
          `http://127.0.0.1:8000/api/accommodations/${id}/publish/`,
          {},
          this.getAuthHeaders()
        );

        console.log("  Propiedad publicada:", res.data);

        await this.fetchMisPropiedades();
        return this.myPropiedades;
      } catch (error) {
        console.error(
          "  Error al publicar:",
          error.response?.data || error.message
        );
        throw error;
      }
    },

    // 👁️ Ocultar propiedad
    async ocultarPropiedad(id) {
      try {
        const res = await axios.post(
          `http://127.0.0.1:8000/api/accommodations/${id}/hide/`,
          {},
          this.getAuthHeaders()
        );
        console.log("  Propiedad ocultada:", res.data);

        await this.fetchMisPropiedades();

        return this.myPropiedades;
      } catch (error) {
        console.error(
          "  Error al ocultar propiedad:",
          error.response?.data || error.message
        );
        throw error;
      }
    },

    // 📄 Obtener una propiedad específica (detalle)
    async fetchMyPropiedad(id) {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/accommodations/${id}/`,
          this.getAuthHeaders()
        );
        this.myPropiedadActual = res.data;
        console.log("  Propiedad con id ", id, " obtenida :", res.data);
        return res.data;
      } catch (error) {
        this.error = error.response?.data || error.message;
        console.error(
          "  Error al obtener propiedad con id ",
          id,
          ":",
          this.error
        );
      } finally {
        this.loading = false;
      }
    },
    async getMyPropiedadActual(id) {
      if (this.myPropiedades && Array.isArray(this.myPropiedades)) {
        // Busca la propiedad por id
        const propiedad = this.myPropiedades.find(
          (p) => Number(p.id) === Number(id)
        );

        if (propiedad) {
          this.myPropiedadActual = propiedad;
          console.log("Propiedad encontrada localmente:", propiedad);
          return propiedad;
        }
      }
      console.log("Propiedad no encontrada localmente:");
      await this.fetchMyPropiedad(id);
      return this.myPropiedadActual;
    },
    async updateStateMyPropiedadActual(id) {
      await this.fetchMyPropiedad(id);
    },
    async fetchPropiedadesPublicas(page = null) {
      this.loading = true;
      this.error = null;
      try {
        const params = {};
        if (page !== null && page !== undefined) params.page = page;
        const res = await axios.get(
          "http://127.0.0.1:8000/api/public/accommodations/",
          { params, ...this.getAuthHeaders() }
        );
        // handle paginated or non-paginated responses
        this.propiedadesPublicas = res.data.results ? res.data.results : res.data;
        // store pagination metadata when present
        if (res.data && res.data.results) {
          this.pagination = {
            count: res.data.count,
            next: res.data.next,
            previous: res.data.previous,
          };
        } else {
          this.pagination = null;
        }
        console.log(
          "  Propiedades publicas cargadas:",
          this.propiedadesPublicas
        );
          // return the loaded page for caller convenience
          return this.propiedadesPublicas;
      } catch (error) {
        this.error = error.response?.data || error.message;
        console.error("  Error al obtener Propiedades publicas:", this.error);
      } finally {
        this.loading = false;
      }
    },

    // Helper: compute total pages according to backend pageSize
    getTotalPages() {
      if (!this.pagination || !this.pagination.count) return null;
      return Math.ceil(this.pagination.count / this.pageSize);
    },
    async getPropiedadesPublicas() {
      if (this.propiedadesPublicas === null) {
        await this.fetchPropiedadesPublicas();
      }
      return this.propiedadesPublicas;
    },

    // ---------- New: Autocomplete and filtered fetch ----------
    async autocompletePublicProperties(q, limit = 8) {
      if (!q || q.trim().length < 2) return [];
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/public/accommodations/autocomplete/",
          { params: { q, limit }, ...this.getAuthHeaders() }
        );
        return res.data;
      } catch (err) {
        console.error("Error autocomplete:", err.response?.data || err.message);
        return [];
      }
    },

    async fetchPropiedadesFiltradas(params = {}) {
      this.loading = true;
      this.error = null;
      try {
        console.log('fetchPropiedadesFiltradas -> params', params);

        // cancel previous in-flight filter request (if any)
        try {
          if (_lastFilterAbortController) _lastFilterAbortController.abort();
        } catch (e) {
          /* ignore */
        }
        _lastFilterAbortController = new AbortController();
        const signal = _lastFilterAbortController.signal;

        const res = await axios.get(
          "http://127.0.0.1:8000/api/public/accommodations/filter/",
          { params, signal, ...this.getAuthHeaders() }
        );

        // Guardar los valores globales de precio y habitaciones mínimo y máximo si existen en la respuesta
        if (res.data) {
          this.globalMinPrice = res.data.global_min_price !== undefined ? Number(res.data.global_min_price) : null;
          this.globalMaxPrice = res.data.global_max_price !== undefined ? Number(res.data.global_max_price) : null;
          this.globalMinRooms = res.data.global_min_rooms !== undefined ? Number(res.data.global_min_rooms) : null;
          this.globalMaxRooms = res.data.global_max_rooms !== undefined ? Number(res.data.global_max_rooms) : null;
        } else {
          this.globalMinPrice = null;
          this.globalMaxPrice = null;
          this.globalMinRooms = null;
          this.globalMaxRooms = null;
        }

        console.log('fetchPropiedadesFiltradas -> status', res.status, 'data preview:', Array.isArray(res.data) ? res.data.slice(0,3) : res.data);
        // Debug: print full response payload (may be large) and sample university_distances for first results
        try {
          console.log('fetchPropiedadesFiltradas -> full response data:', res.data);
          const sample = (res.data.results ? res.data.results : (Array.isArray(res.data) ? res.data : [])).slice(0,3).map(p => ({ id: p.id, title: p.title, university_distances: p.university_distances ? p.university_distances.slice(0,3) : p.university_distances }));
          console.log('fetchPropiedadesFiltradas -> sample properties with university_distances:', sample);
        } catch (e) {
          console.warn('fetchPropiedadesFiltradas -> debug logging failed', e);
        }
        // support paginated responses
        this.propiedadesPublicas = res.data.results ? res.data.results : res.data;
        // store pagination metadata when present
        if (res.data && res.data.results) {
          this.pagination = {
            count: res.data.count,
            next: res.data.next,
            previous: res.data.previous,
          };
        } else {
          this.pagination = null;
        }
        console.log('fetchPropiedadesFiltradas -> propiedadesPublicas set length', this.propiedadesPublicas?.length);

        // clear controller only if it is the one we created
        _lastFilterAbortController = null;

        return this.propiedadesPublicas;
      } catch (err) {
        // treat cancellations specially so caller can ignore
        if (err?.code === 'ERR_CANCELED' || err?.name === 'CanceledError' || String(err?.message).toLowerCase().includes('aborted')) {
          console.log('fetchPropiedadesFiltradas -> request canceled');
          return null;
        }
        this.error = err.response?.data || err.message;
        console.error("Error al obtener propiedades filtradas:", this.error);
        return [];
      } finally {
        this.loading = false;
      }
    },
  state: () => ({
    myPropiedades: null,
    myPropiedadActual: null,
    propiedadesPublicas: null,
    pagination: null,
    pageSize: 6,
    favoritesMap: {},
    favoriteProperties: [],
    propiedadPublicaActual: null,
    loading: false,
    error: null,
    globalMinPrice: null, // Nuevo: precio mínimo global
    globalMaxPrice: null, // Nuevo: precio máximo global
    globalMinRooms: null, // Nuevo: habitaciones mínimas global
    globalMaxRooms: null, // Nuevo: habitaciones máximas global
  }),

    async fetchUniversities() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/universities/");
        let data = res.data.results ? res.data.results : res.data;

        // Some backends expose an API root with links, e.g. { universities: 'http://.../universities/' }
        // In that case follow the link (or extract the array if present)
        if (data && typeof data === "object" && !Array.isArray(data)) {
          // if the key points to a URL (string), request it
          const potentialUrl = data.universities || data["universities/"] || data["university-campuses"] || data["university-campuses/"];
          if (typeof potentialUrl === "string") {
            const res2 = await axios.get(potentialUrl);
            data = res2.data.results ? res2.data.results : res2.data;
          } else if (Array.isArray(data.universities)) {
            data = data.universities;
          } else {
            // fallback: no usable payload, return empty array
            console.warn("fetchUniversities: API returned an object but no 'universities' array or URL was found.", data);
            return [];
          }
        }

        return data;
      } catch (err) {
        console.error("Error al obtener universidades:", err.response?.data || err.message);
        return [];
      }
    },

    async fetchPredefinedServices() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/predefined-services/");
        return res.data.results ? res.data.results : res.data;
      } catch (err) {
        console.error("Error al obtener servicios predefinidos:", err.response?.data || err.message);
        return [];
      }
    },
    async updateStatePropiedadesPublicas() {
      await this.fetchPropiedadesPublicas();
    },
    async fetchPropiedadPublica(id, params = {}) {
      this.loading = true;
      this.error = null;
      try {
        const options = { params, ...this.getAuthHeaders() };
        const res = await axios.get(
          `http://127.0.0.1:8000/api/public/accommodations/${id}/`,
          options
        );
        this.propiedadPublicaActual = res.data;
        console.log("  Propiedad con id ", id, " obtenida :", res.data);
        return res.data;
      } catch (error) {
        this.error = error.response?.data || error.message;
        console.error(
          "  Error al obtener propiedad con id ",
          id,
          " publica:",
          this.error
        );
      } finally {
        this.loading = false;
      }
    },
    
    // ------ Favorites handling ------
    // map of accommodationId -> favoriteId for quick lookup
    async fetchFavorites() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/favorites/", this.getAuthHeaders());
        // build map
        const map = {};
        if (Array.isArray(res.data)) {
          for (const f of res.data) {
            // f.accommodation may be an id or object; prefer id
            const accId = f.accommodation && typeof f.accommodation === 'object' ? f.accommodation.id : f.accommodation;
            if (accId) map[accId] = f.id;
          }
        }
        this.favoritesMap = map;
        return map;
      } catch (err) {
        console.error('fetchFavorites error', err.response?.data || err.message);
        return {};
      }
    },

    async fetchFavoriteProperties() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/favorites/", this.getAuthHeaders());
        const favs = Array.isArray(res.data) ? res.data : [];
        const accIds = favs.map(f => (f.accommodation && typeof f.accommodation === 'object') ? f.accommodation.id : f.accommodation).filter(Boolean);
        // fetch accommodations in parallel
        const accPromises = accIds.map(id => axios.get(`http://127.0.0.1:8000/api/public/accommodations/${id}/`, this.getAuthHeaders()).then(r => r.data).catch(() => null));
        const accommodations = (await Promise.all(accPromises)).filter(Boolean);
        // update local map and list
        const map = {};
        for (const f of favs) {
          const accId = f.accommodation && typeof f.accommodation === 'object' ? f.accommodation.id : f.accommodation;
          if (accId) map[accId] = f.id;
        }
        this.favoritesMap = map;
        this.favoriteProperties = accommodations;
        return accommodations;
      } catch (err) {
        console.error('fetchFavoriteProperties error', err.response?.data || err.message);
        return [];
      }
    },

    async addFavorite(accommodationId) {
      try {
        const res = await axios.post("http://127.0.0.1:8000/api/favorites/", { accommodation: accommodationId }, this.getAuthHeaders());
        const fav = res.data;
        // update map
        this.favoritesMap = { ...(this.favoritesMap || {}), [accommodationId]: fav.id };
        // refresh favoriteProperties list so UI shows up-to-date list
        try {
          await this.fetchFavoriteProperties();
        } catch (e) {
          // ignore refresh errors
        }
        return fav;
      } catch (err) {
        // Handle case where backend raises IntegrityError for duplicate favorite (returns 500)
        const status = err?.response?.status;
        const dataText = typeof err?.response?.data === 'string' ? err.response.data : JSON.stringify(err?.response?.data || '');
        console.warn('addFavorite error', status, dataText);
        if (status === 500 && dataText && (dataText.includes('duplicate key') || dataText.toLowerCase().includes('already exists') || dataText.toLowerCase().includes('unique constraint'))) {
          // The favorite already exists; refresh favorites map and return existing favorite id if found
          try {
            await this.fetchFavorites();
            const existingFavId = this.favoritesMap && this.favoritesMap[accommodationId];
            if (existingFavId) return { id: existingFavId, accommodation: accommodationId };
          } catch (e) {
            // ignore
          }
          // fallback: resolve gracefully
          return null;
        }
        console.error('addFavorite unexpected error', err.response?.data || err.message);
        throw err;
      }
    },

    async removeFavoriteByAccommodation(accommodationId) {
      try {
        // ensure we have the latest favorites map before attempting delete
        try {
          await this.fetchFavorites();
        } catch (e) {
          // ignore fetch error, we'll proceed with whatever map we have
        }
        let favId = this.favoritesMap && this.favoritesMap[accommodationId];
        if (!favId) return false;
        try {
          await axios.delete(`http://127.0.0.1:8000/api/favorites/${favId}/`, this.getAuthHeaders());
        } catch (err) {
          // If forbidden, try refreshing favorites in case the mapping changed and retry once
          if (err?.response?.status === 403) {
            try {
              await this.fetchFavorites();
              favId = this.favoritesMap && this.favoritesMap[accommodationId];
              if (favId) {
                await axios.delete(`http://127.0.0.1:8000/api/favorites/${favId}/`, this.getAuthHeaders());
              } else {
                // mapping not found after refresh — treat as already removed
                return false;
              }
            } catch (e) {
              console.error('removeFavoriteByAccommodation retry error', e.response?.data || e.message);
              throw e;
            }
          } else {
            throw err;
          }
        }

        const newMap = { ...(this.favoritesMap || {}) };
        delete newMap[accommodationId];
        this.favoritesMap = newMap;
        // refresh favoriteProperties list to keep UI in sync
        try {
          await this.fetchFavoriteProperties();
        } catch (e) {
          // ignore
        }
        return true;
      } catch (err) {
        console.error('removeFavoriteByAccommodation error', err.response?.data || err.message);
        throw err;
      }
    },
    async getPropiedadPublicaActual(id) {
      if (this.propiedadPublicaActual === null) {
        await this.fetchPropiedadPublica(id);
      }
      return this.propiedadPublicaActual;
    },
    async updateStatePropiedadPublicaActual(id, params = {}) {
      await this.fetchPropiedadPublica(id, params);
    },

    async crearServicios(arrBodyCrearServicios) {
      // amenidades es un array de IDs o de objetos
      for (const bodyCrearServicio of arrBodyCrearServicios) {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/accommodation-services/",
          bodyCrearServicio,
          this.getAuthHeaders()
        );
        console.log(`  creado servicio:`, res.data);
      }
    },
    async borrarServicios(arrBodyDeleteServicios) {
      // amenidades es un array de IDs o de objetos
      for (const bodyDeleteServicio of arrBodyDeleteServicios) {
        console.log("bodyDeleteServicio", JSON.stringify(bodyDeleteServicio));
        const authHeaders = this.getAuthHeaders();
        console.log("🔑 Cabeceras:", authHeaders);

        if (!authHeaders.headers.Authorization) {
          console.error("  No se encontró token de autenticación.");
          return;
        }
        const res = await axios.delete(
          `http://127.0.0.1:8000/api/accommodation-services/${bodyDeleteServicio.id}/`,
          authHeaders
        );
        console.log(`  servicio borrado:`, res.data);
      }
    },
    async borrarFotos(arrBodyDeletePhotos) {
      // amenidades es un array de IDs o de objetos
      for (const bodyDeletePhoto of arrBodyDeletePhotos) {
        console.log("bodyDeletePhoto", JSON.stringify(bodyDeletePhoto));
        const authHeaders = this.getAuthHeaders();
        console.log("🔑 Cabeceras:", authHeaders);

        if (!authHeaders.headers.Authorization) {
          console.error("  No se encontró token de autenticación.");
          return;
        }
        const res = await axios.delete(
          `http://127.0.0.1:8000/api/accommodation-photos/${bodyDeletePhoto.id}/`,
          authHeaders
        );
        console.log(`  photo borrado:`, res.data);
      }
    },
    // 🔹 Paso 3: Subir fotos
    async subirFotos(accommodationId,arrBodyCreatePhotos ) {
      for (let i = 0; i < arrBodyCreatePhotos.length; i++) {
        const img = arrBodyCreatePhotos[i];
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

        const res = await axios.post(
          "http://127.0.0.1:8000/api/accommodation-photos/",
          formData,
          this.getAuthHeaders()
        );
        console.log(`  creado foto:`, res.data);
      }
    },

    // ✏️ Editar propiedad existente
    async actualizarMyPropiedad(id, data) {
      try {
        const res = await axios.patch(
          `http://127.0.0.1:8000/api/accommodations/${id}/`,
          data,
          this.getAuthHeaders()
        );
        // Actualiza en el array local
        const index = this.myPropiedades.findIndex((p) => p.id === id);
        if (index !== -1) this.myPropiedades[index] = res.data;
        console.log("  Propiedad actualizada:", res.data);
        return res.data;
      } catch (error) {
        console.error(
          "  Error al actualizar propiedad:",
          error.response?.data || error.message
        );
        throw error;
      }
    },

    async actualizarMyPropiedadAllProperties(payload) {
      try {

        const ActualizarPropiedadBody =
          this.crearBodyActualizarMyPropiedad(payload);
        
        await this.actualizarMyPropiedad(payload.id, ActualizarPropiedadBody);
        const arrBodyDeleteServices = this.crearArrBodyDeleteServices(payload);
        const arrBodyCreateServices = this.crearArrBodyCreateServices(payload);

        await this.borrarServicios(arrBodyDeleteServices);
        await this.crearServicios(arrBodyCreateServices);

        const arrBodyDeletePhotos = this.crearArrBodyDeletePhotos(payload);

        await this.borrarFotos(arrBodyDeletePhotos)

        const arrBodyCreatePhotos = this.crearArrBodyCreatePhotos(payload);

        await this.subirFotos(payload.id,arrBodyCreatePhotos)

      } catch (error) {
        console.error("  Error en actualizarMyPropiedadAllProperties:", error);
      }
    },
    crearBodyActualizarMyPropiedad(payload) {
      // Convertir saltos de línea a <br> para preservar formato al renderizar
      const rawRules = payload.coexistence_rules || "";
      const normalizedRules = String(rawRules).replace(/\r\n/g, "\n").replace(/\n/g, "<br>");

      const filteredData = {
        title: payload.title,
        description: payload.description,
        address: payload.address,
        latitude: payload.latitude,
        longitude: payload.longitude,
        monthly_price: payload.monthly_price,
        coexistence_rules: normalizedRules,
        rooms: payload.rooms,
        accommodation_type: payload.accommodation_type,
      };
      return filteredData;
    },
    crearArrBodyDeleteServices(payload) {
      if (
        !payload.previousServices ||
        !Array.isArray(payload.previousServices)
      ) {
        return [];
      }

      // Mapea cada servicio previo a su id en formato { id: id }
      const deleteBody = payload.previousServices.map((service) => ({
        id: service.id,
      }));

      return deleteBody;
    },
    crearArrBodyCreateServices(payload) {
      // Verifica que existan servicios nuevos
      if (!payload.nextServices || !Array.isArray(payload.nextServices)) {
        return [];
      }

      // Mapea cada id de servicio nuevo al formato esperado por el backend
      const createBody = payload.nextServices.map((serviceId) => ({
        accommodation: payload.id,
        service: serviceId,
      }));

      return createBody;
    },
    crearArrBodyDeletePhotos(payload) {

      const nextPhotos = payload.nextPhotos || [];

      // Filtra las fotos anteriores que ya no están en nextPhotos
      const deleteBody = payload.photos
        .filter((photo) => !nextPhotos.includes(photo.image))
        .map((photo) => ({ id: photo.id }));

      return deleteBody;
    },
    crearArrBodyCreatePhotos(payload) {
      
      const previousPhotos = payload.photos || [];
      const nextPhotos = payload.nextPhotos || [];

      // Extrae solo las URLs de las fotos anteriores
      const previousUrls = previousPhotos.map((photo) => photo.image);

      // URLs nuevas que no existían antes
      const createBody = nextPhotos
        .filter((url) => !previousUrls.includes(url))
        .map((url) => (url));
      return createBody;
    },
  },
});
