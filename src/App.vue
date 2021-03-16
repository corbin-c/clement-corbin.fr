<template>
  <div id="app">
    <title-header :links="links"></title-header>
    <div id="mainview" ref="mainview">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" id="tr404" :style="tr404style">
        <circle :style="transition404" stroke="none" cx="50" cy="50" r="200" v-on:animationend="hideSVG"></circle>
      </svg>
<!--
      <div id="tr404" :style="transition404"></div>
-->
      <router-view/>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poiret+One&display=swap');

:root {
/*
  --neutral1:#dce0d4;
  --neutral2:#c9c8d6;
  --regular1:#b6bddc;
  --regular2:#e19c8b;
  --contrast1:#adbeea;
  --contrast2:#ff6230;
e63946-f1faee-cdeae5-a8dadc-457b9d-1d3557
*/
  --neutral1:#cdeae5;
  --neutral2:#f1faee;
  --regular1:#a8dadc;
  --regular2:#457b9d;
  --contrast1:#1d3557;
  --contrast2:#e63946;
}
* {
  margin: 0;
  padding: 0;
  font-family: Sans;
  box-sizing: border-box;
  color: var(--contrast2);
  font-family: 'Roboto Slab', serif;
}
html {
  min-height: 100vh;
  background: var(--neutral1);
}
body {
  width: 100%;
  height: 100vh;
}
@keyframes reduce {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
#tr404 {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 300;
  width: 100vw;
  height: 100vh;
}
#mainview {
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
import Header from "./components/header.vue";
//~ import Nav from "./components/nav.vue";

export default {
  name: 'App',
  data: function() {
    return {
      fill404: "",
      transitionName: "",
      hiddenSVG: true,
      links: [
        {to:"/",slot:"Home"},
        {to:"/about",slot:"About"},
        {to:"/contact",slot:"Contact"},
        {to:"/404",slot:"404"},
      ],
    }
  },
  watch: {
    '$route' (to, from) {
      if ((from.path == "/404") && (this.fill404 != "")) {
        this.transitionName="err404toHome";
        this.hiddenSVG = false;
      } else {
        this.transitionName="";
      }
    }
  },
  created() {
    this.$root.$on("err404toHome",this.updateFill);
  },
  components: {
    //~ "nav-menu": Nav,
    "title-header": Header
  },
  mounted: function() {
  },
  computed: {
    transition404() {
      if (this.transitionName == "") {
        return "";
      } else {
        return `
          fill: `+this.fill404+`;
          transform-origin: bottom center;
          animation: .55s reduce forwards;
        `;
      }
    },
    tr404style() {
      if ((this.transitionName == "") || (this.hiddenSVG)) {
        return "display: none;";
      } else {
        return "display: block;";
      }
    }
  },
  methods: {
    updateFill(color) {
      this.fill404 = color;
    },
    hideSVG() {
      this.hiddenSVG = true;
      this.fill404="";
    }
  }
}
</script>
