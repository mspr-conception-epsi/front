<template>
  <div class="container">
    <h1 class="title is-text-align-center form-element">Description du produit</h1>
    <article class="message" v-if="product">
      <div class="message-header">
        <p>{{ product.name }}</p>
      </div>
      <div class="message-body">{{ product.description }}</div>
    </article>
    <article class="message" v-else>
      <div class="message-header">
        <p>Article non trouvé</p>
      </div>
      <div class="message-body">Veuillez contacter le support</div>
    </article>
  </div>
</template>

<script>
export default {
  name: "Product",
  data() {
    return {
      product: undefined,
      id: undefined
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    if (!this.id || this.id === "") {
      console.error("no id provided");
      return;
    }
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
    if (this.$store.state.products.length <= 0) {
      //fetch from sqli or api
      console.error("no product in store");
    }
    this.product = this.$store.state.products.find(row => row.id == this.id);
  }
};
</script>

<style scoped>
.formElement {
  max-width: 400px;
}
</style>