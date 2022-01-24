import { render } from '@testing-library/react';

import ShapeOfToysCanvas from './shape-of-toys-canvas';

describe('ShapeOfToysCanvas', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ShapeOfToysCanvas />);
    expect(baseElement).toBeTruthy();
  });
});
