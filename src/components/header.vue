<template>
    <header :class="state" v-on:animationend="updateState">
      
      <p v-if="!navShown">Hi,</p><p v-if="!navShown">I'm</p>
      
      <h1>Clément <span>{{ lastName }}</span></h1>
      
      <p v-if="!navShown">freelance</p>
      
      <h2>JavaScript <span>developer</span></h2>
      
      <p v-if="!navShown" v-on:animationend="hideTitleScreen">Welcome to my portfolio</p>

      <transition name="nav-in">
        <nav-menu v-if="navShown" :links="links" heading="Clément Corbin"></nav-menu>
      </transition>
    </header>
</template>
<style scoped src="../assets/header.css"></style>
<script>
import Nav from "./nav.vue";
export default {
  data: function() {
    return {
      route: "/",
      state: "header static",
      lastName: "Corbin",
    }
  },
  components: {
    "nav-menu": Nav
  },
  computed: {
    navShown() {
      return this.state.includes("static");
    },
  },
  watch: {
    $route: "setRoute"
  },
  mounted: function() {
    this.setState();
  },
  methods: {
    setRoute(e) {
      if (this.route === "/") {
        this.route = e.path;
        this.setState();
      }
    },
    setState() {
      if (this.route === "/") {
        this.state = "title";
        this.lastName = "Corbin,";
      } else {
        this.state = "header static";
        this.lastName = "Corbin";        
      }
    },
    updateState(e) {
      if (e.animationName.includes("toheader")) {
        this.state = "header static";
      }
    },
    hideTitleScreen() {
      setTimeout(() => {
        this.state = "header";
        if (this.lastName.slice(-1) == ",") {
          this.lastName = "Corbin";
        }
      },750);
    }
  },
  props: ["links"]
}
</script>
