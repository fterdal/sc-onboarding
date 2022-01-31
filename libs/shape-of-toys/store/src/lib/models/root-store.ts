import { types, Instance, SnapshotIn } from 'mobx-state-tree';

import { SquareModel, iSquareModel } from './square';
import { CircleModel, iCircleModel } from './circle';
import { getRandomPoint } from '../utils/utils';
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
  .views((self) => ({}))
  .actions((self) => ({
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
  }));
