import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home";
import Compute from "../views/Compute";
import Login from "../views/Login";
import UpdatePharmacy from "../views/UpdatePharmacy";

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
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/pharmacy/:phamacyId",
      name: "UpdatePharmacy",
      component: UpdatePharmacy
    }
  ]
});
