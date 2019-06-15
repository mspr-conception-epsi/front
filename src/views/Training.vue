<template>
  <div class="container">
    <h1 class="title is-text-align-center form-element">Description de la formation</h1>
    <article class="message" v-if="training">
      <div class="message-header">
        <p>{{ training.title }}</p>
      </div>
      <div class="message-body">{{ training.description }}</div>
    </article>
    <article class="message" v-else>
      <div class="message-header">
        <p>Formation non trouvé</p>
      </div>
      <div class="message-body">Veuillez contacter le support</div>
    </article>
  </div>
</template>

<script>
export default {
  name: "Training",
  data() {
    return {
      training: undefined,
      id: undefined
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    if (!this.id || this.id === "") {
      console.error("no id provided");
    }
    if (!this.$store.state.token) {
      const state = JSON.parse(window.localStorage.getItem("state"));
      if (!state) {
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
    }
    if (this.$store.state.trainings.length <= 0) {
      //fetch from sqli or api
      console.error("no training in store");
    }
    this.training = this.$store.state.trainings.find(row => row.id == this.id);
  }
};
</script>

<style scoped>
.formElement {
  max-width: 400px;
}
</style>