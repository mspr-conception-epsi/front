<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-text-align-center">Ajout d'une Pharmacie</h1>
      <form
        id="form"
        @submit="checkForm"
        action="/compute"
        method="post"
        >      
  
        <div id="closeMe" class="notification is-danger" v-if="errors.length">
            <button class="delete" onClick="closeBlock()"></button>
            <b>Corriger les erreurs suivantes :</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </div>
        <div class="panel is-vertical-center"
        <p>
            <label class="label" for="name">Nom de la Pharmacie</label>
            <input
                class ="input formElement"
                id="name"
                v-model="name"
                type="text"
                name="name"
                >
         </p>
        <p>
            <label class="label" for="adress">Adresse</label>
            <input
              class ="input formElement"
              id="adress"
              v-model="adress"
              type="text"
              name="adress"
            >
         </p>
        <p>
            <label class="label" for="lattitude">Lattitude</label>
            <input
              class ="input formElement"
              id="lattitude"
              v-model="lattitude"
              type="text"
              name="lattitude"
              disabled
            >
        </p>
        <p>
            <label class="label" for="longitude">Longitude</label>
            <input
              class ="input formElement"
              id="longitude"
              v-model="longitude"
              type="text"
              name="longitude"
              disabled
            >
        </p>

        <p>
            <input
                class="button is-link"
                type="submit"
                value="Valider"
            >
        </p>
    </div>
    </form>
    </div>
  </section>
</template>
<script>
export default {
 name:"Form",
   data() {
    return {
    errors: [],
    name: null,
    adress: null,
    lattitude: null,
    longitude: null
  }},
  methods:{
    checkForm: function (e) {
      if (this.name && this.adress && this.longitude && this.lattitude) {
        return true;
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push('Le nom de la Pharmacie est requis.');
      }
      if (!this.adress) {
        this.errors.push('L adresse de la Pharmacie est requise.');
      }
      if (!this.lattitude) {
        this.errors.push('La lattitude de la Pharmacie est requise.');
      }
      if (!this.longitude) {
        this.errors.push('La longitude de la Pharmacie est requise.');
      }

      e.preventDefault();
    },
    closeBlock(){
        document.getElementById(closeMe).style.display = none;   
    }
  }
}
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