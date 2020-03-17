import element from "./element";
import Draghandle from "./draghandle.js";

export default class Rectangle extends element {
  constructor(element, position) {
    super(element);
    this.x = position.x;
    this.y = position.y;
    // TODO: Pull default width and height from settings
    this.width = 40;
    this.height = 40;
  }

  // Getter for the draghandles
  get dragHandles() {
    return [
      // Top left
      new Draghandle(this.x, this.y, event => {
        return {
          x: event.movementX,
          y: event.movementY,
          width: -1 * event.movementX,
          height: -1 * event.movementY
        };
      }),
      // Top right
      new Draghandle(this.x, this.y, event => {
        return {
          y: event.movementY,
          width: event.movementX,
          height: -1 * event.movementY
        };
      })
      // // Bottom right
      // new Draghandle(this.x, this.y, event => {
      //   return {
      //     x: event.movementX,
      //     y: event.movementY,
      //     width: -1 * event.movementX,
      //     height: -1 * event.movementY
      //   };
      // }),
      // // Bottom left
      // new Draghandle(this.x, this.y, event => {
      //   return {
      //     x: event.movementX,
      //     y: event.movementY,
      //     width: -1 * event.movementX,
      //     height: -1 * event.movementY
      //   };
      // })
    ];
  }
}
