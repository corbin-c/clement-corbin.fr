<template>
  <section class="slideshow">
    <div class="visual">
      <figure id="laptop">
        <div class="content">
          <img
            v-for="slide in slides"
            :key="slide.picture"
            :class="slide.visibility"
            :title="'Screenshot of dekstop version for my project: '+slide.title"
            :src="getImgUrl('desktop-'+slide.picture)" />
        </div>
        <img src="../assets/slideshow/laptop.svg" class="frame">
      </figure>
      <figure id="phone">
        <div class="content">
          <img
            v-for="slide in slides"
            :key="slide.picture"
            :class="slide.visibility"
            :title="'Screenshot of dekstop version for my project: '+slide.title"
            :src="getImgUrl('phone-'+slide.picture)" />
        </div>
        <img src="../assets/slideshow/phone.svg" class="frame">
      </figure>
    </div>
    <fieldset>
      <label v-for="(slide, index) of slides" :key="slide.picture" :class="slide.radioview">
        <input
          type="radio"
          name="slideshow"
          :checked="(slide.visibility.includes('show'))"
          v-on:change="manualOverride(index)">
        <span class="radio">
        </span>
      </label>
    </fieldset>
    <article>
      <div class="caption" v-for="slide in slides"
          :key="slide.picture"
          :class="slide.visibility">
        <h2>{{ slide.title }}</h2>
        <p>{{ slide.description }}</p>
      </div>
    </article>
  </section>
</template>
<style scoped src="./styles/slideshow.css"></style>
<script>
export default {
  data: function() {
    return {
      interval: {},
      slides: [],
      shownSlide: 0
    }
  },
  components: {
  },
  computed: {
  },
  mounted: function() {
    this.slides = JSON.parse(this.slides_data).map((e,i) => {
      e.visibility = "hidden";
      e.radioview = "";
      if (i == 0) {
        e.visibility = "shown";
      }
      return e;
    });
    this.startInterval();
  },
  methods: {
    stopInterval() {
      try {
        clearInterval(this.interval);
      } catch {
        () => {};
      }      
    },
    startInterval() {
      this.stopInterval();
      this.interval = setInterval(() => {
        this.setSlide((this.shownSlide+1) % this.slides.length);
      }, 3000);
    },
    manualOverride(n) {
      this.stopInterval();
      setTimeout(() => {
        this.startInterval();
      }, 20000);
      this.setSlide(n);
    },
    getImgUrl(picture) {
      return require('../assets/slideshow/'+picture);
    },
    setSlide(n) {
      let ltr = !((this.shownSlide == this.slides.length-1)
        || (n < this.shownSlide));
      this.slides[this.shownSlide].visibility = (ltr) ? "hidetoleft" : "hidetoright";
      this.slides[n].visibility = (ltr) ? "showfromright" : "showfromleft";
      this.slides[this.shownSlide].radioview = (ltr) ? "":"inverted";
      this.slides[n].radioview = (ltr) ? "":"inverted";
      this.shownSlide = n;
    }
  },
  props: ["slides_data"]
}
</script>
