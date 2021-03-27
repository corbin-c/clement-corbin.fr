<template>
  <section>
    <article>
      <h1>Are you looking for a freelance JavaScript developer?</h1>
      <p><strong>Do you need:</strong></p>
      <ul>
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</li>
      </ul>
      <p><strong>You're in the right place!</strong> Here's what you can do:</p>
    </article>
    <figure>
        <div class="container">
          <img src="../assets/cc2.jpg" alt="Clément Corbin, freelance JavaScript developer">
        </div>
    <figcaption>Clément Corbin, freelance JavaScript developer</figcaption>
    </figure>
    <nav>
      <cta-button title="Let's talk about your project" to="/#hire" class="btn cta">Hire me now!</cta-button>
      <vue-link to="#down" title="More content below" class="btn kr">Keep reading
      <span class="arrow-circle">
        <svg viewBox="0 0 16 12"><polygon points="15.8,6 15.3,5.5 15.3,5.5 9.9,0.1 9.2,0.8 13.9,5.5 0.5,5.5 0.5,6.5 13.9,6.5 9.2,11.2 9.9,11.9 15.3,6.5 15.3,6.5"></polygon></svg>
        <svg viewBox="0 0 16 12"><polygon points="15.8,6 15.3,5.5 15.3,5.5 9.9,0.1 9.2,0.8 13.9,5.5 0.5,5.5 0.5,6.5 13.9,6.5 9.2,11.2 9.9,11.9 15.3,6.5 15.3,6.5"></polygon></svg>
      </span>
      </vue-link>
    </nav>
  </section>
</template>
<style scoped src="./styles/hero.css"></style>
<script>
import CTA from './cta.vue'
import VueLink from './link.vue'

export default {
  data: function() {
    return {};
  },
  components: {
    "cta-button": CTA,
    "vue-link": VueLink
  },
  computed: {
  },
  mounted: function() {
  },
  methods: {
    
  },
  props: []
}
</script>
