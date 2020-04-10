<template>
  <div>
    <image-map-edit />
    <image-map-view />
  </div>
</template>
<script>
import ImageMapEdit from "./components/ImageMap/ImageMapEdit";
import ImageMapView from "./components/ImageMap/ImageMapView";

export default {
  components: {
    ImageMapEdit,
    ImageMapView,
  },
};
</script>
