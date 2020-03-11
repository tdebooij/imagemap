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
  get data() {
    return Object.assign(this);
  }
}
