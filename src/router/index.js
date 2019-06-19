import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home";
import Compute from "../views/Compute";
import Login from "../views/Login";
import UpdatePharmacy from "../views/UpdatePharmacy";
import AddNote from "../views/AddNote";
import ProductList from "../views/ProductList";
import Product from "../views/Product";
import TrainingList from "../views/TrainingList";
import Training from "../views/Training";

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
      path: "/pharmacy/:id",
      name: "UpdatePharmacy",
      component: UpdatePharmacy
    },
    {
      path: "/products",
      name: "ProductList",
      component: ProductList
    },
    {
      path: "/product/:id",
      name: "Product",
      component: Product
    },
    {
      path: "/trainings",
      name: "TrainingList",
      component: TrainingList
    },
    {
      path: "/training/:id",
      name: "Training",
      component: Training
    },
    {
      path: "/note/new/:id",
      name: "AddNote",
      component: AddNote
    }
  ]
});
