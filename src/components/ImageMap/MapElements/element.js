export default class element {
  // The base constructor
  constructor(element) {
    this.element = element;
    // Set a newly created map to active by default
    this.isActive = true;
  }

  // Get an object of all element attributes needed to display the svg element (e.g. width, height, radius x, y etc.)
  // get attributes() {
  //   console.log(this.attributes);
  //   return Object.assign(this.attributes);
  // }

  // Get the draghandle class elements for this element
  get dragHandles() {
    throw new Error("Function should be overriden in child");
  }

  // Get the mouseposition relative to the clicked area
  static getRelativeMousePosition(e) {
    const rect = e.target.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }
}
