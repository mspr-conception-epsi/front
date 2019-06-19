<template>
  <section class="section">
    <div class="box">
      <h1 class="title is-text-align-center">Ajout d'un formulaire</h1>
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
          v-model="name"
        >
      </section>
      <section
        class="section questionColumn"
        v-for="(question, index) in questions"
        :key="question"
      >
        <label for="nameInput" class="label">Entrez votre question</label>
        <div class="questionRow">
          <input
            class="input"
            @input="(e) => updateQuestion(e.srcElement.value, index)"
            placeholder="Entrez votre question ici"
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
  name: "AddForm",
  data() {
    return {
      errors: [],
      displayErrors: undefined,
      questions: [],
      name: undefined
    };
  },
  methods: {
    checkForm() {
      this.errors = [];
      if (this.questions.find(q => !q || q === "")) {
        this.errors.push("Veuillez remplir tous les champ");
        this.displayErrors = true;
        return false;
      }
      return true;
    },
    closeBlock() {
      this.displayErrors = false;
    },
    submitForm() {
      this.checkForm();
      fetchApi("POST", "form/create", this.$store.state.token, {
        name: this.name,
        questions: this.computeQuestions(this.questions)
      })
        .then(() => {
          console.log("done");
          //redirect to notes list page
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
    },
    computeQuestions(questions) {
      return questions.map(question => {
        console.log(question);
        return {
          type: "TEXT",
          label: question
        };
      });
    }
  },
  mounted() {
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