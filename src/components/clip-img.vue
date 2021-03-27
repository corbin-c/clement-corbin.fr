<template>
  <img
    ref="clipped"
    :alt="alt"
    :src="getImgUrl()"
    :style="getStyle"> 
</template>
<style scoped>
img {
  clip-path: var(--restpath);
}
img:hover {
  clip-path: var(--hoverpath);  
}
</style>
<script>
export default {
  data: function() {
    return {
      computedPath: {
        rest: "",
        hover: ""
      },
    }
  },
  computed: {
    getStyle() {
      return {
        '--restpath': this.computedPath.rest,
        '--hoverpath': this.computedPath.hover
      }
    }
  },
  created() {
    this.$root.$on("resizeView",this.responsivePath);
  },
  mounted: function() {
    this.responsivePath();
  },
  methods: {
    getImgUrl() {
      return require('../assets/'+this.src);
    },
    responsivePath() {
      if (!this.$refs.clipped) {
        return;
      }
      let { width, height } = this.$refs.clipped.getBoundingClientRect();
      if (height == 0) {
        height = width;
      }
      [{path:this.path,target:"rest"},
      {path:this.hoverpath,target:"hover"}].forEach(path => {
        let p = path.path.split(" ");
        let lastLetter = 0;
        p = p.map((e,i) => {
          if (isNaN(parseInt(e))) {
            lastLetter = i;
          }
          if (e.includes("%")) {
            e = parseFloat(e.split("%")[0])/100;
            if ((i-lastLetter)%2 == 0) { //Y
              e = e*height;
            } else { //X
              e = e*width;
            }
          }
          return e;
        });
        p = p.join(" ");
        this.computedPath[path.target] = "path('"+p+"')";
      });
    }
  },
  props: ["src","path","hoverpath","alt"]
}
</script>
