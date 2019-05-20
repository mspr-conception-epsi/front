import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home";
import Compute from "../views/Compute";
import Login from "../views/Login";
import UpdatePharmacy from "../views/UpdatePharmacy";
import ProductList from "../views/ProductList";
import Product from "../views/Product";

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
    },
    {
      path: "/product-list",
      name: "ProductList",
      component: ProductList
    },
    {
      path: "/product/:id",
      name: "Product",
      component: Product
    }
  ]
});
