<template>
  <div id="app">
    <div class="col-50">
      <div class="image-map">
        <img src="@/assets/groenteboer.jpg" alt="Image to map" ref="image" />
        <image-map v-model="maps" :showMaps="true" :isResizable="false" />
      </div>
    </div>
    <div class="col-50">
      <div v-if="this.maps && activeMap" class="active-map-content">
        <div v-html="activeMap.content"></div>
      </div>
      <div v-else>
        Select a map first 😘
      </div>
    </div>
  </div>
</template>

<script>
import ImageMap from "./ImageMap";

export default {
  name: "ImageMapEdit",
  props: {
    value: { type: Array },
  },
  data() {
    return {
      maps: [],
      imageSize: {
        width: undefined,
        height: undefined,
      },
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
  methods: {
    setSelected(map) {
      this.deselectAllMaps();
      // Set the given map to active
      map.isActive = true;
    },
  },
  computed: {
    activeMap() {
      const activeMap = this.maps.find((map) => map.isActive);
      return activeMap;
    },
  },
  components: {
    ImageMap,
  },
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

.col-50 {
  width: 50%;
  padding: 0 1rem;
}
</style>
