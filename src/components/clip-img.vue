<template>
  <img
    ref="clipped"
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
      observer: null
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
  mounted: function() {
    const size = this.$refs.clipped.getBoundingClientRect();
    this.responsivePath(size.width,size.height);
    this.initObserver();
  },
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    onResize(mutation) {
      this.responsivePath(mutation[0].contentRect.width,mutation[0].contentRect.height);
    },
    initObserver() {
      const observer = new ResizeObserver(this.onResize);
      observer.observe(this.$refs.clipped);
      this.observer = observer;
    },
    getImgUrl() {
      return require('../assets/'+this.src);
    },
    responsivePath(width,height) {
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
  props: ["src","path","hoverpath"]
}
</script>
