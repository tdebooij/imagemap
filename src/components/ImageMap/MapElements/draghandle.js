export default class DragHandle {
  constructor(x, y, movehandler) {
    this.cx = x;
    this.cy = y;
    this.mousemovehandler = movehandler;
    // TODO: Pull from settings
    this.r = 5;
  }

  get data() {
    return Object.assign(this);
  }
}
