// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Vuex from "vuex";
import App from "./App";
import router from "./router";
import "bulma/css/bulma.css";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyB_xmGOewokh_VPpITnIoLw7Vd0QPxJ3Kc",
    libraries: "places" // necessary for places input
  }
});
Vue.use(Vuex);

Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    position: {
      lat: 0,
      lng: 0
    },
    token: undefined,
    pharmacies: [],
    products: [],
    trainings: [],
    notes: [],
    forms: []
  },
  mutations: {
    destroyState(state) {
      state.token = undefined;
      window.localStorage.removeItem("state");
      Object.assign(state, {
        position: {
          lat: 0,
          lng: 0
        },
        token: undefined,
        pharmacies: [],
        products: [],
        trainings: []
      });
    },
    updatePosition(state, pos) {
      state.position.lat = pos.latitude;
      state.position.lng = pos.longitude;
      window.localStorage.setItem("state", JSON.stringify(state));
    },
    setToken(state, token) {
      state.token = token;
      window.localStorage.setItem("state", JSON.stringify(state));
    },
    setPharmacy(state, pharmacy) {
      if (state.pharmacies.find(row => row.id === pharmacy.id)) {
        state.pharmacies.forEach(row => {
          if (row.id === pharmacy.id) {
            row = pharmacy;
          }
        });
      }
      window.localStorage.setItem("state", JSON.stringify(state));
    },
    setNote(state, note) {
      if (state.notes.find(row => row.id === note.id)) {
        state.notes.forEach(row => {
          if (row.id === note.id) {
            row = note;
          }
        });
      }
      window.localStorage.setItem("state", JSON.stringify(state));
    },
    addNote(state, note) {
      state.notes.push(note);
      window.localStorage.setItem("state", JSON.stringify(state));
    },
    setForm(state, form) {
      if (state.forms.find(row => row.id === form.id)) {
        state.forms.forEach(row => {
          if (row.id === form.id) {
            row = form;
          }
        });
      }
      window.localStorage.setItem("state", JSON.stringify(state));
    },
    addForm(state, note) {
      state.notes.push(note);
      window.localStorage.setItem("state", JSON.stringify(state));
    },
    addPharmacy(state, pharmacy) {
      state.pharmacies.push(pharmacy);
      window.localStorage.setItem("state", JSON.stringify(state));
    },
    setProduct(state, product) {
      if (state.products.find(row => row.id === product.id)) {
        state.products.forEach(row => {
          if (row.id === product.id) {
            row = product;
          }
        });
      }
      window.localStorage.setItem("state", JSON.stringify(state));
    },
    addProduct(state, product) {
      state.products.push(product);
      window.localStorage.setItem("state", JSON.stringify(state));
    },
    setTraining(state, training) {
      if (state.trainings.find(row => row.id === training.id)) {
        state.trainings.forEach(row => {
          if (row.id === training.id) {
            row = training;
          }
        });
      }
      window.localStorage.setItem("state", JSON.stringify(state));
    },
    addTraining(state, training) {
      state.trainings.push(training);
      window.localStorage.setItem("state", JSON.stringify(state));
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
