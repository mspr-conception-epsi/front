<template>
  <section class="section">
    <div class="box">
      <h1 class="title is-text-align-center">Remplir un formulaire</h1>
      <div id="closeMe" class="notification is-danger" v-if="errors.length && displayErrors">
        <button class="delete" @click="closeBlock"></button>
        <b>Corrigez les erreurs suivantes :</b>
        <ul>
          <li v-for="error in errors" :key="error.message">{{ error.message }}</li>
        </ul>
      </div>
      <section class="section">
        <label for="nameInput" class="label">{{ form.name }}</label>
      </section>
      <section
        class="section questionColumn"
        v-for="(question, index) in form.questions"
        :key="question.id"
      >
        <label for="nameInput" class="label">{{ question.label }}</label>
        <input
          class="input"
          @input="(e) => updateQuestion(e.srcElement.value, index)"
          placeholder="Entrez votre réponse ici"
        >
      </section>
      <br>
      <input class="button is-primary" type="submit" value="Valider" @click="submitForm">
    </div>
  </section>
</template>
<script>
import { fetchApi } from "@/api/fetcher";
export default {
  name: "FillForm",
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
      this.form.questions.map(question => {
        fetchApi("POST", "response/create", this.$store.state.token, question)
          .then(() => {
            this.$router.push({ item: "/forms" });
          })
          .catch(err => {
            console.error(err);
            this.errors = [];
            this.errors.push(err);
            this.displayErrors = true;
          });
      });
    },
    updateQuestion(newValue, questionIndex) {
      const question = this.form.questions.find(
        (_, index) => index === questionIndex
      );
      question.content = newValue;
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