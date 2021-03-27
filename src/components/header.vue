<template>
    <header :class="state" v-on:animationend="updateState">
      
      <p v-if="!navShown">Hi,</p><p v-if="!navShown">I'm</p>
      
      <h1><vue-link to="/">Clément <span>{{ lastName }}</span></vue-link></h1>
      
      <p v-if="!navShown">freelance</p>
      
      <h2><vue-link to="/">JavaScript <span>developer</span></vue-link></h2>
      
      <p v-if="!navShown" v-on:animationend="hideTitleScreen">Welcome to my portfolio</p>

      <transition name="nav-in">
        <nav-menu v-if="navShown" :links="links" heading="Clément Corbin"></nav-menu>
      </transition>
    </header>
</template>
<style scoped src="./styles/header.css"></style>
<script>
import Nav from "./nav.vue";
import vueLink from './link.vue'
export default {
  data: function() {
    return {
      route: "",
      state: "header static",
      lastName: "Corbin",
    }
  },
  components: {
    "nav-menu": Nav,
    "vue-link": vueLink
  },
  computed: {
    navShown() {
      return this.state.includes("static");
    },
  },
  watch: {
    state: function() {
      this.$root.$emit("headerState",this.state);
    }
  },
  mounted: function() {
    this.route = window.location.pathname;
    this.setState();
  },
  methods: {
    setState() {
      if (this.route === "/") {
        this.state = "title";
        this.lastName = "Corbin,";
      } else {
        this.state = "header static x";
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
