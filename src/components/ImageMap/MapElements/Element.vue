<template>
  <g @contextmenu.stop.prevent>
    <component
      :is="map.element"
      v-bind="map.relativeAttributes"
      :class="{
        'is-active': map.isActive,
        'map-element': map.element != 'foreignObject'
      }"
      @mousedown.self.stop="$emit('selected')"
      @mousemove.self.stop="updatePosition"
    >
      <slot name="foreignObject"></slot>
    </component>
    <drag-handle
      v-for="handle in map.dragHandles"
      v-show="resizable"
      :key="handle.position"
      :handle="handle"
      :mapIsActive="map.isActive"
      :imageSize="imageSize"
      @resize:map="updateSize"
    />
  </g>
</template>

<script>
/* eslint-disable vue/no-use-v-if-with-v-for */
import DragHandle from "./Draghandle.vue";

export default {
  name: "MapElement",
  props: {
    map: { type: Object, required: true },
    imageSize: { type: Object },
    resizable: { type: Boolean, default: false }
  },
  methods: {
    updateSize(adjustments) {
      if (this.resizable) {
        // Loop over each adjustment that needs to be made and apply it
        for (const prop in adjustments) {
          this.map.attributes[prop] += adjustments[prop];
        }

        // Check for negative width and/or height values
        if (this.map.attributes.width < 2) {
          this.map.attributes.width = 2;
        }
        if (this.map.attributes.height < 2) {
          this.map.attributes.height = 2;
        }
        if (this.map.attributes.r < 1) {
          this.map.attributes.r = 1;
        }
        if (this.map.attributes.rx < 1) {
          this.map.attributes.rx = 1;
        }
        if (this.map.attributes.ry < 1) {
          this.map.attributes.ry = 1;
        }

        this.$emit("update:map", this.map);
      }
    },
    updatePosition(event) {
      if (this.resizable) {
        if (event.buttons !== 1) return;
        if (this.map.attributes.x)
          this.map.attributes.x +=
            (event.movementX / this.imageSize.width) * 100;
        if (this.map.attributes.y)
          this.map.attributes.y +=
            (event.movementY / this.imageSize.height) * 100;
        if (this.map.attributes.cx)
          this.map.attributes.cx +=
            (event.movementX / this.imageSize.width) * 100;
        if (this.map.attributes.cy)
          this.map.attributes.cy +=
            (event.movementY / this.imageSize.height) * 100;
        this.$emit("update:map", this.map);
      }
    }
  },
  components: { DragHandle }
};
</script>

<style scoped>
.map-element {
  fill: rgba(51, 51, 51, 0.4);
  stroke: rgba(255, 255, 255, 1);
  stroke-width: 1;
  cursor: move;
}
.map-element:hover {
  fill: rgba(51, 190, 51, 0.6);
}
.map-element.is-active {
  fill: rgba(51, 190, 51, 0.4);
  stroke: rgba(180, 255, 176, 1);
}
</style>
