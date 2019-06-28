<template>
  <section class="section">
    <div class="box">
      <h1 class="title is-text-align-center">Modification d'une Pharmacie</h1>
      <div id="closeMe" class="notification is-danger" v-if="errors.length && displayErrors">
        <button class="delete" @click="closeBlock"></button>
        <b>Corrigez les erreurs suivantes :</b>
        <ul>
          <li v-for="error in errors" :key="error.message">{{ error.message }}</li>
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

      <label class="label" for="address">addresse</label>
      <input
        class="input is-text-align-center formElement"
        id="address"
        v-model="address"
        type="text"
        name="address"
      >
      <br>
      <input class="button" type="button" @click="addressToLatLong" value="Vérifier l'addresse">
      <div class="notification is-primary" v-if="addressOk">
        <button class="delete" @click="addressOk=false"></button>
        <p>Addresse valide</p>
        <p>Lattitude: {{ this.lattitude }}</p>
        <p>Longitude: {{ this.longitude }}</p>
      </div>
      <div class="notification is-danger" v-if="addressError">
        <button class="delete" @click="addressError=false"></button>
        Addresse non valide ou erreur
      </div>

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
      <br>
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
      address: undefined,
      lattitude: undefined,
      longitude: undefined,
      displayErrors: undefined,
      id: undefined,
      addressError: undefined,
      addressOk: undefined,
      deviceRdy: undefined,
      awaitingAddress: undefined
    };
  },
  methods: {
    checkForm() {
      if (this.name && this.address && this.longitude && this.lattitude) {
        return true;
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push({ message: "Le nom de la Pharmacie est requis." });
      }
      if (!this.address) {
        this.errors.push({
          message: "L'addresse de la Pharmacie est requise."
        });
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
    },
    addressToLatLong() {}
  },
  mounted() {
    this.id = this.$route.params.id;
    if (!this.id || this.id === "") {
      console.error("no id provided");
      this.errors.push({
        message: "Nous ne pouvons pas trouver la pharmacie demandée"
      });
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
    const pharmacy = this.$store.state.pharmacies.find(
      p => p.id === Number(this.id)
    );
    if (!pharmacy) {
      console.error("no pharmacy found");
      return;
    }
    this.name = pharmacy.name;
    this.address = pharmacy.address;
    this.lattitude = pharmacy.position.lat;
    this.longitude = pharmacy.position.lng;
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