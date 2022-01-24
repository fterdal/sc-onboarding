import { render } from '@testing-library/react';

import ShapeOfToysSelectedItems from './shape-of-toys-selected-items';

describe('ShapeOfToysSelectedItems', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ShapeOfToysSelectedItems />);
    expect(baseElement).toBeTruthy();
  });
});
