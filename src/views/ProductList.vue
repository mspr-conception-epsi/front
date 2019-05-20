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
export default {
  name: "ProductList",
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Aspirine",
          description: "C'est de l'aspirine quoi",
          price: 10.5
        },
        {
          id: 2,
          name: "Advil",
          description: "C'est de l'aspirine quoi",
          price: 10.5
        }
      ]
    };
  },
  methods: {
    onDescriptionClick(id) {
      this.$router.push({ path: `/product/${id}` });
    },
    onComputeClick(id) {
      this.$router.push({ path: `/compute/${id}` });
    }
  }
};
</script>

<style scoped>
.formElement {
  max-width: 400px;
}
table {
  overflow: auto;
}
</style>