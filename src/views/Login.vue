<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-text-align-center form-element">Connexion</h1>
      <p>Nom d'utilisateur</p>
      <input type="text" class="input form-element" v-model="login">
      <p>Mot de passe</p>
      <input type="password" class="input form-element" v-model="password">
      <input type="submit" class="button form-element" value="Se connecter" @click="onSubmitClick">
    </div>
  </section>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      login: undefined,
      password: undefined
    };
  },
  methods: {
    onSubmitClick() {
      console.log("submit was clickd");
    }
  }
};
</script>

<style scoped>
.formElement {
  max-width: 400px;
}
</style>