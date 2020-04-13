<template>
  <div id="app-container">
    <!-- Quick and dirty view switcher -->
    <ul class="view-switcher">
      <li
        v-for="view in allViews"
        :key="view.name"
        class="view-link"
        :class="view.component == currentView ? 'active' : ''"
        @click="currentView = view.component"
      >
        {{ view.name }}
      </li>
    </ul>
    <component :is="currentView" :value="savedMapModel" @save="setMap" />
  </div>
</template>

<script>
import ImageMapEdit from "./components/ImageMap/ImageMapEdit";
import ImageMapView from "./components/ImageMap/ImageMapView";
import TextAreaMapEdit from "./components/ImageMap/TextAreaMapEdit";
import TextAreaMapView from "./components/ImageMap/TextAreaMapView";

export default {
  name: "App",
  data() {
    return {
      allViews: [
        { component: ImageMapEdit, name: "Basic ImgMap Edit" },
        { component: ImageMapView, name: "Basic ImgMap View" },
        { component: TextAreaMapEdit, name: "TextArea ImgMap Edit" },
        { component: TextAreaMapView, name: "TextArea ImgMap View" }
      ],
      currentView: ImageMapEdit,
      savedMapModel: undefined
    };
  },
  methods: {
    setMap(map) {
      this.savedMapModel = map;
    }
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

  display: flex;
}

.col-50 {
  width: 50%;
  padding: 0 1rem;
}

.view-switcher {
  display: flex;
  justify-content: center;
}

.view-switcher .view-link {
  list-style-type: none;
  margin: 0 1rem;
  font-weight: 700;
  cursor: pointer;
  border-bottom: 0;
  color: black;
  transition: all 0.1s linear;
}

.view-switcher .view-link:hover,
.view-switcher .view-link.active {
  border-bottom: 2px solid cornflowerblue;
  color: cornflowerblue;
}
.view-switcher .view-link.active {
  cursor: auto;
}
</style>
