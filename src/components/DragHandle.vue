<template>
  <circle
    :cx="cx"
    :cy="cy"
    r="5"
    class="imagemap-resize-handle"
    data-area-index="0"
    data-coord-index="0"
    @mousemove.self.stop="handleResize"
    @click.self.stop
  ></circle>
  <!-- @mousemove.stop.prevent="handleResize($event)" -->
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
    }
  },
  methods: {
    handleResize(event) {
      if (event.buttons !== 1) return;

      switch (this.direction) {
        case "nw":
          this.$emit("resize:map", {
            x: event.movementX,
            y: event.movementY,
            width: -1 * event.movementX,
            height: -1 * event.movementY
          });
          break;
        case "ne":
          this.$emit("resize:map", {
            y: event.movementY,
            width: event.movementX,
            height: -1 * event.movementY
          });
          break;
        case "se":
          this.$emit("resize:map", {
            width: event.movementX,
            height: event.movementY
          });
          break;
        case "sw":
          this.$emit("resize:map", {
            x: event.movementX,
            width: -1 * event.movementX,
            height: event.movementY
          });
          break;
      }
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
</style>
