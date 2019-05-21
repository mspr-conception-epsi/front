<template>
  <div id="content">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a
          role="button"
          class="navbar-burger"
          data-target="navMenu"
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navMenu" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" @click="onHomeClick">Accueil</a>

          <a class="navbar-item" @click="onComputeClick">Calculette</a>
          <a class="navbar-item" @click="onProductsClick">Produits</a>
          <a class="navbar-item" @click="onTrainingsClick">Formations</a>
        </div>

        <div class="navbar-end" v-if="!$store.state.token">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-light" @click="onLoginClick">Connexion</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="app">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".navbar-burger"),
      0
    );

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach(el => {
        el.addEventListener("click", () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle("is-active");
          $target.classList.toggle("is-active");
        });
      });
    }
  },
  methods: {
    onHomeClick() {
      this.$router.push({ path: "/" });
    },
    onComputeClick() {
      this.$router.push({ path: "/compute" });
    },
    onLoginClick() {
      this.$router.push({ path: "/login" });
    },
    onProductsClick() {
      this.$router.push({ path: "/products" });
    },
    onTrainingsClick() {
      this.$router.push({ path: "/trainings" });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
