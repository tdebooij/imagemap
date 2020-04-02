export default class DragHandle {
  constructor(x, y, movehandler) {
    this.attributes = {
      cx: x,
      cy: y,
      r: 5 // TODO: Pull from settings
    };
    this.mousemovehandler = movehandler;
  }

  get relativeAttributes() {
    let relativeAttributes = {};
    Object.keys(this.attributes).forEach(key => {
      if (key !== "r") {
        relativeAttributes[key] = this.attributes[key] + "%";
      } else {
        // The radius of the draghandle is an absolute value
        relativeAttributes[key] = this.attributes[key];
      }
    });

    return relativeAttributes;
  }

  get data() {
    return Object.assign(this);
  }
}
