<template>
  <div id="app">
    <div class="col-50">
      <div ref="mapContainer" @contextmenu.prevent="$refs.contextmenu.open">
        <image-map
          v-model="maps"
          showMaps="true"
          showMarkers="true"
          :imageSize="imageSize"
          @imgLoaded="getImageSize"
        />

        <context-menu ref="contextmenu" @addElement="addElement" />
      </div>
    </div>
    <div class="col-50">
      {{ maps }}
    </div>
  </div>
</template>

<script>
import ContextMenu from "./ContextMenu.vue";
import ImageMap from "./ImageMap";
import { Rectangle, Circle, Ellipse } from "./MapElements";

export default {
  name: "ImageMapEdit",
  data() {
    return {
      maps: [],
      imageSize: {
        width: undefined,
        height: undefined,
      },
    };
  },
  mounted() {
    // Add event listener for the window resize event
    window.addEventListener("resize", this.getImageSize);

    // Add event listener for the delete key
    window.addEventListener("keyup", this.deleteKeyListener);
  },
  methods: {
    addElement(shape, event) {
      // Deselect the currently selected maps
      this.deselectAllMaps();

      // Create a new element, add it to our maps array and save the new length
      let map;
      switch (shape) {
        case "rect":
          map = new Rectangle(
            event,
            this.imageSize.width,
            this.imageSize.height
          );
          break;
        case "circle":
          map = new Circle(event, this.imageSize.width, this.imageSize.height);
          break;
        case "ellipse":
          map = new Ellipse(event, this.imageSize.width, this.imageSize.height);
          break;
        default:
          throw new Error(`Non-existing shape: "${shape}"`);
      }
      if (!this.maps) this.maps = [];
      this.maps.push(map);
    },
    deleteKeyListener(event) {
      if (event.key !== "Delete") return;
      this.maps.splice(
        this.maps.findIndex((e) => e.isActive),
        1
      );
    },
    getImageSize() {
      this.$nextTick(() => {
        this.imageSize.width = this.$refs.mapContainer.clientWidth;
        this.imageSize.height = this.$refs.mapContainer.clientHeight;
      });
    },
    deselectAllMaps() {
      // Set all maps to inactive
      if (this.maps) this.maps.forEach((map) => (map.isActive = false));
    },
  },
  components: {
    ImageMap,
    ContextMenu,
  },
};
</script>

<style>
.col-50 {
  width: 50%;
  padding: 0 1rem;
}
</style>
