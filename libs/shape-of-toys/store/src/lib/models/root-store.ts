import { types, Instance, SnapshotIn, destroy } from 'mobx-state-tree';

import { SquareModel, iSquareModel } from './square';
import { CircleModel, iCircleModel } from './circle';
import { getRandomPoint, isAtPoint } from '../utils/utils';
import { RefObject } from 'react';
import { nanoid } from 'nanoid';

export type RootStoreModel = Instance<typeof RootStore>;

export const RootStore = types
  .model({
    shapes: types.optional(
      types.array(types.union(SquareModel, CircleModel)),
      []
    ),
    isMouseDown: false,
    isShiftDown: false,
  })
  .views((self) => ({
    get hoveredCount(): number {
      let hoveredCount = 0;
      self.shapes.forEach((shape) => {
        if (shape.isHovered) hoveredCount++;
      });
      return hoveredCount;
    },
    get selectedCount(): number {
      let selectedCount = 0;
      self.shapes.forEach((shape) => {
        if (shape.isSelected) selectedCount++;
      });
      return selectedCount;
    },
  }))
  .actions((self) => ({
    setMouseDown(newMouseDown: boolean) {
      self.isMouseDown = newMouseDown;
    },
    setShiftDown(newShiftDown: boolean) {
      self.isShiftDown = newShiftDown;
    },
    addRandomCircle(canvas: RefObject<HTMLCanvasElement>) {
      const location = getRandomPoint(canvas);
      const shapeToAdd: SnapshotIn<iCircleModel> = {
        id: nanoid(),
        x: location.x,
        y: location.y,
        color: 'blue',
        isHovered: false,
        isSelected: false,
        radius: 50,
      };
      this.addShape(shapeToAdd);
    },
    addRandomSquare(canvas: RefObject<HTMLCanvasElement>) {
      const location = getRandomPoint(canvas);
      const shapeToAdd: SnapshotIn<iSquareModel> = {
        id: nanoid(),
        x: location.x,
        y: location.y,
        color: 'teal',
        isHovered: false,
        isSelected: false,
        width: 100,
        height: 100,
      };
      this.addShape(shapeToAdd);
    },
    // TODO add type
    addShape(shape: any) {
      self.shapes.push(shape);
    },
    removeShape(shapeId: string) {
     const filteredShapes = self.shapes.filter((currShape: iSquareModel | iCircleModel) => (currShape.id === shapeId));
     destroy(filteredShapes[0]);
    },
    clear() {
      self.shapes.replace([]);
    },
    handleHoverChanges(
      e: {
        movementX: number;
        movementY: number;
        nativeEvent: {
          offsetX: number;
          offsetY: number;
        };
      },
      i: number
    ) {
      if (
        isAtPoint(
          e.nativeEvent.offsetX,
          e.nativeEvent.offsetY,
          self.shapes[i]
        ) &&
        self.hoveredCount < 1
      ) {
        self.shapes[i].setHovered(true);
      } else if (
        !isAtPoint(
          e.nativeEvent.offsetX,
          e.nativeEvent.offsetY,
          self.shapes[i]
        ) &&
        self.hoveredCount >= 1
      ) {
        self.shapes[i].setHovered(false);
      }
    },
    handleMouseMove(e: {
      movementX: number;
      movementY: number;
      nativeEvent: {
        offsetX: number;
        offsetY: number;
      };
    }) {
      for (let i: number = self.shapes.length - 1; i >= 0; i--) {
        if (self.isMouseDown && self.shapes[i].isSelected) {
          self.shapes[i].updateXAndY(
            self.shapes[i].x + e.movementX,
            self.shapes[i].y + e.movementY
          );
        } else {
          this.handleHoverChanges(e, i);
        }
      }
    },
    detectShape(e: { nativeEvent: { offsetX: number; offsetY: number } }) {
      this.setMouseDown(true);
      for (let i: number = self.shapes.length - 1; i >= 0; i--) {
        if (self.isShiftDown) {
          if (
            isAtPoint(
              e.nativeEvent.offsetX,
              e.nativeEvent.offsetY,
              self.shapes[i]
            )
          ) {
            self.shapes[i].setSelected(true);
          }
        } else if (
          isAtPoint(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY,
            self.shapes[i]
          ) &&
          self.selectedCount < 1
        ) {
          self.shapes[i].setSelected(true);
        } else if (
          isAtPoint(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY,
            self.shapes[i]
          )
        ) {
          self.shapes[i].setSelected(false);
        } else if (self.selectedCount > 0) {
          self.shapes[i].setSelected(false);
        }
      }
    },
  }));
