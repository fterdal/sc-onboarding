import { types, Instance } from 'mobx-state-tree';
import { Shape } from './shape';

const CircleProps = types
  .model({
    radius: types.number,
  })
  .views((self) => ({}))
  .actions((self) => ({
    updateRadius(newRadius: number) {
      self.radius = newRadius;
    },
  }));

export const CircleModel = types.compose(Shape, CircleProps).named('circle');
export type iCircleModel = Instance<typeof CircleModel>;
