<template>
  <div class="container">
    <h1 class="title is-text-align-center form-element">Description du produit</h1>
    <article class="message">
      <div class="message-header">
        <p>{{ product.name }}</p>
      </div>
      <div class="message-body">{{ product.description }}</div>
    </article>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  data() {
    return {
      product: {
        id: 1,
        name: "Aspirine",
        description: "C'est de l'aspirine quoi",
        price: 10.5
      },
      id: undefined
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    if (!this.id || this.id === "") {
      console.error("no id provided");
    }
  }
};
</script>

<style scoped>
.formElement {
  max-width: 400px;
}
</style>