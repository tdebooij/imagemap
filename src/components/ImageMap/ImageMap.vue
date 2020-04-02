<template>
  <div class="image-map">
    <img
      src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80"
      alt="Image to map"
      ref="imagemap"
    />
    <svg
      class="imagemap-svg-overlay"
      @contextmenu.prevent="$refs.contextmenu.open"
    >
      <element-component
        v-for="(map, index) in maps"
        :key="index"
        :map.sync="map"
        :imageSize="imageSize"
        @selected="setSelected(map, index)"
      ></element-component>
    </svg>
    <context-menu ref="contextmenu" @addElement="addElement" />
  </div>
</template>

<script>
import { Rectangle, Circle, Ellipse, ElementComponent } from "./MapElements";
import ContextMenu from "./ContextMenu.vue";

export default {
  name: "ImageMap",
  props: {
    value: { type: Array }
  },
  data() {
    return {
      maps: [],
      imageSize: {
        width: undefined,
        height: undefined
      }
    };
  },
  mounted() {
    // Add event listener for the window resize event
    this.$refs.imagemap.onload = this.getImageSize;
    window.addEventListener("resize", this.getImageSize);

    // Add event listener for the delete key
    window.addEventListener("keyup", this.deleteKeyListener);

    // If there is data in the value prop, set it to the maps prop
    if (this.value) this.maps = this.value.maps;
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

      this.maps.push(map);
    },
    setSelected(map, index) {
      this.deselectAllMaps();
      // Set the given map to active
      map.isActive = true;
      // Move the active map to the end of the array, so it is painted last and therefore on top
      this.maps.push(this.maps.splice(index, 1)[0]);
    },
    deselectAllMaps() {
      // Set all maps to inactive
      this.maps.forEach(map => (map.isActive = false));
    },
    deleteKeyListener(event) {
      if (event.key !== "Delete") return;
      this.maps.splice(
        this.maps.findIndex(e => e.isActive),
        1
      );
    },
    getImageSize() {
      this.imageSize.width = this.$refs.imagemap.width;
      this.imageSize.height = this.$refs.imagemap.height;
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
    }
  },
  components: { ElementComponent, ContextMenu }
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
