<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div id="map_canvas">
        <button class="button" v-on:click="centerCamera">Recentrer</button>
        <button class="button" v-on:click="updatePharmacy">Modifier</button>
      </div>
    </div>
  </section>
</template>

<script>
import { setTimeout } from "timers";
import { fetchApi } from "@/api/fetcher";
import { checkOffline } from "@/utils/utils";
import * as pharmaciesMock from "@/mock/pharmacies.json";
export default {
  name: "Home",
  data() {
    return {
      circle: undefined,
      map: undefined,
      pharmacies: [],
      lastClickedMarker: undefined
    };
  },
  methods: {
    updatePos(pos) {
      this.$store.commit("updatePosition", {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      });
    },
    centerCamera() {
      this.map.animateCamera({
        target: {
          lat: this.$store.state.position.latitude,
          lng: this.$store.state.position.longitude
        },
        zoom: 19,
        duration: 3000
      });
    },
    addPharmacy(pharmacy) {
      const marker = this.map.addMarker({
        position: { lat: pharmacy.gpsLat, lng: pharmacy.gpsLong },
        title: pharmacy.name,
        animation: plugin.google.maps.Animation.BOUNCE
      });
      marker.on(plugin.google.maps.event.MARKER_CLICK, () => {
        this.lastClickedMarker = pharmacy.id;
        console.log("marker clicked", this.lastClickedMarker);
      });
      if (this.pharmacies.find(row => row.id === pharmacy.id)) {
        this.pharmacies.forEach(row => {
          if (row.id === this.id) {
            row = pharmacy;
            this.$store.commit("addPharmacy", pharmacy);
            return;
          }
        });
      } else {
        this.pharmacies.push(pharmacy);
        this.$store.commit("setPharmacy", pharmacy);
      }
    },
    async fetchPharmacies() {
      if (!this.$store.state.token) {
        return;
      }
      return await fetchApi("GET", "pharmacy", this.$store.state.token);
    },
    updatePharmacy() {
      if (!this.lastClickedMarker) {
        console.error("Error: no marker selected");
        return;
      }
      this.$router.push({ path: `/pharmacy/${this.lastClickedMarker}` });
    }
  },
  mounted() {
    if (!this.$store.state.token) {
      this.$router.push({ path: `/login` });
      return;
    }
    const vue = this;
    document.addEventListener(
      "deviceready",
      function() {
        plugin.google.maps.environment.setEnv({
          API_KEY_FOR_BROWSER_RELEASE:
            "AIzaSyB_xmGOewokh_VPpITnIoLw7Vd0QPxJ3Kc",
          API_KEY_FOR_BROWSER_DEBUG: "AIzaSyBR7F4RTHTgH9gSZ6RlFtgJZsnfJSNEDJY"
        });
        const div = document.getElementById("map_canvas");

        // Create a Google Maps native view under the map_canvas div.
        this.map = plugin.google.maps.Map.getMap(div);

        const geolocationSuccess = pos => {
          this.updatePos(pos);
          if (this.circle) {
            this.circle.remove();
          }
          this.circle = this.map.addCircle({
            center: {
              lat: this.$store.state.position.latitude,
              lng: this.$store.state.position.longitude
            },
            radius: 5,
            strokeColor: "#000000",
            strokeWidth: 0.5,
            fillColor: "#880000"
          });
        };

        const geolocationError = error => {
          console.error("Geolocation error", error);
        };

        const watchId = navigator.geolocation.watchPosition(
          geolocationSuccess,
          geolocationError,
          { enableHighAccuracy: true, timeout: 30000 }
        );

        setTimeout(this.centerCamera, 5000);
        if (checkOffline()) {
          this.$store.commit("restoreState");
          return;
        }
        try {
          this.fetchPharmacies().then(data => {
            if (data) {
              console.log(data);
              data.map(pharmacy => this.addPharmacy(pharmacy));
              console.log(this.$store.state.pharmacies);
            }
          });
        } catch (err) {
          console.error(err);
        }
      }.bind(vue),
      false
    );
  }
};
</script>

<style scoped>
#map_canvas {
  width: 100%;
  height: 100%;
  z-index: 200;
  min-height: 600px;
}
canvas {
  display: block;
}
.hero-body {
  padding: 0;
}
</style>
