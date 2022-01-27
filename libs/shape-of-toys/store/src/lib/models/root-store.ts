import { types, Instance } from 'mobx-state-tree';

import { SquareModel, iSquareModel } from './square';
import { CircleModel, iCircleModel } from './circle';

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
  .actions((self) => ({}));
