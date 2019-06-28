<template>
  <div class="container">
    <h1 class="title is-text-align-center form-element">Liste des produits</h1>
    <table class="table is-fullwidth">
      <tr>
        <th>Nom</th>
        <th>Prix</th>
        <th>Info</th>
        <th>Calculatrice</th>
      </tr>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.name }}</td>
        <td>{{ product.price }} €</td>
        <td>
          <button class="button" @click="onDescriptionClick(product.id)">Info</button>
        </td>
        <td>
          <button class="button" @click="onComputeClick(product.id)">Calculatrice</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { fetchApi } from "@/api/fetcher";
export default {
  name: "ProductList",
  data() {
    return {
      products: []
    };
  },
  methods: {
    onDescriptionClick(id) {
      this.$router.push({ path: `/product/${id}` });
    },
    onComputeClick(id) {
      this.$router.push({ path: `/compute/product/${id}` });
    },
    async fetchProducts() {
      if (!this.$store.state.token) {
        return;
      }
      return await fetchApi("GET", "product", this.$store.state.token);
    }
  },
  mounted() {
    if (!this.$store.state.token) {
      const state = JSON.parse(window.localStorage.getItem("state"));
      if (!state || !state.token) {
        this.$router.push({ path: `/login` });
        return;
      }
      this.$store.commit("setToken", state.token);
      state.pharmacies.map(pharmacy => {
        this.$store.commit("addPharmacy", pharmacy);
      });
      state.products.map(product => {
        this.$store.commit("addProduct", product);
      });
      state.trainings.map(training => {
        this.$store.commit("addTraining", training);
      });
      state.notes.map(note => {
        this.$store.commit("addNote", note);
      });
      state.forms.map(form => {
        this.$store.commit("addForm", form);
      });
    }
    try {
      this.fetchProducts().then(data => {
        if (data) {
          data.map(product => {
            if (this.products.find(p => p.id === product.id)) {
              this.products.forEach(p => {
                if (p.id === product.id) {
                  p = product;
                  this.$store.commit("setProduct", product);
                }
              });
            } else {
              this.products.push(product);
              this.$store.commit("addProduct", product);
            }
          });
        }
      });
    } catch (err) {
      console.error(err);
    }
  }
};
</script>

<style scoped>
.formElement {
  max-width: 400px;
}
table {
  width: 100%;
}
.container {
  overflow-x: auto;
}
</style>