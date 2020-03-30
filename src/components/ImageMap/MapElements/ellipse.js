import Element from "./element.js";
import Draghandle from "./draghandle.js";

const r = 20;

export default class Ellipse extends Element {
  constructor(event) {
    super("ellipse");
    const position = Element.getRelativeMousePosition(event);
    this.attributes = {
      cx: position.x + r,
      cy: position.y + r,
      rx: r,
      ry: r
    };
  }

  // Getter for the draghandles
  get dragHandles() {
    return [
      // Top left
      new Draghandle(
        this.attributes.cx - this.attributes.rx,
        this.attributes.cy - this.attributes.ry,
        event => {
          return {
            rx: -1 * event.movementX,
            ry: -1 * event.movementY
          };
        }
      ),
      // Top right
      new Draghandle(
        this.attributes.cx + this.attributes.rx,
        this.attributes.cy - this.attributes.ry,
        event => {
          return {
            rx: event.movementX,
            ry: -1 * event.movementY
          };
        }
      ),
      // Bottom right
      new Draghandle(
        this.attributes.cx + this.attributes.rx,
        this.attributes.cy + this.attributes.ry,
        event => {
          return {
            rx: event.movementX,
            ry: event.movementY
          };
        }
      ),
      // Bottom left
      new Draghandle(
        this.attributes.cx - this.attributes.rx,
        this.attributes.cy + this.attributes.ry,
        event => {
          return {
            rx: -1 * event.movementX,
            ry: event.movementY
          };
        }
      )
    ];
  }
}
