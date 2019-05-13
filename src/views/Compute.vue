<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-narrow">
          <h1 class="title">Calculatrice</h1>
          <button
            class="accordion"
            v-on:click="discountRatePanel = !discountRatePanel"
          >Taux de remise</button>
          <div class="panel" v-show="discountRatePanel">
            <span>Prix d'achat net</span>
            <input type="text" class="input" v-model="operatingPurchasePrice">
            <span>Prix d'achat brut</span>
            <input type="text" class="input" v-model="grossPurchasePrice">
            <input type="submit" class="submit" value="Calculer" v-on:click="computeDiscountRate">
            <span
              class="result"
              v-show="discountRate"
            >Résultat: {{ parseFloat(this.discountRate).toFixed(2) }} %</span>
          </div>
          <button
            class="accordion"
            v-on:click="operatingPurchasePricePanel = !operatingPurchasePricePanel"
          >Prix d'achat net</button>
          <div class="panel" v-show="operatingPurchasePricePanel">
            <span>Prix d'achat brut</span>
            <input type="text" class="input" v-model="grossPurchasePrice">
            <span>Taux de remise</span>
            <input type="text" class="input" v-model="discountRate">
            <input
              type="submit"
              class="submit"
              value="Calculer"
              v-on:click="computeOperatingPurchasePrice"
            >
            <span
              class="result"
              v-show="operatingPurchasePrice"
            >Résultat: {{ parseFloat(this.operatingPurchasePrice).toFixed(2) }}</span>
          </div>
          <button
            class="accordion"
            v-on:click="operatingSellPricePanel = !operatingSellPricePanel"
          >Prix de vente net</button>
          <div class="panel" v-show="operatingSellPricePanel">
            <span>Prix d'achat net</span>
            <input type="text" class="input" v-model="operatingPurchasePrice">
            <span>Coefficient multiplicateur</span>
            <input type="text" class="input" v-model="multiplier">
            <input
              type="submit"
              class="submit"
              value="Calculer"
              v-on:click="computeOperatingSellPrice"
            >
            <span
              class="result"
              v-show="operatingSellPrice"
            >Résultat: {{ parseFloat(this.operatingSellPrice).toFixed(2) }}</span>
          </div>
          <button
            class="accordion"
            v-on:click="multiplierPanel = !multiplierPanel"
          >Coefficient multiplicateur</button>
          <div class="panel" v-show="multiplierPanel">
            <span>Prix de vente net</span>
            <input type="text" class="input" v-model="operatingSellPrice">
            <span>Prix d'achat net</span>
            <input type="text" class="input" v-model="operatingPurchasePrice">
            <input type="submit" class="submit" value="Calculer" v-on:click="computeMultiplier">
            <span
              class="result"
              v-show="multiplier"
            >Résultat: {{ parseFloat(this.multiplier).toFixed(2) }}</span>
          </div>
        </div>
      </div>
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
        this.grossPurchasePrice * (1 - this.discountRate);
    },
    computeOperatingSellPrice() {
      this.operatingSellPrice = this.operatingPurchasePrice * this.multiplier;
    },
    computeMultiplier() {
      this.multiplier = this.operatingSellPrice / this.operatingPurchasePrice;
    }
  }
};
</script>

<style scoped>
.input {
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
  transition: 0.4s;
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
</style>
