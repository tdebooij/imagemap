<template>
  <div
    class="image-map"
    @click="containerClick"
    @mousemove="containerMouseMove"
    @mouseup="containerMouseUp"
  >
    <img
      src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80"
      alt="Image to map"
    />
    <svg class="imagemap-svg-overlay">
      <!-- <map-element
        v-for="(map, mapIndex) in maps"
        :key="mapIndex"
        :data="map"
        :isActive="selectedMap === map"
        @handleSelected="selectResizeHandle"
        @mapSelected="selectMap(map)"
      ></map-element> -->
    </svg>
  </div>
</template>

<script>
//import MapElement from "./MapElement.vue";
import MapElementClass from "./MapElement.js";

export default {
  name: "ImageMap",
  data() {
    return {
      maps: [],
      selectedMap: undefined,
      selectedHandle: undefined
    };
  },
  methods: {
    containerClick(evt) {
      const mousePostion = getRelativeMousePosition(evt);
      // Create a new element, add it to our maps array and save the new length
      const newMap = {
        element: "rect",
        props: { x: mousePostion.x, y: mousePostion.y, width: 100, height: 100 }
      };
      this.maps.push(newMap);

      // Set the active map to the newly created map
      this.selectedMap = newMap;

      // New test code below
      const mapClass = new MapElementClass(
        "rect",
        mousePostion.x,
        mousePostion.y
      );
      console.log("----");
      console.log(mapClass);
    },
    containerMouseUp() {
      console.log("mouseUp");
    },
    containerMouseMove(event) {
      if (event.buttons === 1) {
        console.log("movin");
      }
    },
    handleMove(map, evt) {
      if (evt.buttons === 1) {
        map.props.x += evt.movementX;
        map.props.y += evt.movementY;
      }
    },
    selectMap(map) {
      this.selectedMap = map;
    },
    selectResizeHandle(handle) {
      console.log(handle);
      // console.log(map);
      // console.log(event);
      //this.selectedHandle = handle;
    }
  },
  components: {}
};

const getRelativeMousePosition = function(e) {
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
