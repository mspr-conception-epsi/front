import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home";
import Compute from "../views/Compute";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/compute",
      name: "Compute",
      component: Compute
    }
  ]
});
