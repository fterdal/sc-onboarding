import { types, Instance } from 'mobx-state-tree';

export type ShapeModel = Instance<typeof Shape>;
export const Shape = types
  .model({
    id: types.identifier,
    x: types.integer,
    y: types.integer,
    color: types.string,
    isHovered: false,
    isSelected: false,
  })
  .views((self) => ({}))
  .actions((self) => ({}));
