<template>
  <section class="section">
    <div class="box">
      <h1 class="title is-text-align-center">Ajout d'un commentaire</h1>
      <div id="closeMe" class="notification is-danger" v-if="errors.length && displayErrors">
        <button class="delete" @click="closeBlock"></button>
        <b>Corrigez les erreurs suivantes :</b>
        <ul>
          <li v-for="error in errors" :key="error.message">{{ error.message }}</li>
        </ul>
      </div>
      <label class="label" for="note">Note</label>
      <textarea class="textarea" v-model="note" placeholder="Ecrire votre note ici"></textarea>
      <br>
      <input class="button is-link" type="submit" value="Valider" @click="submitForm">
    </div>
  </section>
</template>
<script>
import { fetchApi } from "@/api/fetcher";
export default {
  name: "AddNote",
  data() {
    return {
      errors: [],
      note: undefined,
      displayErrors: undefined,
      id: undefined
    };
  },
  methods: {
    checkForm() {
      this.errors = [];
      if (this.note) {
        return true;
      }
      this.errors.push("Veuillez remplir le champ");
      this.displayErrors = true;
      return false;
    },
    closeBlock() {
      this.displayErrors = false;
    },
    submitForm() {
      this.checkForm();
      fetchApi("POST", "request/create", this.$store.state.token, {
        pharmacy: {
          id: this.id
        },
        content: this.note
      })
        .then(() => {
          this.$router.push({ path: `/notes/list/${this.id}` });
        })
        .catch(err => {
          console.error(err);
          this.errors = [];
          this.errors.push(err);
          this.displayErrors = true;
        });
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    if (!this.id || this.id === "") {
      console.error("no id provided");
    }
    if (!this.$store.state.token) {
      const state = JSON.parse(window.localStorage.getItem("state"));
      if (!state.token) {
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
    const pharmacy = this.$store.state.pharmacies.find(
      p => p.id === Number(this.id)
    );
    if (!pharmacy) {
      console.error("no pharmacy found");
      return;
    }
  }
};
</script>
<style>
.is-text-align-center {
  text-align: center;
}
.box {
  margin: 0 auto;
  max-width: 600px;
}
</style>