import DragHandle from "./DragHandle.js";

export default class MapElement {
  constructor(element, position) {
    this.element = element;
    this.x = position.x;
    this.y = position.y;
    // Set a newly created map to active by default
    this.isActive = true;
    // TODO: Pull default width and height from settings
    this.width = 40;
    this.height = 40;
  }

  // Getter for the element data, returns all attributes that can be bound to the DOM inside an <svg> element
  // e.g. `<svg><rect x="0", y="0" [...]></svg>`
  get data() {
    return {
      element: this.element,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }

  // Get the draghandles
  // TODO: This is currently only for a rectangle
  get dragHandles() {
    let handles = [];
    if (this.element === "rect") {
      const directions = ["ne", "nw", "sw", "se"];

      for (const direction of directions) {
        handles.push(new DragHandle(direction, this.data));
      }
    }
    return handles;
  }
}
