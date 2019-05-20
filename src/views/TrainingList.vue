<template>
  <div class="container">
    <h1 class="title is-text-align-center form-element">Liste des formations</h1>
    <table class="table is-fullwidth">
      <tr>
        <th>Nom</th>
        <th>Prix</th>
        <th>Info</th>
        <th>Calculatrice</th>
      </tr>
      <tr v-for="training in trainings" :key="training.id">
        <td>{{ training.name }}</td>
        <td>{{ training.price }} €</td>
        <td>
          <button class="button" @click="onDescriptionClick(training.id)">Info</button>
        </td>
        <td>
          <button class="button" @click="onComputeClick(training.id)">Calculatrice</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "TrainingList",
  data() {
    return {
      trainings: [
        {
          id: 1,
          name: "Formation au risques",
          description: "J'ai aucune idée du résultat par contre",
          price: 1000
        },
        {
          id: 2,
          name: "Formation à la vente d'aspirine",
          description: "Pour les pharmaciens gitans",
          price: 1500
        }
      ]
    };
  },
  methods: {
    onDescriptionClick(id) {
      this.$router.push({ path: `/training/${id}` });
    },
    onComputeClick(id) {
      this.$router.push({ path: `/compute/${id}` });
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