<template>
    <section ref="main">
      <p>
        The page you're looking for is not here. Feeling lost?
        <a href="#" v-on:click="backHomeButton">Back to home</a>
      </p>
      <svg
        ref="svg"
        xmlns="http://www.w3.org/2000/svg"
        :class="svgClass"
        :height="vh"
        :width="vw"
        :viewBox="svgViewBox">
          <circle
            v-for="circle in circles"
            :key="'c' + circle.key"
            :ref="'c' + circle.key"
            v-on:click="circleClick(circle)"
            r="0"
            :cx="circle.cx"
            :cy="circle.cy"
            :fill="circle.fill">
              <animate
                v-for="animate in circle.animations"
                :key="'a' + animate.attributeName + animate.begin"
                repeatCount="1"
                fill="freeze"
                attributeType="XML"
                v-bind="animate">
              </animate>
          </circle>
      </svg>
    </section>
</template>
<style scoped src="../assets/404.css"></style>
<script>
export default {
  name: 'error-404',
  data: function() {
    return {
      colors: ["386fa4","498abe","59a5d8","6fbce7","84d2f6","8bdcf6","91e5f6","9be7f7"],
      W: 65,
      H: 65,
      vw: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
      vh: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
      SVG: "http://www.w3.org/2000/svg",
      svgClass: "",
      circles: [],
      viewRatio: 1,
    }
  },
  computed: {
    svgViewBox() {
      return "0 0 "+this.vw+" "+this.vh;
    }
  },
  components: {
  },
  beforeDestroy() {
    this.circles = [];
  },
  mounted() {
    this.circles = [];
    const canvas = document.createElement("canvas");
    canvas.height = this.H;
    canvas.width = this.W;
    const ctx = canvas.getContext("2d");
    ctx.font = 0.6*this.W+"px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.rotate(-10*Math.PI/180);
    ctx.fillText("404 ", this.W*.475, this.H*.3);
    let idx = this.getBlackCoords(ctx);
    this.mkCircles(idx);
    this.circles = this.shuffle(this.circles);
  },
  methods: {
    startAnimation() {
      this.$refs.svg.querySelector("#start").beginElement();
    },
    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    goBack() {
      this.svgClass = "front";
      setTimeout(() => {
        this.$router.push("/");
      },950);
    },
    circleClick(circle) {
      console.log(circle);
      let index = this.circles.indexOf(circle);
      this.circles = [...this.circles.slice(0,index),
      ...this.circles.slice(index+1),circle];
      this.$root.$emit("err404toHome",circle.fill);
      this.goBack();
    },
    backHomeButton() {
      let circle = this.circles[Math.floor(Math.random()*this.circles.length)];
      let circleElt = this.$refs["c"+circle.key][0];
      circleElt.querySelector(".xclick").beginElement();
      circleElt.querySelector(".yclick").beginElement();
      circleElt.querySelector(".click").beginElement();
      this.circleClick(circle);
    },
    mkCircles(indexes) {
      const R = Math.max(this.vw,this.vh)/135;
      const translate = (coords) => {
        let x,y,ratio;
        if (this.vw > this.vh) {
          ratio = this.vh*this.viewRatio;
        } else {
          ratio = this.vw*this.viewRatio;
        }
        let marginY = (this.vh-ratio)/2;
        let marginX = (this.vw-ratio)/2;
        x = (coords.x/this.W)*ratio+marginX;
        y = (coords.y/this.H)*ratio+marginY;
        return { x, y }
      }
      indexes.forEach((e,i) => {
        let startX, startY;
        startY = this.vh+3*R;
        startX = Math.random()*this.vw;
        let { x, y } = translate(e);
        let r = R+(Math.random()*(R)-R*.5);
        let xBegin = Math.ceil((Math.random()*2600))+"ms";
        let xDur = "1300ms";
        let rBegin = Math.ceil((Math.random()*2600))+"ms";
        let rDur = "1300ms";
        let animations = [
          { attributeName:"r",
            values: [0,r].join(";"),
            dur: rDur,
            begin: "start.begin + "+rBegin,
          },
          { attributeName:"r",
            values: [r,Math.max(this.vh,this.vw)].join(";"),
            dur: "850ms",
            begin: "click",
            "class": "click"
          },
          { attributeName:"cx",
            values: x,
            dur: "1ms",
            begin: "click",
            accumulate: "sum",
            "class": "xclick"
          },
          { attributeName:"cy",
            values: y,
            dur: "1ms",
            begin: "click",
            accumulate: "sum",
            "class": "yclick"
          },
          { attributeName:"cx",
            values: [startX,x].join(";"),
            dur: xDur,
            begin: "start.begin + "+xBegin,
          },
          { attributeName:"cy",
            values: [startY,y].join(";"),
            dur: xDur,
            begin: "start.begin + "+xBegin,
          },
        ];
        if (i == 0) {
          animations.push({
            attributeName: "stroke",
            value: "none;none",
            dur: "10ms",
            begin: "indefinite",
            additive: "sum",
            id: "start"
          });
        }
        this.circles.push({
          cx: startX,
          cy: startY,
          key: this.circles.length,
          fill: "#"+this.colors[Math.round(Math.random()*7)],
          animations
        });
      });
      this.$nextTick(() => {
        setTimeout(() => {
          this.startAnimation();
        },550);
      });
    },
    indexToCoords(index,width) {
      let x,y;
      y = Math.floor(index/width);
      x = index % width;
      return { x, y };
    },
    getBlackCoords(ctx) {
      let data = ctx.getImageData(0,0,this.W,this.H).data;
      let indexes = [];
      data = data.filter((e,i) => i%4 == 3);
      data.forEach((e,i) => {
        if (e != 0) {
          indexes.push(this.indexToCoords(i,this.W));
        }
      });
      return indexes;
    }
  }
}
</script>
