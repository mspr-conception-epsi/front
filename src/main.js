// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Vuex from "vuex";
import App from "./App";
import router from "./router";
import "bulma/css/bulma.css";
import VueCordova from "vue-cordova";

Vue.use(VueCordova);
Vue.use(Vuex);

Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    position: {
      latitude: 0,
      longitude: 0
    }
  },
  mutations: {
    updatePosition(state, pos) {
      state.position.latitude = pos.latitude;
      state.position.longitude = pos.longitude;
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
