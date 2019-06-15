<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="pharmacy-description">
        <p class="item">Pharmacie selectionnée: {{ selected ? selected.name : "" }}</p>
        <button class="button item" @click="updatePharmacy()">Modifier</button>
      </div>
      <gmap-map
        :center="$store.state.position"
        :zoom="19"
        style="width:100%;  height: 100%; min-height: 600px;"
      >
        <gmap-marker
          :key="index"
          v-for="(m, index) in pharmacies"
          :position="m.position"
          @click="selected=m"
        >
          <GmapInfoWindow>{{ m.name }}</GmapInfoWindow>
        </gmap-marker>
      </gmap-map>
    </div>
  </section>
</template>

<script>
import { fetchApi } from "@/api/fetcher";
export default {
  name: "Home",
  data() {
    return {
      circle: undefined,
      pharmacies: [],
      lastClickedMarker: undefined,
      selected: undefined
    };
  },
  methods: {
    updatePos(pos) {
      this.$store.commit("updatePosition", {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      });
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition(this.updatePos);
    },
    addPharmacy(pharmacy) {
      const p = this.pharmacies.find(row => row.id === pharmacy.id);
      const pUpdated = {
        id: pharmacy.id,
        address: pharmacy.address,
        name: pharmacy.name,
        position: {
          lat: pharmacy.gpsLat,
          lng: pharmacy.gpsLong
        }
      };
      if (p) {
        this.$store.commit("setPharmacy", pUpdated);
        return;
      } else {
        this.pharmacies.push({
          id: pharmacy.id,
          address: pharmacy.address,
          name: pharmacy.name,
          position: {
            lat: pharmacy.gpsLat,
            lng: pharmacy.gpsLong
          }
        });
        this.$store.commit("addPharmacy", pUpdated);
      }
    },
    async fetchPharmacies() {
      if (!this.$store.state.token) {
        return;
      }
      return await fetchApi("GET", "pharmacy", this.$store.state.token);
    },
    updatePharmacy() {
      if (!this.selected) {
        console.error("Error: no marker selected");
        return;
      }
      this.$router.push({ path: `/pharmacy/${this.selected.id}` });
    }
  },
  mounted() {
    if (!this.$store.state.token) {
      const state = JSON.parse(window.localStorage.getItem("state"));
      this.$store.commit("setToken", state.token);
      state.pharmacies.map(pharmacy => {
        this.$store.commit("addPharmacy", pharmacy);
      });
      state.products.map(product => {
        this.$store.commit("addProduct", product);
      });
      state.trainings.map(training => {
        this.$store.commit("addTraining", training);
      });
      if (!this.$store.state.token) {
        this.$router.push({ path: `/login` });
        return;
      }
    }
    this.geolocate();
    setInterval(() => {
      this.geolocate();
    }, 5000);

    try {
      this.fetchPharmacies().then(data => {
        if (data) {
          data.map(pharmacy => this.addPharmacy(pharmacy));
        }
      });
    } catch (err) {
      console.error(err);
    }
  }
};
</script>

<style scoped>
canvas {
  display: block;
}
.hero-body {
  display: flex;
  flex-direction: column;
  padding: 0;
}
.pharmacy-description {
  display: flex;
  flex-direction: row;
  padding: 1rem;
}
.pharmacy-description > .item {
  padding: 0 1rem;
}
</style>
