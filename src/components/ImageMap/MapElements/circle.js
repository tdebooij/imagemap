import Element from "./element.js";
import Draghandle from "./draghandle.js";

const r = 20;

export default class Circle extends Element {
  constructor(event) {
    super("circle");
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
          const movement = Math.max(event.movementX, event.movementY);
          return {
            r: -1 * movement
          };
        }
      ),
      // Top right
      new Draghandle(
        this.attributes.cx + this.attributes.r,
        this.attributes.cy - this.attributes.r,
        event => {
          const movement = Math.max(event.movementX, event.movementY);
          return {
            r: movement
          };
        }
      ),
      // Bottom right
      new Draghandle(
        this.attributes.cx + this.attributes.r,
        this.attributes.cy + this.attributes.r,
        event => {
          const movement = Math.max(event.movementX, event.movementY);
          return {
            r: movement
          };
        }
      ),
      // Bottom left
      new Draghandle(
        this.attributes.cx - this.attributes.r,
        this.attributes.cy + this.attributes.r,
        event => {
          const movement = Math.max(event.movementX, event.movementY);
          return {
            r: movement
          };
        }
      )
    ];
  }
}
