<template>
  <div class="container">
    <h1 class="title is-text-align-center form-element">Liste des formations</h1>
    <table class="table is-fullwidth">
      <tr>
        <th>Nom</th>
        <th>Prix</th>
        <th>Info</th>
      </tr>
      <tr v-for="training in trainings" :key="training.id">
        <td>{{ training.title }}</td>
        <td>{{ training.price }} €</td>
        <td>
          <button class="button" @click="onDescriptionClick(training.id)">Info</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { fetchApi } from "@/api/fetcher";
export default {
  name: "TrainingList",
  data() {
    return {
      trainings: []
    };
  },
  methods: {
    onDescriptionClick(id) {
      this.$router.push({ path: `/training/${id}` });
    },
    async fetchTrainings() {
      if (!this.$store.state.token) {
        return;
      }
      return await fetchApi("GET", "formation", this.$store.state.token);
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
    try {
      this.fetchTrainings().then(data => {
        if (data) {
          console.log(data);
          data.map(training => {
            if (this.trainings.find(t => t.id === training.id)) {
              this.trainings.forEach(t => {
                if (t.id === training.id) {
                  t = training;
                  this.$store.commit("setTraining", training);
                }
              });
            } else {
              this.trainings.push(training);
              this.$store.commit("addTraining", training);
            }
          });
        }
      });
    } catch (err) {
      console.error(err);
    }
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