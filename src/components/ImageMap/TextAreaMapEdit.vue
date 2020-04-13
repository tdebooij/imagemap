<template>
  <div id="app">
    <div class="col-50">
      <div
        ref="mapContainer"
        class="image-map"
        @contextmenu.prevent="$refs.contextmenu.open"
        v-click-outside="deselectAllMaps"
      >
        <img src="@/assets/groenteboer.jpg" alt="Image to map" ref="image" />
        <image-map
          v-model="maps"
          :showMaps="true"
          :isResizable="true"
          :imageSize="imageSize"
        />
        <context-menu ref="contextmenu" @addElement="addElement" />
      </div>
    </div>
    <div class="col-50">
      <div v-if="maps">
        <div
          v-for="(map, index) in maps"
          :key="index"
          @click.stop="setSelected(map)"
          class="map-content-editor"
          :class="map.isActive ? 'active' : ''"
        >
          <div>{{ map.element }}</div>
          <textarea v-model="map.content"></textarea>
        </div>
        <button @click="saveImageMap" class="save-button">Save</button>
      </div>
      <div v-else>
        {{ maps }}
        Create a map first 😘 textea
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import ContextMenu from "./ContextMenu.vue";
import ImageMap from "./ImageMap";
import { Rectangle, Circle, Ellipse } from "./MapElements";

export default {
  name: "ImageMapEdit",
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
  // Just for display purposes, can be removed on final implementation:
  created() {
    if (this.value) {
      this.$nextTick(() => {
        this.maps = this.value;
      });
    }
  },
  mounted() {
    // Get the image size on load
    this.$refs.image.onload = this.getImageSize;

    // Add event listener for the window resize event
    window.addEventListener("resize", this.getImageSize);

    // Add event listener for the delete key
    window.addEventListener("keyup", this.deleteKeyListener);
  },
  methods: {
    saveImageMap() {
      this.$emit("save", this.maps);
    },
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
      // Check if the delete key was released (return if some other random key was pressed)
      if (event.key !== "Delete") return;
      // Check if the focus is on an input element, if so we ignore the event as well (we don't want to delete a map when a user is just using delete in the input)
      if (document.activeElement instanceof HTMLTextAreaElement) return;
      // Check if any element is active at all
      if (this.maps.findIndex(e => e.isActive) === -1) return;

      this.maps.splice(
        this.maps.findIndex(e => e.isActive),
        1
      );
    },
    setSelected(map) {
      this.deselectAllMaps();
      // Set the given map to active
      map.isActive = true;
    },
    getImageSize() {
      this.imageSize.width = this.$refs.image.clientWidth;
      this.imageSize.height = this.$refs.image.clientHeight;
    },
    deselectAllMaps() {
      // Set all maps to inactive
      if (this.maps) this.maps.forEach(map => (map.isActive = false));
    }
  },
  components: {
    ImageMap,
    ContextMenu
  },
  directives: {
    ClickOutside
  }
};
</script>

<style>
.image-map {
  padding: 0;
  margin: 0;
  width: 100%;
  position: relative;
}

.map-content-editor {
  margin-bottom: 1rem;
}

.map-content-editor textarea {
  box-sizing: border-box;
  width: 100%;
  height: 3rem;
}

.map-content-editor.active {
  background-color: rgba(51, 190, 51, 0.4);
}

.save-button {
  display: block;
  margin-left: auto;
}

.col-50 {
  width: 50%;
  padding: 0 1rem;
}
</style>
