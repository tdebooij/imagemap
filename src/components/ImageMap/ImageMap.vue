<template>
  <div class="image-map">
    <img src="@/assets/groenteboer.jpg" alt="Image to map" ref="image" />
    <svg class="imagemap-svg-overlay">
      <element-component
        v-for="(map, index) in maps"
        :key="index"
        :map.sync="map"
        :imageSize="imageSize"
        @selected="setSelected(map, index)"
      ></element-component>
    </svg>
  </div>
</template>

<script>
import { ElementComponent } from "./MapElements";

export default {
  name: "ImageMap",
  props: {
    value: { type: Array },
    settings: {
      showMarkers: { type: Boolean, default: false },
      showMaps: { type: Boolean, default: false },
    },
    imageSize: { type: Object },
  },
  data() {
    return {
      maps: [],
    };
  },
  mounted() {
    // Emit an event when the image completes loading
    console.log("loaded");
    this.$refs.image.onload = this.$emit("imgLoaded");

    // If there is data in the value prop, set it to the maps prop
    if (this.value) this.maps = this.value.maps;
  },
  methods: {
    setSelected(map, index) {
      this.deselectAllMaps();
      // Set the given map to active
      map.isActive = true;
      // Move the active map to the end of the array, so it is painted last and therefore on top
      this.maps.push(this.maps.splice(index, 1)[0]);
    },
    deselectAllMaps() {
      // Set all maps to inactive
      this.maps.forEach((map) => (map.isActive = false));
    },
    deleteKeyListener(event) {
      if (event.key !== "Delete") return;
      this.maps.splice(
        this.maps.findIndex((e) => e.isActive),
        1
      );
    },
    getImageSize() {
      this.imageSize.width = this.$refs.imagemap.width;
      this.imageSize.height = this.$refs.imagemap.height;
    },
    emitUpdate() {
      this.$emit("input", this.maps);
    },
  },
  watch: {
    // Set up a watcher to emit values to the parent
    maps: {
      handler: function() {
        this.emitUpdate();
      },
      deep: true,
    },
    value: {
      handler: function(newVal) {
        this.maps = newVal;
      },
      deep: true,
    },
  },
  components: { ElementComponent },
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
