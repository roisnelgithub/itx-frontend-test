import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import ProductPage from './product.page';

describe('Product Page', () => {
  it('renders title correctly', () => {
    render(<ProductPage />);
    expect(screen.getByText(/Product list/i)).toBeInTheDocument();
  });
});
