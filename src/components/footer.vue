<template>
  <footer>
    <section ref="s1" :class="s1class">
      <nav>
        <ul>
          <li><vue-link title="Navigate to Home" to="/">Home</vue-link></li>
          <li><a target="_blank" href="https://www.twitter.com/clem_corbin" title="Follow on Twitter">Follow on Twitter</a></li>
          <li><vue-link title="Navigate to About" to="/about">About me</vue-link></li>
          <li><a target="_blank" href="https://www.linkedin.com/in/clement-corbin/" title="Connect on LinkedIn">Connect on LinkedIn</a></li>
          <li><vue-link title="Navigate to Contact" to="/contact">Email me</vue-link></li>
          <li><a target="_blank" href="https://github.com/corbin-c" title="Code on GitHub">Code on GitHub</a></li>
        </ul>
      </nav>
    </section>
    <section ref="s2" :class="s2class">
      <p>Clément Corbin, Freelance Web Developer</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
    </section>
  </footer>
</template>
<style src="./styles/footer.css" scoped></style>
<script>
import vueLink from './link.vue'
export default {
  data: function() {
    return {
      s1class: "hidden",
      s2class: "hidden",
    };
  },
  created() {
    this.$root.$on("scroll",this.animateOnScroll);
  },
  components: {
    "vue-link": vueLink
  },
  computed: {
  },
  mounted: function() {
  },
  methods: {
    animateOnScroll(scrollY) {
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      this.s1class = (this.$refs.s1.offsetTop-vh-scrollY+this.$refs.s1.offsetHeight*.7 > 0)
        ? "hidden"
        : "visible";
      this.s2class = (this.$refs.s2.offsetTop-vh-scrollY+this.$refs.s1.offsetHeight*.7 > 0)
        ? "hidden"
        : "visible";
    }
  },
  props: []
}
</script>
