<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-text-align-center">Calculatrice</h1>
      <button class="accordion" v-on:click="discountRatePanel = !discountRatePanel">Taux de remise</button>
      <transition name="fade">
        <div class="panel is-vertical-center" v-show="discountRatePanel">
          <span>Prix d'achat net</span>
          <input type="text" class="formElement input" v-model="operatingPurchasePrice">
          <span>Prix d'achat brut</span>
          <input type="text" class="formElement input" v-model="grossPurchasePrice">
          <input
            type="submit"
            class="submit formElement"
            value="Calculer"
            v-on:click="computeDiscountRate"
          >
          <span
            class="result"
            v-show="discountRate"
          >Résultat: {{ parseFloat(this.discountRate).toFixed(2) }} %</span>
        </div>
      </transition>
      <button
        class="accordion"
        v-on:click="operatingPurchasePricePanel = !operatingPurchasePricePanel"
      >Prix d'achat net</button>
      <transition name="fade">
        <div class="panel is-vertical-center" v-show="operatingPurchasePricePanel">
          <span>Prix d'achat brut</span>
          <input type="text" class="formElement input" v-model="grossPurchasePrice">
          <span>Taux de remise</span>
          <input type="text" class="formElement input" v-model="discountRate">
          <input
            type="submit"
            class="submit formElement"
            value="Calculer"
            v-on:click="computeOperatingPurchasePrice"
          >
          <span
            class="result"
            v-show="operatingPurchasePrice"
          >Résultat: {{ parseFloat(this.operatingPurchasePrice).toFixed(2) }}</span>
        </div>
      </transition>
      <button
        class="accordion"
        v-on:click="operatingSellPricePanel = !operatingSellPricePanel"
      >Prix de vente net</button>
      <transition name="fade">
        <div class="panel is-vertical-center" v-show="operatingSellPricePanel">
          <span>Prix d'achat net</span>
          <input type="text" class="formElement input" v-model="operatingPurchasePrice">
          <span>Coefficient multiplicateur</span>
          <input type="text" class="formElement input" v-model="multiplier">
          <input
            type="submit"
            class="submit formElement"
            value="Calculer"
            v-on:click="computeOperatingSellPrice"
          >
          <span
            class="result"
            v-show="operatingSellPrice"
          >Résultat: {{ parseFloat(this.operatingSellPrice).toFixed(2) }}</span>
        </div>
      </transition>
      <button
        class="accordion"
        v-on:click="multiplierPanel = !multiplierPanel"
      >Coefficient multiplicateur</button>
      <transition name="fade">
        <div class="panel is-vertical-center" v-show="multiplierPanel">
          <span>Prix de vente net</span>
          <input type="text" class="formElement input" v-model="operatingSellPrice">
          <span>Prix d'achat net</span>
          <input type="text" class="formElement input" v-model="operatingPurchasePrice">
          <input
            type="submit"
            class="submit formElement"
            value="Calculer"
            v-on:click="computeMultiplier"
          >
          <span
            class="result"
            v-show="multiplier"
          >Résultat: {{ parseFloat(this.multiplier).toFixed(2) }}</span>
        </div>
      </transition>
    </div>
  </section>
</template>
<script>
export default {
  name: "Compute",
  data() {
    return {
      grossPurchasePrice: undefined,
      operatingSellPrice: undefined,
      discountRate: undefined,
      operatingPurchasePrice: undefined,
      multiplier: undefined,
      discountRatePanel: false,
      operatingPurchasePricePanel: false,
      operatingSellPricePanel: false,
      multiplierPanel: false
    };
  },
  methods: {
    computeDiscountRate() {
      this.discountRate =
        (1 - this.operatingPurchasePrice / this.grossPurchasePrice) * 100;
    },
    computeOperatingPurchasePrice() {
      this.operatingPurchasePrice =
        this.grossPurchasePrice * (1 - this.discountRate / 100);
    },
    computeOperatingSellPrice() {
      this.operatingSellPrice = this.operatingPurchasePrice * this.multiplier;
    },
    computeMultiplier() {
      this.multiplier = this.operatingSellPrice / this.operatingPurchasePrice;
    }
  },
  mounted() {
    if (!this.$store.state.token) {
      const state = JSON.parse(window.localStorage.getItem("state"));
      if (!state) {
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
  }
};
</script>

<style scoped>
.formElement {
  max-width: 400px;
}
.accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
}
.is-vertical-center {
  display: flex;
  align-items: center;
}
.is-text-align-center {
  text-align: center;
}
.active,
.accordion:hover {
  background-color: #ccc;
}

.panel {
  padding: 0 18px;
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
