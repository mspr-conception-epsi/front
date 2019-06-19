<template>
  <section class="section">
    <div class="box">
      <h1 class="title is-text-align-center">Modification d'un formulaire</h1>
      <div id="closeMe" class="notification is-danger" v-if="errors.length && displayErrors">
        <button class="delete" @click="closeBlock"></button>
        <b>Corrigez les erreurs suivantes :</b>
        <ul>
          <li v-for="error in errors" :key="error.message">{{ error.message }}</li>
        </ul>
      </div>
      <section class="section">
        <label for="nameInput" class="label">Nom du questionnaire</label>
        <input
          class="input"
          type="input"
          id="nameInput"
          placeholder="Nom du questionnaire"
          v-model="form.name"
        >
      </section>
      <section
        class="section questionColumn"
        v-for="(question, index) in form.questions"
        :key="question.id"
      >
        <label for="nameInput" class="label">Entrez votre question</label>
        <div class="questionRow">
          <input
            class="input"
            @input="(e) => updateQuestion(e.srcElement.value, index)"
            placeholder="Entrez votre question ici"
            v-bind:value="question.label"
          >
          <input class="button is-danger" type="submit" value="X" @click="removeQuestion(index)">
        </div>
      </section>
      <br>
      <input class="button is-link" type="submit" value="Ajouter une question" @click="addQuestion">
      <input class="button is-primary" type="submit" value="Valider" @click="submitForm">
    </div>
  </section>
</template>
<script>
import { fetchApi } from "@/api/fetcher";
export default {
  name: "UpdateForm",
  data() {
    return {
      errors: [],
      displayErrors: undefined,
      form: {
        name: "",
        questions: []
      },
      name: undefined,
      id: undefined
    };
  },
  methods: {
    checkForm() {
      this.errors = [];
      if (this.form.questions.find(q => !q || q === "")) {
        this.errors.push("Veuillez remplir tous les champ");
        this.displayErrors = true;
        return false;
      }
      return true;
    },
    closeBlock() {
      this.displayErrors = false;
    },
    fetchForms() {
      if (!this.$store.state.token) {
        return;
      }
      return fetchApi("GET", "form", this.$store.state.token);
    },
    getForm(id) {
      this.fetchForms()
        .then(forms => {
          if (!forms) {
            return;
          }
          const form = forms.find(form => form.id === id);
          if (!form) {
            console.error("No form found for this ID");
            this.$router.push({ item: "/forms" });
          }
          this.form = form;
        })
        .catch(err => {
          console.error(err);
          if (!this.$store.state.forms) {
            return;
          }
          const form = this.$store.state.forms.find(form => form.id === id);
          if (!form) {
            console.error("No form found for this ID");
            this.$router.push({ item: "/forms" });
          }
          this.form = form;
        });
    },
    submitForm() {
      this.checkForm();
      fetchApi("POST", "form/update", this.$store.state.token, this.form)
        .then(() => {
          console.log("done");
          this.$router.push({ item: "/forms" });
        })
        .catch(err => {
          console.error(err);
          this.errors = [];
          this.errors.push(err);
          this.displayErrors = true;
        });
    },
    addQuestion() {
      this.questions.push("");
    },
    removeQuestion(index) {
      this.questions.splice(index, 1);
    },
    updateQuestion(newValue, questionIndex) {
      this.questions[questionIndex] = newValue;
    }
  },
  mounted() {
    this.id = Number(this.$route.params.id);
    if (!this.id || this.id === "") {
      console.error("no id provided");
      return;
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
      state.notes.map(note => {
        this.$store.commit("addNote", note);
      });
      state.forms.map(form => {
        this.$store.commit("addForm", form);
      });
    }
    this.getForm(this.id);
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
.questionRow {
  display: flex;
  justify-content: center;
  flex-direction: row;
}
.questionColumn {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>