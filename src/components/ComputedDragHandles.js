export default function() {
  const dragHandles = [];
  if (this.data) {
    const props = this.data.props;
    if (this.data.element === "rect") {
      // Top left
      dragHandles.push({ direction: "nw", cx: props.x, cy: props.y });
      // Top right
      dragHandles.push({
        direction: "ne",
        cx: props.x + props.width,
        cy: props.y
      });
      // Top bottom left
      dragHandles.push({
        direction: "sw",
        cx: props.x,
        cy: props.y + props.height
      });
      // Bottom right
      dragHandles.push({
        direction: "se",
        cx: props.x + props.width,
        cy: props.y + props.height
      });
    }
  }
  return dragHandles;
}
