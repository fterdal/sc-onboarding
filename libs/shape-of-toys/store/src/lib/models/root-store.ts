import { types, Instance, SnapshotIn } from 'mobx-state-tree';

import { SquareModel, iSquareModel } from './square';
import { CircleModel, iCircleModel } from './circle';
import { getRandomPoint, isAtPoint } from '../utils/utils';
import { RefObject } from 'react';

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
    addRandomCircle(canvas: RefObject<HTMLCanvasElement>) {
      const location = getRandomPoint(canvas);
      const shapeToAdd: SnapshotIn<iCircleModel> = {
        id: '1',
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
        id: '1',
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
    clear() {
      self.shapes.replace([]);
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
      }
    },
    detectShape(e: { nativeEvent: { offsetX: number; offsetY: number } }) {
      this.setMouseDown(true);
      for (let i: number = self.shapes.length - 1; i >= 0; i--) {
        if (
          self.isShiftDown &&
          isAtPoint(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY,
            self.shapes[i]
          )
        ) {
          self.shapes[i].setSelected(true);
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
