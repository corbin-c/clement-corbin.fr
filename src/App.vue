<template>
  <div id="app" :class="topClass">
    <title-header :links="links"></title-header>
    <svg xmlns="http://www.w3.org/2000/svg" id="tr" :style="trStyle">
      <circle
        :style="circleTransition"
        stroke="none"
        :cx="transitionParameters.cx"
        :cy="transitionParameters.cy"
        :r="transitionParameters.r"
        v-on:animationend="hideSVG"></circle>
    </svg>
    <transition :name="contentTransition">
      <router-view v-if="contentShown"/>
    </transition>
    <transition :name="contentTransition">
      <app-footer v-if="contentShown"></app-footer>
    </transition>
  </div>
</template>
<style src="./assets/app.css"></style>
<script>
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";

export default {
  name: 'App',
  data: function() {
    return {
      contentShown: false,
      headerState:"",
      lastState:"",
      lastYscroll: 0,
      transitionParameters: {
        fill: "",
        name: "",
        cx: "0",
        cy: "0",
        r: "0"
      },
      hiddenSVG: true,
      links: [
        {to:"/",slot:"Home"},
        {to:"/about",slot:"About"},
        {to:"/contact",slot:"Contact"},
      ],
    }
  },
  created() {
    window.addEventListener('scroll', this.updateScroll);
    this.$root.$on("navigation",this.updateTransition);
    this.$root.$on("headerState",this.updateHeaderStatus);
  },
  components: {
    "title-header": Header,
    "app-footer": Footer
  },
  mounted: function() {
  },
  computed: {
    topClass() {
      return (this.contentShown) ? "ready" : "";
    },
    contentTransition() {
      if ((this.$route.path == "/")
      && (this.lastState == "title")) {
        return "content-in";
      }
      return "";
    },
    circleTransition() {
      if (this.transitionParameters.name == "") {
        return "";
      } else {
        return "fill: "+this.transitionParameters.fill+"; transform-origin: "+this.transitionParameters.cx+" "+this.transitionParameters.cy+"; animation: 1s ease-in-out growAndReduce forwards;";
      }
    },
    trStyle() {
      if ((this.transitionParameters.name == "") || (this.hiddenSVG)) {
        return "display: none;";
      }
      return "display: block;";
    }
  },
  methods: {
    updateScroll() {
      let scroll = window.scrollY;
      let direction = (scroll > this.lastYscroll) ? 1:-1;
      this.$root.$emit("scroll",scroll,direction);
      this.lastYscroll = scroll;
    },
    updateHeaderStatus(state) {
      this.lastState = this.headerState;
      this.headerState = state;
      this.contentShown = state.includes("header");
    },
    updateTransition(parameters) {
      this.transitionParameters.name = "growAndReduce";
      this.hiddenSVG = false;
      if (parameters.color) {
        this.transitionParameters.fill = parameters.color;
      } else {
        //~ let colors = ["regular","neutral","contrast"];
        //~ this.transitionParameters.fill = "var(--"+colors[Math.round(Math.random()*(colors.length-1))]+")";
        this.transitionParameters.fill = "var(--regular)";
      }
      if (parameters.position) {
        this.transitionParameters.cx = parameters.position.cx+"px";
        this.transitionParameters.cy = parameters.position.cy+"px";     
      } else {
        this.transitionParameters.cx = "50vw";
        this.transitionParameters.cy = "50vh";
      }
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      this.transitionParameters.r = Math.sqrt(vw*vw+vh*vh)+"px";
    },
    hideSVG() {
      this.hiddenSVG = true;
      this.transitionParameters.fill = "";
    }
  }
}
</script>
