<template>
  <vue-link :title="title" :to="to"><slot></slot>
    <svg id="arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="18 18 36 36">
      <rect class="main" x="34.5" y="37.5" height="14" width="3" transform="rotate(45,36,50)"></rect>
      <rect class="main" x="34.5" y="37.5" height="14" width="3" transform="rotate(-45,36,50)"></rect>
      <rect class="main" x="34.5" y="22" height="28" width="3"></rect>
      <rect class="center" x="34.5" y="0" height="28" width="3"></rect>
      <g class="left">
        <rect class="branch" x="34.5" y="37.5" width="3" transform="rotate(-45,36,50)"></rect>
      </g>
      <g class="right">
        <rect class="branch" x="34.5" y="37.5" width="3" transform="rotate(45,36,50)"></rect>
      </g>
    </svg>
  </vue-link>
</template>
<style scoped>
a {
  position: relative;
}
a svg {
  display: inline-block;
  width: 1em;
  height: 1em;
  top: 0.2em;
  margin-left: .2em;
  overflow: hidden;
  position: relative;
  transform: rotate(-90deg);
}
.main {
  fill: var(--btn-secondary) !important;
  stroke: none !important;
}
a:hover .main {
  fill: var(--btn-secondary) !important;
  stroke: none !important;
}
.center, .branch {
  fill: var(--btn-primary) !important;
  stroke: var(--btn-primary) !important;
}
@keyframes slidetop {
  from {
    transform: translate(0px, 0px) scaleY(0);
  }
  to {
    transform: translate(0px, 22px) scaleY(1);
  }
}
@keyframes slideleft {
  from {
    transform: translate(-20px, -20px);
  }
  to {
    transform: translate(0px, 0px);
  }
}
@keyframes slideright {
  from {
    transform: translate(20px, -20px);
  }
  to {
    transform: translate(0px, 0px);
  }
}
@keyframes grow {
  from {
    height: 0px;
  }
  to {
    height: 14px;
  }
}
a:hover .center {
  opacity: 1;
  animation: 1300ms cubic-bezier(0.19, 1, 0.22, 1) 100ms 1 normal forwards slidetop;
}
a:hover .branch {
  opacity: 1;
  animation: 1300ms cubic-bezier(0.19, 1, 0.22, 1) 100ms 1 normal forwards grow;
}
a:hover .left {
  animation: 1300ms cubic-bezier(0.19, 1, 0.22, 1) 100ms 1 normal forwards slideleft;
}
a:hover .right{
  animation: 1300ms cubic-bezier(0.19, 1, 0.22, 1) 100ms 1 normal forwards slideright;
}
.center {
  opacity: 0;
  transform: translate(0px, 0px) scaleY(0);
}
.branch {
  opacity: 0;
  height: 0;
}
</style>
<script>
import vueLink from './link.vue'
export default {
  data: function() {
    return {};
  },
  components: {
    "vue-link": vueLink
  },
  computed: {
  },
  mounted: function() {
  },
  methods: {
    
  },
  props: ["to","title"]
}
</script>
