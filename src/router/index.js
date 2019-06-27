import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home";
import Compute from "../views/Compute";
import Login from "../views/Login";
import UpdatePharmacy from "../views/UpdatePharmacy";
import AddNote from "../views/AddNote";
import NotesList from "../views/NotesList";
import ProductList from "../views/ProductList";
import Product from "../views/Product";
import TrainingList from "../views/TrainingList";
import Training from "../views/Training";
import AddForm from "../views/AddForm";
import UpdateForm from "../views/UpdateForm";
import FormsList from "../views/FormsList";
import FillForm from "../views/FillForm";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/compute/:type/:id",
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
    },
    {
      path: "/notes/list/:id",
      name: "NotesList",
      component: NotesList
    },
    {
      path: "/form/new",
      name: "AddForm",
      component: AddForm
    },
    {
      path: "/form/update/:id",
      name: "UpdateForm",
      component: UpdateForm
    },
    {
      path: "/forms",
      name: "FormsList",
      component: FormsList
    },
    {
      path: "/form/fill/:id",
      name: "FillForm",
      component: FillForm
    }
  ]
});
