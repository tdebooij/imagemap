// export default function() {
//   this.lastInputEvent = null;

//   // Set up the event listeners
//   this.startListening = () => {
//     // Mousedown
//     window.addEventListener("mousedown", event => {
//       this.handleMouseDown(event);
//     });

//     // Mouseup
//     window.addEventListener("mouseup", event => {
//       this.handleMouseUp(event);
//     });
//   };

//   /*
//    * All event handlers
//    */

//   // The base event listener
//   this.BaseEventHandler = event => {
//     this.lastInputEvent = event;
//   };

//   // Mouse down
//   this.handleMouseDown = event => {
//     // Check the previous input
//     console.log(this.lastInputEvent);
//     this.BaseEventHandler(event);
//   };

//   this.handleMouseUp = () => {
//     // Check the previous input
//     if (this.lastInputEvent) {
//       switch (this.lastInputEvent.type) {
//         case "mousedown":
//           console.log("clicked");
//       }
//     }

//     this.BaseEventHandler(event);
//   };
// }
