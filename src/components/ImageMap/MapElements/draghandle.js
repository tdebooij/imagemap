export default class DragHandle {
  constructor(x, y, movehandler) {
    this.attributes = {
      cx: x,
      cy: y,
      r: 5 // TODO: Pull from settings
    };
    this.mousemovehandler = movehandler;
  }

  get data() {
    return Object.assign(this);
  }
}
