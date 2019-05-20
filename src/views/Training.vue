<template>
  <div class="container">
    <h1 class="title is-text-align-center form-element">Description de la formation</h1>
    <article class="message">
      <div class="message-header">
        <p>{{ training.name }}</p>
      </div>
      <div class="message-body">{{ training.description }}</div>
    </article>
  </div>
</template>

<script>
export default {
  name: "Training",
  data() {
    return {
      training: {
        id: 1,
        name: "Formation au risques",
        description: "J'ai aucune idée du résultat par contre",
        price: 1000
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