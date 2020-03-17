export default class element {
  // The base constructor
  constructor(element) {
    this.element = element;
    // Set a newly created map to active by default
    this.isActive = true;
  }

  // Gets the SVG element name of the class (e.g. 'rect' or 'circle')
  get element() {
    return this.element;
  }

  // Get an object of all element attributes needed to display the svg element (e.g. width, height, radius x, y etc.)
  get attributes() {
    return Object.assign(this);
  }

  // Get the draghandle class elements for this element
  get dragHandles() {
    throw new Error("Function should be overriden in child");
  }
}
