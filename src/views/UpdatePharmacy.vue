<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-text-align-center">Ajout/Modification d'une Pharmacie</h1>
      <div id="closeMe" class="notification is-danger" v-if="errors.length">
        <button class="delete" @click="closeBlock"></button>
        <b>Corriger les erreurs suivantes :</b>
        <ul>
          <li v-for="error in errors" :key="error.message">{{ error }}</li>
        </ul>
      </div>
      <label class="label" for="name">Nom de la Pharmacie</label>
      <input
        class="input is-text-align-center formElement"
        id="name"
        v-model="name"
        type="text"
        name="name"
      >

      <label class="label" for="adress">Adresse</label>
      <input
        class="input is-text-align-center formElement"
        id="adress"
        v-model="adress"
        type="text"
        name="adress"
      >

      <label class="label" for="lattitude">Lattitude</label>
      <input
        class="input is-text-align-center formElement"
        id="lattitude"
        v-model="lattitude"
        type="text"
        name="lattitude"
        disabled
      >

      <label class="label" for="longitude">Longitude</label>
      <input
        class="input is-text-align-center formElement"
        id="longitude"
        v-model="longitude"
        type="text"
        name="longitude"
        disabled
      >

      <input class="button is-link" type="submit" value="Valider" @click="submitForm">
    </div>
  </section>
</template>
<script>
export default {
  name: "Form",
  data() {
    return {
      errors: [],
      name: undefined,
      adress: undefined,
      lattitude: undefined,
      longitude: undefined,
      pharmacyId: undefined
    };
  },
  methods: {
    checkForm: function(e) {
      if (this.name && this.adress && this.longitude && this.lattitude) {
        return true;
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push({ message: "Le nom de la Pharmacie est requis." });
      }
      if (!this.adress) {
        this.errors.push({ message: "L adresse de la Pharmacie est requise." });
      }
      if (!this.lattitude) {
        this.errors.push({
          message: "La lattitude de la Pharmacie est requise."
        });
      }
      if (!this.longitude) {
        this.errors.push({
          message: "La longitude de la Pharmacie est requise."
        });
      }

      e.preventDefault();
    },
    closeBlock() {
      document.getElementById(closeMe).style.display = none;
    },
    submitForm() {
      console.log("form is submitted");
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
</style>