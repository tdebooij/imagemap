export default class element {
  // The base constructor
  constructor(element) {
    this.element = element;
    // Set a newly created map to active by default
    this.isActive = true;
  }

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
