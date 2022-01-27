import React from 'react';

import { StoreProvider, createStore } from '@sc-onboarding/shape-of-toys/store';
import App from '../app';

const rootStore = createStore();

const Root = () => (
  <StoreProvider value={rootStore}>
    <App />
  </StoreProvider>
);

export default Root;
