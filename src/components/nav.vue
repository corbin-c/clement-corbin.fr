<template>
  <nav>
    <button v-on:click="showNav()" :class="buttonClass" :style="buttonStyle"></button>
    <h3 :class="ulClass">{{ heading }}</h3>
    <ul :class="ulClass" v-on:animationend="close">
      <li
        v-for="(nav,index) in links"
        :key="index"
        v-on:click="showNav()"
        v-bind:style="getDelay(index)">
        <vue-link :title="'Navigate to '+nav.slot" :to="nav.to" transition="none">{{ nav.slot }}</vue-link>
      </li>
    </ul>
  </nav>
</template>
<style scoped src="./styles/nav.css"></style>
<script>
import vueLink from './link.vue'
export default {
  data: function() {
    return {
      navClosed: true,
      navShown: false,
      init: true
    }
  },
  components: {
    "vue-link": vueLink
  },
  computed: {
    ulClass() {
      return (this.navShown) ? "visible":["hidden",(this.navClosed) ? "closed":"closing"];
    },
    buttonClass() {
      return (this.navShown) ? ["cross"]:["burger",(this.init) ? "init":""];
    },
    buttonStyle() {
      return "animationPlayState:running;"
    }
  },
  mounted: function() {
  },
  methods: {
    close(e) {
      if (e.animationName.includes("shrink-height")) {
        this.navClosed = true;
      }
    },
    getDelay(i) {
      return {
        "--delay": (i/5)+.3+"s",
        "--leavedelay": (this.links.length-1-i)/5+"s"
      } 
    },
    showNav() {
      if (this.init) {
        this.init = false;
      }
      if (this.navClosed) {
        this.navClosed = false;
      }
      this.navShown = !this.navShown;
    }
  },
  props: ["links","heading"]
}
</script>
