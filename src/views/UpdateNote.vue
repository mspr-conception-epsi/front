<template>
  <section class="section">
    <div class="box">
      <h1 class="title is-text-align-center">Update d'un commentaire</h1>
      <h2 class="title is-text-align-center">Nom de la Pharmacie</h2>
      <div id="closeMe" class="notification is-danger" v-if="errors.length && displayErrors">
        <button class="delete" @click="closeBlock"></button>
        <b>Corrigez les erreurs suivantes :</b>
        <ul>
          <li v-for="error in errors" :key="error.message">{{ error.message }}</li>
        </ul>
      </div>

      <label class="label" for="info">Information souhaitée</label>
      <select v-model="info" class="input is-text-align-center formElement">
        <option
          v-for="option in options"
          :key="option.text"
          v-bind:value="option.value"
        >{{ option.text }}</option>
      </select>

      <label class="label" for="note">Note</label>
      <textarea class="textarea" v-model="note" placeholder="add multiple lines"></textarea>
      <br>
      <input class="button is-link" type="submit" value="Valider" @click="submitForm">
    </div>
  </section>
</template>
<script>
export default {
  name: "UpdateNote",
  data() {
    return {
      errors: [],
      options: [
        { text: "One", value: "A" },
        { text: "Two", value: "B" },
        { text: "Three", value: "C" }
      ],
      info: undefined,
      note: undefined,
      displayErrors: undefined,
      pharmacyId: undefined
    };
  },
  methods: {
    checkForm() {
      if (this.info && this.note) {
        return true;
      }

      this.errors = [];

      if (!this.info) {
        this.errors.push({
          message: "Le choix du type d'information est requis."
        });
      }
      if (!this.adress) {
        this.errors.push({ message: "L'information est requise." });
      }
      if (this.errors.length > 0) {
        this.displayErrors = true;
      }
    },
    closeBlock() {
      this.displayErrors = false;
    },
    submitForm() {
      this.checkForm();
      console.log("form is submitted");
    }
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
.formElement {
  max-width: 400px;
}
.is-vertical-center {
  display: flex;
  align-items: center;
}
.box {
  margin: 0 auto;
  max-width: 600px;
}
</style>