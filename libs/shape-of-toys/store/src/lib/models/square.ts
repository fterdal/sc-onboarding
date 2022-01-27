import { types, Instance } from 'mobx-state-tree';
import { Shape } from './shape';

const SquareProps = types
  .model({
    height: types.number,
    width: types.number,
  })
  .views((self) => ({}))
  .actions((self) => ({}));

export const SquareModel = types.compose(Shape, SquareProps).named('square');
export type iSquareModel = Instance<typeof SquareModel>;
