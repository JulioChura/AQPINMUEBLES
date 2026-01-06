<template>
  <div id="map" class="h-full w-full"></div>
</template>

<script>
import { onMounted, watch, ref, nextTick } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// removed leaflet-routing-machine: routing is provided by backend
import houseIconUrl from "../assets/house.svg";

export default {
  name: "MapView",
  props: {
    latitudCasa: Number,
    longitudCasa: Number,
    latitudUni: Number,
    longitudUni: Number,
    UniImgUrl: String,
    routeGeoJson: Object,
  },
  setup(props) {
  const map = ref(null);
  let markerLayer = null;
  let houseMarker = null;
  let uniMarker = null;
  let routeLine = null;

  const validNumber = (v) => typeof v === "number" && !isNaN(v);
  const getHouseLatLng = () => (validNumber(props.latitudCasa) && validNumber(props.longitudCasa)) ? [props.latitudCasa, props.longitudCasa] : null;
  const getUniLatLng = () => (validNumber(props.latitudUni) && validNumber(props.longitudUni)) ? [props.latitudUni, props.longitudUni] : null;

    const houseIcon = L.icon({
      iconUrl: houseIconUrl,
      iconSize: [40, 40],      // tamaño del ícono
      iconAnchor: [20, 40],    // punto de anclaje (mitad abajo)
      popupAnchor: [0, -40],   // dónde aparece el popup
    });

    const fitToMarkers = () => {
      const houseLatLng = getHouseLatLng();
      const uniLatLng = getUniLatLng();
      if (!map.value) return;

      // If both markers present, fit bounds to include both
      if (houseLatLng && uniLatLng) {
        try {
          const bounds = L.latLngBounds([houseLatLng, uniLatLng]);
          map.value.fitBounds(bounds, { padding: [50, 50] });
          return;
        } catch (e) {
          // fall through to setView
        }
      }

      // If only house is present, center on the house with a sensible zoom
      if (houseLatLng) {
        try {
          map.value.setView(houseLatLng, 15);
          return;
        } catch (e) {
          // noop
        }
      }

      // If only university is present, center on it
      if (uniLatLng) {
        try {
          map.value.setView(uniLatLng, 14);
        } catch (e) {
          // noop
        }
      }
    };

      const drawRecorrido = async () => {
        console.log('MapView.drawRecorrido -> props.routeGeoJson', props.routeGeoJson);
      const houseLatLng = getHouseLatLng();
      const uniLatLng = getUniLatLng();
        // If coordinates are missing or route is absent, remove any previous route layer
        if (routeLine && map.value) {
          try { map.value.removeLayer(routeLine); } catch (e) { /* noop */ }
          routeLine = null;
        }

        if (!houseLatLng || !uniLatLng) {
          console.warn('drawRecorrido: coordenadas faltantes', { houseLatLng, uniLatLng });
          return; // nothing to draw
        }

      // Ensure numeric types
      const hLat = Number(houseLatLng[0]);
      const hLng = Number(houseLatLng[1]);
      const uLat = Number(uniLatLng[0]);
      const uLng = Number(uniLatLng[1]);
      if ([hLat, hLng, uLat, uLng].some((v) => Number.isNaN(v))) {
        console.error('drawRecorrido: coordenadas inválidas', { houseLatLng, uniLatLng });
        return;
      }

      console.log('drawRecorrido -> from (lat,lng)', [hLat, hLng], 'to', [uLat, uLng]);

      // Remove previous route if present
      if (routeLine && map.value) {
        try { map.value.removeLayer(routeLine); } catch (e) { /* noop */ }
        routeLine = null;
      }

      // If the backend provided a GeoJSON route, draw that; otherwise do nothing.
      if (props.routeGeoJson) {
        try {
          routeLine = L.geoJSON(props.routeGeoJson, {
            style: function () {
              return { color: '#2563eb', weight: 4, opacity: 0.9 };
            }
          }).addTo(map.value);
          console.log('MapView.drawRecorrido -> route drawn, bounds:', routeLine.getBounds ? routeLine.getBounds() : null);
          // fit bounds to route if possible
          try {
            const bounds = routeLine.getBounds();
            if (bounds && !bounds.isEmpty()) map.value.fitBounds(bounds, { padding: [20, 20] });
          } catch (e) {
            // ignore
          }
        } catch (e) {
          console.warn('drawRecorrido: fallo al dibujar routeGeoJson', e, 'routeGeoJson:', props.routeGeoJson);
        }
      }
    };

    const createUniIcon = (url) => {
      const safeUrl = url || '';
      let src = '';
      try {
        // prefer absolute URLs (Cloudinary will be absolute); if it's relative, resolve against import.meta
        if (/^https?:\/\//.test(safeUrl)) src = safeUrl;
        else if (safeUrl) src = new URL(safeUrl, import.meta.url).href;
      } catch (err) {
        console.warn('createUniIcon: unable to resolve url', url, err);
        src = '';
      }

      // Safe-escape the src for embedding in html string
      const safeSrc = src ? String(src).replace(/"/g, '&quot;') : '';

      // simple inline SVG placeholder (keeps small bundle, no external asset)
      const placeholderSvg = encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10' fill='%23ef4444'/><text x='50%' y='55%' text-anchor='middle' fill='white' font-size='10' font-family='Arial' dy='0.35em'>UNI</text></svg>`
      );
      const placeholderData = `data:image/svg+xml;utf8,${placeholderSvg}`;

      // Build the img element with crossorigin and onerror fallback to placeholder
      const imgHtml = src
        ? `<img src="${safeSrc}" crossorigin="anonymous" onerror="this.onerror=null;this.src='${placeholderData}'" alt="uni"/>`
        : `<img src='${placeholderData}' alt='uni'/>`;

      return L.divIcon({
        className: 'custom-uni-icon',
        html: `
          <div class="uni-marker">
            ${imgHtml}
          </div>
        `,
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [0, -50],
      });
    };

    onMounted(async () => {

      await nextTick();

  // Pick a sensible initial center: house -> uni -> default (Arequipa)
  const houseLatLng = getHouseLatLng();
  const uniLatLng = getUniLatLng();
  const defaultCenter = [-16.409047, -71.537451];
  const initialCenter = houseLatLng || uniLatLng || defaultCenter;
  map.value = L.map("map").setView(initialCenter, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      }).addTo(map.value);

      markerLayer = L.layerGroup().addTo(map.value);

      // Create markers only if coordinates are present
      if (houseLatLng) {
        houseMarker = L.marker(houseLatLng, { icon: houseIcon }).addTo(markerLayer);
      }
      if (uniLatLng) {
        uniMarker = L.marker(uniLatLng, { icon: createUniIcon(props.UniImgUrl) }).addTo(markerLayer);
      }

      

      //para que el mapa no este bug
      const ensureSize = () => {
        if (map.value && map.value._container.offsetHeight > 0) {
          map.value.invalidateSize();
          drawRecorrido();

          fitToMarkers();
        } else {
          requestAnimationFrame(ensureSize);
        }
      };
      ensureSize();


    });

    watch(
      () => [props.latitudCasa, props.longitudCasa],
      ([newLat, newLng]) => {
        const newHouse = (validNumber(newLat) && validNumber(newLng)) ? [newLat, newLng] : null;
        if (map.value) {
          if (newHouse) {
            if (houseMarker) houseMarker.setLatLng(newHouse);
            else houseMarker = L.marker(newHouse, { icon: houseIcon }).addTo(markerLayer);
          }
          drawRecorrido();
          fitToMarkers();
        }
      }
    );

    watch(
      () => [props.latitudUni, props.longitudUni],
      ([newLat, newLng]) => {
        const newUni = (validNumber(newLat) && validNumber(newLng)) ? [newLat, newLng] : null;
        if (map.value) {
          if (newUni) {
            if (uniMarker) uniMarker.setLatLng(newUni);
            else uniMarker = L.marker(newUni, { icon: createUniIcon(props.UniImgUrl) }).addTo(markerLayer);
          } else {
            // remove existing uni marker when campus coords become absent
            if (uniMarker) {
              try { map.value.removeLayer(uniMarker); } catch (e) { /* noop */ }
              uniMarker = null;
            }
          }
          drawRecorrido();
          fitToMarkers();
        }
      }
    );

    watch(
      () => props.UniImgUrl,
      (newUrl) => {
        // Always update the uni marker icon if the marker exists; createUniIcon will
        // return a placeholder when newUrl is falsy.
        if (uniMarker) {
          try { uniMarker.setIcon(createUniIcon(newUrl)); } catch (e) { /* noop */ }
        }
      }
    );

    // Redraw route when routeGeoJson prop changes
    watch(
      () => props.routeGeoJson,
      (newRoute) => {
        try {
          if (map.value) {
            drawRecorrido();
          }
        } catch (e) {
          console.warn('watch routeGeoJson -> drawRecorrido error', e);
        }
      }
    );

    return {
      drawRecorrido
    };
  },
};
</script>
<style>
.uni-marker {
  background-color: white;
  /* azul Tailwind (blue-600) */
  border-radius: 50%;
  /* redondeado completo */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.uni-marker img {
  width: 100%;
  /* que ocupe todo el contenedor circular */
  height: 100%;
  object-fit: contain;
  padding: 6px; /* espacio interior para no pegar al borde */
  border-radius: 50%;
}
</style>