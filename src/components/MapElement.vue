<template>
  <g>
    <component
      :is="data.element"
      v-bind.camel="data.props"
      class="map-element"
      :class="{ 'is-active': isActive }"
      @click.self.stop.prevent="emitMapSelected"
    />
    <resize-handle
      v-show="isActive"
      v-for="handle in dragHandles"
      :key="`x: ${handle.cx}, y: ${handle.cy}`"
      v-bind="handle"
      @selected="emitHandleSelected(handle)"
    ></resize-handle>
  </g>
</template>

<script>
import ResizeHandle from "./ResizeHandle.vue";
import dragHandles from "./ComputedDragHandles";

export default {
  name: "MapElement",
  props: {
    data: { type: Object, required: true },
    isActive: { type: Boolean, default: false }
  },
  methods: {
    emitMapSelected(event) {
      event.preventDefault;
      this.$emit("mapSelected");
    },
    emitHandleSelected(handle, event) {
      event.preventDefault;
      this.$emit("handleSelected", handle);
    },

    handleResize(data) {
      for (const prop in data) {
        this.data.props[prop] += data[prop];
      }
    }
  },
  computed: {
    dragHandles
  },
  components: { ResizeHandle }
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
