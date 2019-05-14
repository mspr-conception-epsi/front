<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div id="map_canvas">
        <button id="button">Click me!</button>
      </div>
    </div>
  </section>
</template>

<script>
document.addEventListener(
  "deviceready",
  function() {
    plugin.google.maps.environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: "AIzaSyBARLnrLzvMAnihYcOBuEhx37ACvZHqnew",
      API_KEY_FOR_BROWSER_DEBUG: "AIzaSyBtxY_260XDTYJA5yXj2rusPp_RhvrfdqA"
    });
    var div = document.getElementById("map_canvas");

    // Create a Google Maps native view under the map_canvas div.
    var map = plugin.google.maps.Map.getMap(div);

    // If you click the button, do something...
    var button = document.getElementById("button");
    button.addEventListener("click", function() {
      // Move to the position with animation
      map.animateCamera({
        target: { lat: 37.422359, lng: -122.084344 },
        zoom: 17,
        tilt: 60,
        bearing: 140,
        duration: 5000
      });

      // Add a maker
      var marker = map.addMarker({
        position: { lat: 37.422359, lng: -122.084344 },
        title:
          "Welecome to \n" + "Cordova GoogleMaps plugin for iOS and Android",
        snippet: "This plugin is awesome!",
        animation: plugin.google.maps.Animation.BOUNCE
      });

      // Show the info window
      marker.showInfoWindow();
    });
  },
  false
);

import Vue from "vue";
export default {
  name: "Home",
  methods: {
    pluginEnabled: function(pluginName) {
      return this.cordova.plugins.indexOf(pluginName) !== -1;
    }
  },
  data: function() {
    return {
      cordova: Vue.cordova
    };
  },
  mounted() {
    window.alert(Vue.cordova);
    try {
      Vue.cordova.geolocation.getCurrentPosition(
        position => {
          window.alert(
            "Current position : " +
              position.coords.latitude +
              "," +
              position.coords.longitude
          );
        },
        error => {
          window.alert("FAILED Error #" + error.code + " " + error.message);
        },
        {
          timeout: 1000,
          enableHighAccuracy: true
        }
      );
    } catch (err) {
      window.alert(err);
    }
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
