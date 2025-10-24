import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Product from './product';

describe('Product Page', () => {
  it('renders title correctly', () => {
    render(<Product />);
    expect(screen.getByText(/Página Principal de Productos/i)).toBeInTheDocument();
  });
});
