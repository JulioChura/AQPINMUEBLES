<template>
    <div id="select-map" class="h-full w-full rounded-lg overflow-hidden"></div>
</template>

<script>
import { ref, onMounted, nextTick, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import houseIconUrl from "../../../assets/house.svg";

export default {
    name: "SelectLocationMap",
    props: {
        predefinedUbication: {
            type: Object,
            default: null,
        },
    },
    emits: ["ubicacion-seleccionada"],
    setup(props, { emit }) {
        const map = ref(null);
        let markerLayer = null;
        let houseMarker = null;

        const houseIcon = L.icon({
            iconUrl: houseIconUrl,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
        });

        onMounted(async () => {
            await nextTick();

            const defaultCoords = [-16.409047, -71.537451];
            const initialCoords = props.predefinedUbication
                ? [props.predefinedUbication.latitud, props.predefinedUbication.longitud]
                : defaultCoords;

            // Crear el mapa centrado en una posición por defecto
            map.value = L.map("select-map").setView(initialCoords, 13);

            // Cargar los tiles de OpenStreetMap
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
            }).addTo(map.value);

            // Capa para los marcadores
            markerLayer = L.layerGroup().addTo(map.value);

            // Si se definió una ubicación preexistente, colocar el marcador
            if (props.predefinedUbication) {
                console.log("ubicacion predefinida ",initialCoords)
                houseMarker = L.marker(initialCoords, { icon: houseIcon })
                    .addTo(markerLayer)
                    .bindPopup("Ubicación seleccionada")
                    .openPopup();
            }

            // Escuchar clics en el mapa
            map.value.on("click", (e) => {
                const { lat, lng } = e.latlng;

                // Si ya hay un marcador, moverlo
                if (houseMarker) {
                    houseMarker.setLatLng([lat, lng]);
                } else {
                    // Crear un nuevo marcador
                    houseMarker = L.marker([lat, lng], { icon: houseIcon })
                        .addTo(markerLayer)
                        .bindPopup("Selected Location")
                        .openPopup();
                }

                // Reverse geocode to get address (Nominatim)
                const getAddress = async () => {
                    try {
                        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
                        const resp = await fetch(url, {
                            headers: {
                                'Accept': 'application/json',
                            }
                        });
                        const json = await resp.json();
                        const address = json.display_name || '';
                        // Emitir la ubicación + dirección al componente padre
                        emit("ubicacion-seleccionada", { latitud: lat, longitud: lng, address });
                    } catch (err) {
                        console.error('Error reverse geocoding:', err);
                        emit("ubicacion-seleccionada", { latitud: lat, longitud: lng, address: '' });
                    }
                };
                getAddress();
            });

            // Watch for changes in predefinedUbication prop to recenter the map
            watch(
                () => props.predefinedUbication,
                (newVal) => {
                    if (newVal && map.value) {
                        const lat = newVal.latitud || newVal.lat || newVal.latitude;
                        const lng = newVal.longitud || newVal.lng || newVal.longitude;
                        if (lat && lng) {
                            map.value.setView([lat, lng], 14);
                            // move marker to campus center
                            if (houseMarker) {
                                houseMarker.setLatLng([lat, lng]);
                            } else {
                                houseMarker = L.marker([lat, lng], { icon: houseIcon })
                                    .addTo(markerLayer)
                                    .bindPopup("Ubicación seleccionada")
                                    .openPopup();
                            }

                            // Reverse geocode the campus coordinates and emit address
                            (async () => {
                                try {
                                    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
                                    const resp = await fetch(url, { headers: { Accept: 'application/json' } });
                                    const json = await resp.json();
                                    const address = json.display_name || '';
                                    emit('ubicacion-seleccionada', { latitud: lat, longitud: lng, address });
                                } catch (err) {
                                    console.error('Error reverse geocoding campus:', err);
                                    emit('ubicacion-seleccionada', { latitud: lat, longitud: lng, address: '' });
                                }
                            })();
                        }
                    }
                },
                { immediate: true }
            );

            // Asegurar que el mapa se renderice bien si está en un contenedor oculto
            const ensureSize = () => {
                if (map.value && map.value._container.offsetHeight > 0) {
                    setTimeout(() => {
                        map.value.invalidateSize();
                        map.value.setView([-16.409047, -71.537451], 13);
                    }, 100);
                } else {
                    requestAnimationFrame(ensureSize);
                }
            };
            ensureSize();
        });

        return {};
    },
};
</script>

<style scoped>
#select-map {
    min-height: 300px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

/* Animación suave al colocar el marcador */
.leaflet-marker-icon {
    transition: transform 0.2s ease-in-out;
}
</style>
