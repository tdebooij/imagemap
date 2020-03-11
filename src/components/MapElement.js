import Vue from "vue";
import MapElementComponent from "./MapElement.vue";

export default class MapElement {
  constructor(shape, x, y) {
    this.shape = shape;
    this.x = x;
    this.y = y;
    this.isActive = true;
    // TODO: Pull from settings or something
    this.width = 40;
    this.height = 40;
  }

  get component() {
    console.log("1");
    const ComponentClass = Vue.extend(MapElementComponent);
    console.log(ComponentClass);
    this.component = new ComponentClass({
      propsData: {
        data: {
          x: this.x,
          y: this.y,
          width: this.width,
          height: this.height
        }
      }
    });
    console.log("3");
    return this.component;
  }
}
