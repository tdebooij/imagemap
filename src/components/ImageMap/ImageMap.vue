<template>
  <div class="image-map">
    <img
      src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80"
      alt="Image to map"
    />
    <svg
      class="imagemap-svg-overlay"
      @contextmenu.prevent="$refs.elementmenu.open"
    >
      <map-element
        v-for="(map, index) in maps"
        :key="index"
        :map.sync="map"
        @selected="setSelected(map, index)"
      ></map-element>
    </svg>
    <add-element-context-menu ref="elementmenu" @addElement="addElement" />
  </div>
</template>

<script>
import MapElement from "./MapElement.vue";
import MapElementClass from "./MapElement.js";
import AddElementContextMenu from "./ElementContextMenu.vue";

export default {
  name: "ImageMap",
  data() {
    return {
      maps: [],
      mouseClickEvent: undefined
    };
  },
  methods: {
    addElement(shape, event) {
      // Deselect the currently selected maps
      this.deselectAllMaps();

      // Create a new element, add it to our maps array and save the new length
      const map = new MapElementClass(shape, getRelativeMousePosition(event));
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
    }
  },
  components: { MapElement, AddElementContextMenu }
};

// Get the mouse position relative to the image element
const getRelativeMousePosition = function(e) {
  console.log(e);
  const rect = e.target.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
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
