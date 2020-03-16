<template>
  <g>
    <component
      :is="map.element"
      v-bind="map"
      :class="{ 'is-active': map.isActive }"
      class="map-element"
      @mousedown.self.stop="$emit('selected')"
      @click.self.prevent="$emit('selected')"
      @mousemove.self.stop="updatePosition"
    />
    <drag-handle
      v-for="handle in map.dragHandles"
      :key="handle.direction"
      v-bind="handle.data"
      :mapIsActive="map.isActive"
      @resize:map="updateSize"
    />
  </g>
</template>

<script>
import DragHandle from "./DragHandle.vue";

export default {
  name: "MapElement",
  props: {
    map: { type: Object, required: true }
  },
  methods: {
    updateSize(adjustments) {
      // Loop over each adjustment that needs to be made and apply it
      for (const prop in adjustments) {
        this.map[prop] += adjustments[prop];
      }

      // Check for negative width and/or height values
      if (this.map.width < 0) {
        this.map.width = 0;
      }
      if (this.map.height < 0) {
        this.map.height = 0;
      }

      this.$emit("update:map", this.map);
    },
    updatePosition(event) {
      if (event.buttons !== 1) return;
      this.map.x += event.movementX;
      this.map.y += event.movementY;
      this.$emit("update:map", this.map);
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
}
.map-element:hover {
  fill: rgba(51, 190, 51, 0.6);
}
.map-element.is-active {
  fill: rgba(51, 190, 51, 0.4);
  stroke: rgba(180, 255, 176, 1);
  cursor: move;
}
</style>
