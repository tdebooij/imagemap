<template>
  <div id="app">
    <image-map />
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
}
</style>
