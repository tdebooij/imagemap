<template>
  <div id="app">
    <div class="col-50">
      <image-map />
    </div>
    <div class="col-50">
      HERE GOES DATA JO!
    </div>
  </div>
</template>

<script>
import ImageMap from "./components/ImageMap/ImageMap";

export default {
  name: "App",
  components: {
    ImageMap
  }
};
</script>

<style>
#app {
  width: calc(100% - 4rem);
  margin: 2rem;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  user-select: none; /* to prevent selecting the entire thing on doubleclick */

  display: flex;
}

.col-50 {
  width: 50%;
  padding: 0 1rem;
}
</style>
