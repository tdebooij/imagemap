// The starting width/height or radius for each element
const startWidth = 10; // In percentage of the image

export default class element {
  // The base constructor
  constructor(element) {
    this.element = element;
    // Set a newly created map to active by default
    this.isActive = true;

    this.startWidth = startWidth;
  }

  // Get the draghandle class elements for this element
  get dragHandles() {
    throw new Error("Function should be overriden in child");
  }

  get relativeAttributes() {
    let relativeAttributes = {};
    Object.keys(this.attributes).forEach((key) => {
      relativeAttributes[key] = this.attributes[key] + "%";
    });

    return relativeAttributes;
  }

  // Get the mouseposition relative to the clicked area
  static getRelativeMousePosition(e) {
    // Get the image element dimensions
    const rect = e.target.getBoundingClientRect();
    // Get the mouseposition in pixels relative only to the bounding image rect
    const coords = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    // Return coords as percentage of the bounding rect
    return {
      x: (coords.x / rect.width) * 100,
      y: (coords.y / rect.height) * 100,
    };
  }
}
