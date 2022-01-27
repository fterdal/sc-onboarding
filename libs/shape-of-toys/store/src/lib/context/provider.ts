import { useContext, createContext } from 'react';
import type { RootStoreModel } from '../models/root-store';
import { RootStore } from '../models/root-store';

const stateTreeRoot = RootStore.create({
  shapes: [],
});

const MstContext = createContext<RootStoreModel>(stateTreeRoot);

export const useMst = () => useContext(MstContext);
export const StoreProvider = MstContext.Provider;
