<template>
  <svg
    class="imagemap-svg-overlay"
    v-if="maps"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
  >
    <element-component
      v-for="(map, index) in maps.filter(e => !e.isActive)"
      :key="index"
      :map.sync="map"
      :imageSize="imageSize"
      @selected="setSelected(map, index)"
    >
      <template v-if="$slots.foreignObject" v-slot:foreignObject>
        <slot name="foreignObject"></slot>
      </template>
    </element-component>
    <!-- Render the active element last, so they will be on top when dragging/resizing -->
    <element-component
      v-for="(map, index) in maps.filter(e => e.isActive)"
      :key="index + '-' + map.isActive"
      :map.sync="map"
      :imageSize="imageSize"
      :resizable="isResizable"
      @selected="setSelected(map, index)"
    >
      <template v-if="$slots.foreignObject" v-slot:foreignObject>
        <slot name="foreignObject"></slot>
      </template>
    </element-component>
  </svg>
</template>

<script>
import { ElementComponent } from "./MapElements";

export default {
  name: "ImageMap",
  props: {
    value: { type: Array },

    isResizable: { type: Boolean, default: false },
    showMaps: { type: Boolean, default: false },

    imageSize: { type: Object }
  },
  data() {
    return {
      maps: []
    };
  },
  mounted() {
    // If there is data in the value prop, set it to the maps prop
    if (this.value) this.maps = this.value.maps;
  },
  methods: {
    setSelected(map) {
      this.deselectAllMaps();
      // Set the given map to active
      map.isActive = true;
    },
    deselectAllMaps() {
      // Set all maps to inactive
      this.maps.forEach(map => (map.isActive = false));
    },
    emitUpdate() {
      this.$emit("input", this.maps);
    }
  },
  watch: {
    // Set up a watcher to emit values to the parent
    maps: {
      handler: function() {
        this.emitUpdate();
      },
      deep: true
    },
    value: {
      handler: function(newVal) {
        this.maps = newVal;
      },
      deep: true
    }
  },
  components: { ElementComponent }
};
</script>

<style>
img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
.image-map {
  padding: 0;
  margin: 0;
  width: 100%;
  position: relative;
}

.imagemap-svg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
