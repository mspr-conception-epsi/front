// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import "bulma/css/bulma.css";
import VueCordova from "vue-cordova";
Vue.use(VueCordova);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
  data: function() {
    return {
      cordova: Vue.cordova
    };
  }
});

if (window.location.protocol === "file:" || window.location.port === "8000") {
  var cordovaScript = document.createElement("script");
  cordovaScript.setAttribute("type", "text/javascript");
  cordovaScript.setAttribute("src", "cordova.js");
  document.body.appendChild(cordovaScript);
}
