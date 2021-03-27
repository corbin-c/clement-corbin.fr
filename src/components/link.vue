<template>
  <a :href="to" :title="title" v-on:click="navigate"><slot></slot></a>
</template>
<style scoped>
</style>
<script>
export default {
  data: function() {
    return {};
  },
  components: {
  },
  computed: {
  },
  mounted: function() {
  },
  methods: {
    navigate(e) {
      e.preventDefault();
      let delay = 0;
      if ((this.to.split("#")[0] !== "")
        && (this.$route.path !== this.to.split("#")[0])
        && (this.transition !== "none")) {
        this.$root.$emit("navigation", {
          position: {
            cx: e.clientX,
            cy: e.clientY
          }
        });
        delay = 550;
      }
      setTimeout(() => {
        let selector = this.to.split("#")[1];
        selector = (typeof selector === "undefined") ? "":"#" + selector;
        this.$router
          .push({ path: this.to, hash: selector }, ()=>{
            }, () => {
            if (selector && document.querySelector(selector)) {
              document.querySelector(selector).scrollIntoView({behavior:"smooth"});
            } else {
              window.scrollTo({top:0,left:0,behavior:"smooth"});
            }
          });
      },delay);
    }
  },
  props: ["to","title","transition"]
}
</script>
