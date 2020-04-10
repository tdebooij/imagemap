<template>
  <g class="imagemap-draghandle" @mousemove.stop="handleResize" @click.stop>
    <rect
      v-bind="helperAttributes"
      class="imagemap-helper-rect"
      v-if="active"
    ></rect>
    <circle
      v-bind="handle.relativeAttributes"
      class="imagemap-resize-handle"
      @mousedown.self.stop="setActive"
    ></circle>
  </g>
</template>

<script>
export default {
  props: {
    handle: {
      type: Object,
      required: true,
    },
    imageSize: { type: Object },
  },
  data() {
    return {
      active: false,
    };
  },
  methods: {
    // Add an extra element around the tiny draghandle, to give a bit more room to drag around :)
    setActive() {
      // Set the active state to true
      this.active = true;
      // Set an event listener (on the entire body) to check for mouseUp event, if so, disable the active state on the draghandle
      window.addEventListener("mouseup", disableHelperArea);
      const _this = this;
      function disableHelperArea() {
        _this.active = false;
        window.removeEventListener("mouseup", disableHelperArea);
      }
    },
    handleResize(event) {
      if (event.buttons !== 1) return;

      // Convert the event's movementX and movementY to relative values (in relation to the total image size)
      const relativeEvent = {
        movementX: (event.movementX / this.imageSize.width) * 100,
        movementY: (event.movementY / this.imageSize.height) * 100,
      };

      this.$emit("resize:map", this.handle.mousemovehandler(relativeEvent));
    },
  },
  computed: {
    helperAttributes() {
      const size = 10;
      return {
        x: this.handle.attributes.cx - size / 2 + "%",
        y: this.handle.attributes.cy - size / 2 + "%",
        width: size + "%",
        height: size + "%",
      };
    },
  },
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
