<template>
  <div></div>
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
      multiplier: undefined
    };
  },
  computed: {
    computeDiscountRate() {
      return (1 - this.operatingPurchasePrice / this.grossPurchasePrice) * 100;
    },
    computeOperatingPurchasePrice() {
      return this.grossPurchasePrice * (1 - this.discountRate);
    },
    computeOperatingSellPrice() {
      return this.operatingPurchasePrice * this.multiplier;
    },
    computeMultiplier() {
      return this.operatingSellPrice / this.operatingPurchasePrice;
    }
  }
};
</script>
