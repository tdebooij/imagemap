export default class DragHandle {
  constructor(direction, element) {
    this.direction = direction;
    switch (direction) {
      case "n":
        this.cx = element.x;
        this.cy = element.y - element.height;
        break;
      case "w":
        this.cx = element.x + element.width;
        this.cy = element.y;
        break;
      case "s":
        this.cx = element.x;
        this.cy = element.y + element.height;
        break;
      case "e":
        this.cx = element.x - element.width;
        this.cy = element.y;
        break;
      case "nw":
        this.cx = element.x;
        this.cy = element.y;
        break;
      case "ne":
        this.cx = element.x + element.width;
        this.cy = element.y;
        break;
      case "se":
        this.cx = element.x + element.width;
        this.cy = element.y + element.height;
        break;
      case "sw":
        this.cx = element.x;
        this.cy = element.y + element.height;
        break;
    }
  }

  get data() {
    return Object.assign(this);
  }
}
