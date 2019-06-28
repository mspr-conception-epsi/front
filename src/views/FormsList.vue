<template>
  <div class="container">
    <h1 class="title is-text-align-center form-element">Liste des formulaires</h1>
    <table class="table is-fullwidth">
      <tr>
        <th>Nom</th>
        <th>Modifier</th>
        <th>Supprimer</th>
        <th>Remplir</th>
      </tr>
      <tr v-for="form in forms" :key="form.id">
        <td>{{ form.name }}</td>
        <td>
          <input class="button is-link" type="submit" value="M" @click="updateForm(form)">
        </td>
        <td>
          <input class="button is-danger" type="submit" value="X" @click="removeForm(form)">
        </td>
        <td>
          <input class="button is-primary" type="submit" value="R" @click="fillForm(form)">
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { fetchApi } from "@/api/fetcher";
export default {
  name: "FormsList",
  data() {
    return {
      id: undefined,
      forms: []
    };
  },
  methods: {
    async fetchForms() {
      if (!this.$store.state.token) {
        return;
      }
      return await fetchApi("GET", "form", this.$store.state.token);
    },
    updateForm(form) {
      this.$router.push({ path: `/form/update/${form.id}` });
    },
    removeForm(form) {
      if (!this.$store.state.token) {
        return;
      }
      fetchApi("POST", "form/delete", this.$store.state.token, {
        id: form.id
      })
        .then(() => this.forms.splice(this.forms.indexOf(form), 1))
        .catch(err => {
          console.error(err);
          this.$router.push({ path: `/login` });
        });
    },
    fillForm(form) {
      this.$router.push({ path: `/form/fill/${form.id}` });
    }
  },
  mounted() {
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
    this.fetchForms().then(data => {
      if (data) {
        data.map(form => {
          if (this.forms.find(n => n.id === form.id)) {
            this.forms.forEach(n => {
              if (n.id === form.id) {
                n = form;
                this.$store.commit("setForm", form);
              }
            });
          } else {
            this.forms.push(form);
            this.$store.commit("addForm", form);
          }
        });
      }
    });
  }
};
</script>

<style scoped>
.formElement {
  max-width: 400px;
}
table {
  width: 100%;
}
.container {
  overflow-x: auto;
}
</style>