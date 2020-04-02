# Vue image map creator

Create an image map with vue :)

# Dependencies

Besides all the normal vue 2 stuff ofcourse, copy the component folder into the app.
And then:

```
npi i vue-context
```

For the "add element" context menu

# TODO

## Critical

These have to be completed before anything else

- [x] Initial set up
- [x] Event listeners
- [x] Shape: Rectangle
- [x] Move MapElement logic to class
- [x] Move ResizeHandle logic to class
- [x] Event: Move
- [x] Event: Resize
- [x] Fix: Stop creating new after moving the mouse of the draghandle
- [x] Fix: Keep resizing when mouse down started on draghandle and is not released, even if the mouse moves off of the draghandle
- [x] Shape: Circle
- [x] Shape: Ellipse
- [x] Event: Create
- [x] Fix: scaling circle and ellipse
- [x] Implement in and exporting (via v-model?)
- [x] Implement scalability
- [ ] Allow metadata per map (like content)

## Major

These can only be implemented after the critical bits have been finished

- [ ] Implement: View only part
- [ ] Implement: Draggable imagemap

## Minor

- [ ] Fix: Negative radius and overlapping draghandles
- [ ] Shape: Polygon
- [ ] View-mode: allow settings like show maps, show mouse changing to pointer etc.
