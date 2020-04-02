import Element from "./element.js";
import Draghandle from "./draghandle.js";

export default class Ellipse extends Element {
  constructor(event, imageWidth, imageHeight) {
    super("ellipse", imageWidth, imageHeight);
    const r = this.startWidth / 2;
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
            rx: -1 * (event.movementX / 2),
            ry: -1 * (event.movementY / 2),
            cx: event.movementX / 2,
            cy: event.movementY / 2
          };
        }
      ),
      // Top right
      new Draghandle(
        this.attributes.cx + this.attributes.rx,
        this.attributes.cy - this.attributes.ry,
        event => {
          return {
            rx: event.movementX / 2,
            ry: -1 * (event.movementY / 2),
            cx: event.movementX / 2,
            cy: event.movementY / 2
          };
        }
      ),
      // Bottom right
      new Draghandle(
        this.attributes.cx + this.attributes.rx,
        this.attributes.cy + this.attributes.ry,
        event => {
          return {
            rx: event.movementX / 2,
            ry: event.movementY / 2,
            cx: event.movementX / 2,
            cy: event.movementY / 2
          };
        }
      ),
      // Bottom left
      new Draghandle(
        this.attributes.cx - this.attributes.rx,
        this.attributes.cy + this.attributes.ry,
        event => {
          return {
            rx: -1 * (event.movementX / 2),
            ry: event.movementY / 2,
            cx: event.movementX / 2,
            cy: event.movementY / 2
          };
        }
      )
    ];
  }
}
