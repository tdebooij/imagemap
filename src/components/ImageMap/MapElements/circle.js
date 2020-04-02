import Element from "./element.js";
import Draghandle from "./draghandle.js";

export default class Circle extends Element {
  constructor(event) {
    super("circle");
    const r = this.startWidth / 2; // Because it is radius we divide it by 2
    const position = Element.getRelativeMousePosition(event);
    this.attributes = {
      cx: position.x + r,
      cy: position.y + r,
      r: r
    };
  }

  // Getter for the draghandles
  get dragHandles() {
    return [
      // Top left
      new Draghandle(
        this.attributes.cx - this.attributes.r,
        this.attributes.cy - this.attributes.r,
        event => {
          return {
            r: -1 * (event.movementX / 2),
            cx: event.movementX / 2,
            cy: event.movementX / 2
          };
        }
      ),
      // Top right
      new Draghandle(
        this.attributes.cx + this.attributes.r,
        this.attributes.cy - this.attributes.r,
        event => {
          return {
            r: event.movementX / 2,
            cx: event.movementX / 2,
            cy: -1 * (event.movementX / 2)
          };
        }
      ),
      // Bottom right
      new Draghandle(
        this.attributes.cx + this.attributes.r,
        this.attributes.cy + this.attributes.r,
        event => {
          return {
            r: event.movementX / 2,
            cx: event.movementX / 2,
            cy: event.movementX / 2
          };
        }
      ),
      // Bottom left
      new Draghandle(
        this.attributes.cx - this.attributes.r,
        this.attributes.cy + this.attributes.r,
        event => {
          return {
            r: -1 * (event.movementX / 2),
            cx: event.movementX / 2,
            cy: -1 * (event.movementX / 2)
          };
        }
      )
    ];
  }
}
