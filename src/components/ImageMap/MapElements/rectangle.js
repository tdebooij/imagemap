import Element from "./element";
import Draghandle from "./draghandle.js";

export default class Rectangle extends Element {
  constructor(event) {
    super("rect");
    const position = Element.getRelativeMousePosition(event);
    this.attributes = {
      x: position.x,
      y: position.y,
      width: 40,
      height: 40
    };
  }

  // Getter for the draghandles
  get dragHandles() {
    return [
      // Top left
      new Draghandle(this.attributes.x, this.attributes.y, event => {
        return {
          x: event.movementX,
          y: event.movementY,
          width: -1 * event.movementX,
          height: -1 * event.movementY
        };
      }),
      // Top right
      new Draghandle(
        this.attributes.x + this.attributes.width,
        this.attributes.y,
        event => {
          return {
            y: event.movementY,
            width: event.movementX,
            height: -1 * event.movementY
          };
        }
      ),
      // Bottom right
      new Draghandle(
        this.attributes.x + this.attributes.width,
        this.attributes.y + this.attributes.height,
        event => {
          return {
            width: event.movementX,
            height: event.movementY
          };
        }
      ),
      // Bottom left
      new Draghandle(
        this.attributes.x,
        this.attributes.y + this.attributes.height,
        event => {
          return {
            x: event.movementX,
            width: -1 * event.movementX,
            height: event.movementY
          };
        }
      )
    ];
  }
}
