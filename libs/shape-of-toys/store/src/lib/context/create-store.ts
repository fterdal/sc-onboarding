import { RootStore, RootStoreModel } from '../models/root-store';

export const createStore = (): RootStoreModel => {
  const rootStore = RootStore.create();
  return rootStore;
};
