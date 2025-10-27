import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import ProductPage from './product.page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

describe('Product Page', () => {
  it('renders title correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProductPage />
      </QueryClientProvider>
    );
    expect(screen.getByText(/Product list/i)).toBeInTheDocument();
  });
});
