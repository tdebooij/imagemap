# Vue image map creator

Create an image map with vue :)

# Dependencies

Besides all the normal vue 2 stuff ofcourse, copy the component folder into the app.
And then:

```
npm i vue-context
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
- [x] Implement in and exporting (via v-model?)
- [x] Implement scalability

## Minor

- [x] Fix: Resizing circle and ellipse
- [x] Fix: Negative radius and overlapping draghandles
- [ ] Shape: Polygon

## Major

- [ ] Split up into separate components:
  - [x] Image map editor
  - [x] Image map viewer
  - [ ] Image map textarea editor
  - [ ] Image map textarea viewer
  - [ ] Draggable (drag items to map areas)

### Creator

- [x] Add content to maps

### Viewer

- [x] Show content on map click
- [ ] Implement settings/options:
  - [ ] Show maps yes/no
  - [ ] Cursor change on map hover

### Draggable

Tbd
