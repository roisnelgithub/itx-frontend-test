import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';

import { useProducts } from '@/features/products/hooks/query/use-products';
import ProductListWrapper from './product-list.wrapper';

vi.mock('@/features/products/hooks/query/use-products');

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement, routerOptions?: { initialEntries?: string[] }) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={routerOptions?.initialEntries || ['/']}>
        <TooltipProvider>{ui}</TooltipProvider>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('ProductListWrapper', () => {
  it('renders loader when loading', () => {
    (useProducts as any).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      isSuccess: false,
    });

    renderWithProviders(<ProductListWrapper />);
    expect(screen.getByText(/loading products/i)).toBeInTheDocument();
  });

  it('renders error message on error', () => {
    (useProducts as any).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: new Error('Network error'),
      isSuccess: false,
    });

    renderWithProviders(<ProductListWrapper />);
    expect(screen.getByText(/network error/i)).toBeInTheDocument();
  });

  it('renders product list when data is available', () => {
    (useProducts as any).mockReturnValue({
      data: [
        { id: '1', brand: 'BrandA', model: 'ModelA', price: 100, imageURL: 'urlA' },
        { id: '2', brand: 'BrandB', model: 'ModelB', price: 200, imageURL: 'urlB' },
      ],
      isLoading: false,
      isError: false,
      isSuccess: true,
    });

    renderWithProviders(<ProductListWrapper />);
    expect(screen.getByText(/BrandA/i)).toBeInTheDocument();
    expect(screen.getByText(/BrandB/i)).toBeInTheDocument();
  });

  it('filters products based on search query', async () => {
    (useProducts as any).mockReturnValue({
      data: [
        { id: '1', brand: 'BrandA', model: 'ModelA', price: 100, imageURL: 'urlA' },
        { id: '2', brand: 'BrandB', model: 'ModelB', price: 200, imageURL: 'urlB' },
      ],
      isLoading: false,
      isError: false,
      isSuccess: true,
    });

    renderWithProviders(<ProductListWrapper />);
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'BrandA' } });

    fireEvent.change(searchInput, { target: { value: 'BrandA' } });

    await waitFor(() => {
      expect(screen.getByText(/BrandA/i)).toBeInTheDocument();
      expect(screen.queryByText(/BrandB/i)).not.toBeInTheDocument();
    });
  });

});
