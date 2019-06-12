// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Vuex from "vuex";
import App from "./App";
import router from "./router";
import "bulma/css/bulma.css";

Vue.use(Vuex);

Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    position: {
      latitude: 0,
      longitude: 0
    },
    token: undefined,
    pharmacies: [],
    products: [],
    trainings: []
  },
  mutations: {
    restoreState(state) {
      state = JSON.parse(window.localStorage.getItem("state"));
      console.log("restoring state", state);
    },
    updatePosition(state, pos) {
      state.position.latitude = pos.latitude;
      state.position.longitude = pos.longitude;
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

if (window.location.protocol === "file:" || window.location.port === "8000") {
  var cordovaScript = document.createElement("script");
  cordovaScript.setAttribute("type", "text/javascript");
  cordovaScript.setAttribute("src", "cordova.js");
  document.body.appendChild(cordovaScript);
}
