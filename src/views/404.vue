<template>
    <main ref="main">
      <p>
        The page you're looking for is not here. Feeling lost?
        <a href="#" class="btn" v-on:click="backHomeButton">Back to home
        <span class="arrow-circle">
          <svg viewBox="0 0 16 12"><polygon points="15.8,6 15.3,5.5 15.3,5.5 9.9,0.1 9.2,0.8 13.9,5.5 0.5,5.5 0.5,6.5 13.9,6.5 9.2,11.2 9.9,11.9 15.3,6.5 15.3,6.5"></polygon></svg>
          <svg viewBox="0 0 16 12"><polygon points="15.8,6 15.3,5.5 15.3,5.5 9.9,0.1 9.2,0.8 13.9,5.5 0.5,5.5 0.5,6.5 13.9,6.5 9.2,11.2 9.9,11.9 15.3,6.5 15.3,6.5"></polygon></svg>
        </span>
        </a>
      </p>
      <svg
        id="err404"
        ref="svg"
        xmlns="http://www.w3.org/2000/svg"
        :height="vh"
        :width="vw"
        :viewBox="svgViewBox">
          <circle
            v-for="circle in circles"
            :key="'c' + circle.key"
            :ref="'c' + circle.key"
            v-on:click="(e) => { circleClick(circle,e) }"
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
    </main>
</template>
<style scoped src="./404.css"></style>
<script>
export default {
  name: 'error-404',
  data: function() {
    return {
      colors: ["facfbd","fbc1ac","fbb29a","fca489","fc9577","fc7753"],
      //~ colors: ["dbdbd2","bdc9c4","9fb7b6","80a5a8","62949a","43828c","25707e","065e70"],
      W: 65,
      H: 65,
      vw: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
      vh: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
      SVG: "http://www.w3.org/2000/svg",
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
      setTimeout(() => {
        this.$router.push("/");
      },500);
    },
    circleClick(circle,event) {
      this.$root.$emit("navigation",
        { color: circle.fill,
          position: {
            cx: event.clientX,
            cy: event.clientY
          }
        });
      this.goBack();
    },
    backHomeButton(event) {
      event.preventDefault();
      let circle = this.circles[Math.floor(Math.random()*this.circles.length)];
      this.circleClick(circle,event);
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
          fill: "#"+this.colors[Math.round(Math.random()*(this.colors.length-1))],
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
