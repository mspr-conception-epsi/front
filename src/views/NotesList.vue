<template>
  <div class="container">
    <h1 class="title is-text-align-center form-element">Liste des notes</h1>
    <table class="table is-fullwidth">
      <tr>
        <th>Note</th>
      </tr>
      <tr v-for="note in notes" :key="note.id">
        <td>{{ note.content }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { fetchApi } from "@/api/fetcher";
export default {
  name: "NotesList",
  data() {
    return {
      id: undefined,
      notes: []
    };
  },
  methods: {
    async fetchNotes() {
      if (!this.$store.state.token) {
        return;
      }
      return await fetchApi(
        "POST",
        "request/bypharmacy",
        this.$store.state.token,
        { pharmacyId: this.id }
      );
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
    try {
      this.fetchNotes().then(data => {
        if (data) {
          data.map(note => {
            if (this.notes.find(n => n.id === note.id)) {
              this.notes.forEach(n => {
                if (n.id === note.id) {
                  n = note;
                  this.$store.commit("setNote", note);
                }
              });
            } else {
              this.notes.push(note);
              this.$store.commit("addNote", note);
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
  overflow: auto;
}
</style>