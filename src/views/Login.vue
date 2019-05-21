<template>
  <section class="section">
    <div class="box">
      <h1 class="title is-text-align-center form-element">Connexion</h1>
      <p>Nom d'utilisateur</p>
      <input type="text" class="input form-element" v-model="login">
      <p>Mot de passe</p>
      <input type="password" class="input form-element" v-model="password">
      <input type="submit" class="button form-element" value="Se connecter" @click="onSubmitClick">
      <div class="notification is-danger" v-if="loginError">
        <button class="delete" @click="loginError=false"></button>
        {{ loginError }}
      </div>
    </div>
  </section>
</template>

<script>
import { auth } from "../api/auth";
export default {
  name: "Login",
  data() {
    return {
      login: undefined,
      password: undefined,
      loginError: undefined
    };
  },
  methods: {
    onSubmitClick() {
      auth(this.login, this.password)
        .then(data => {
          this.$store.commit("setToken", data.token);
          this.$router.push({ path: "/" });
        })
        .catch(err => {
          this.loginError = err;
          console.error(err);
        });
    }
  }
};
</script>

<style scoped>
.formElement {
  max-width: 400px;
}
.box {
  margin: 0 auto;
  max-width: 600px;
}
</style>