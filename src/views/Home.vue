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
import Vue from "vue";
import { setTimeout } from "timers";
import { fetcher } from "@/api/fetcher";
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
      // Add a maker
      const marker = this.map.addMarker({
        position: { lat: pharmacy.latitude, lng: pharmacy.longitude },
        title: pharmacy.title,
        snippet: `<p>${pharmacy.snippet}</p>`,
        animation: plugin.google.maps.Animation.BOUNCE
      });
      marker.on(plugin.google.maps.event.MARKER_CLICK, () => {
        this.lastClickedMarker = pharmacy.id;
        console.log("marker clicked", this.lastClickedMarker);
      });
      this.pharmacies.push(marker);
    },
    fetchPharmacies() {
      return pharmaciesMock.pharmacies;
      //return fetcher("/api/pharmacies", "token");
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
    const vue = this;
    document.addEventListener(
      "deviceready",
      function() {
        plugin.google.maps.environment.setEnv({
          API_KEY_FOR_BROWSER_RELEASE:
            "AIzaSyBARLnrLzvMAnihYcOBuEhx37ACvZHqnew",
          API_KEY_FOR_BROWSER_DEBUG: "AIzaSyBtxY_260XDTYJA5yXj2rusPp_RhvrfdqA"
        });
        const div = document.getElementById("map_canvas");

        // Create a Google Maps native view under the map_canvas div.
        this.map = plugin.google.maps.Map.getMap(div);

        // // Add a maker
        // const marker = map.addMarker({
        //   position: { lat: 37.422359, lng: -122.084344 },
        //   title:
        //     "Welecome to \n" + "Cordova GoogleMaps plugin for iOS and Android",
        //   snippet: "This plugin is awesome!",
        //   animation: plugin.google.maps.Animation.BOUNCE
        // });

        // Show the info window
        //marker.showInfoWindow();

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
          console.log(pos);
        };

        const geolocationError = error => {
          console.error("Geolocation error", error);
        };

        const watchId = navigator.geolocation.watchPosition(
          geolocationSuccess,
          geolocationError,
          { enableHighAccuracy: true, timeout: 30000 }
        );
        // this.addPharmacy({
        //   latitude: 47.213773,
        //   longitude: -1.5491075,
        //   title: "test title",
        //   snippet: "test snippet"
        // });
        setTimeout(this.centerCamera, 5000);
        console.log(this.fetchPharmacies());
        this.fetchPharmacies().map(pharmacy => this.addPharmacy(pharmacy));
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
