<template>
  <g class="imagemap-draghandle" @mousemove.stop="handleResize" @click.stop>
    <rect
      :x="cx - 50"
      :y="cy - 50"
      width="100"
      height="100"
      class="imagemap-helper-rect"
      v-if="active"
    ></rect>
    <circle
      :cx="cx"
      :cy="cy"
      r="5"
      class="imagemap-resize-handle"
      @mousedown.self.stop="setActive"
    ></circle>
  </g>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      required: true,
      validator: val => ["ne", "nw", "sw", "se"].includes(val)
    },
    cx: {
      type: Number,
      required: true
    },
    cy: {
      type: Number,
      required: true
    },
    mapIsActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: false
    };
  },
  methods: {
    setActive() {
      // Set the active state to true
      this.active = true;
      // Set an event listener (on the entire body) to check for mouseUp event, if so, disable the active state on the draghandle
      window.addEventListener("mouseup", test);
      const _this = this;
      function test() {
        _this.active = false;
        window.removeEventListener("mouseup", test);
      }
    },
    handleResize(event) {
      if (event.buttons !== 1) return;

      let adjustments = {};

      switch (this.direction) {
        case "nw":
          adjustments = {
            x: event.movementX,
            y: event.movementY,
            width: -1 * event.movementX,
            height: -1 * event.movementY
          };
          break;
        case "ne":
          adjustments = {
            y: event.movementY,
            width: event.movementX,
            height: -1 * event.movementY
          };
          break;
        case "se":
          adjustments = {
            width: event.movementX,
            height: event.movementY
          };
          break;
        case "sw":
          adjustments = {
            x: event.movementX,
            width: -1 * event.movementX,
            height: event.movementY
          };
          break;
      }

      this.$emit("resize:map", adjustments);
    }
  }
};
</script>

<style>
.imagemap-resize-handle {
  fill: rgb(255, 255, 255);
  stroke: rgb(51, 51, 51);
  stroke-width: 1;
  opacity: 0.6;
  cursor: grab;
}
.imagemap-helper-rect {
  opacity: 0.2;
}
</style>
