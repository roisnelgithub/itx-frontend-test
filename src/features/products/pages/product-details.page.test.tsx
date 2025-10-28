import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ProductDetailsPage from './product-details.page';
import { TooltipProvider } from '@/components/ui/tooltip';
import { BreadcrumbProvider } from '@/contexts/breadcrumb.context';
import { useProduct } from '@/features/products/hooks/query/use-product';

vi.mock('@/features/products/hooks/query/use-product');

const queryClient = new QueryClient();

const renderWithProviders = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BreadcrumbProvider>
          <MemoryRouter initialEntries={['/1']}>
            <Routes>
              <Route path="/:id" element={<ProductDetailsPage />} />
            </Routes>
          </MemoryRouter>
        </BreadcrumbProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );

describe('ProductDetailsPage', () => {
  it('shows loader when product is loading', () => {
    (useProduct as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: undefined,
      isSuccess: false,
    });

    renderWithProviders();

    expect(screen.getByText(/loading product/i)).toBeInTheDocument();
  });

  it('shows error message when there is an error', () => {
    (useProduct as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: { message: 'Network error' },
      isSuccess: false,
    });

    renderWithProviders();

    expect(screen.getByText(/network error/i)).toBeInTheDocument();
  });

  it('renders product details when data is available', () => {
    (useProduct as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: {
        id: '1',
        brand: 'BrandA',
        model: 'ModelA',
        price: 100,
        imageURL: 'urlA',
        options: {
          colors: [
            { code: 1, name: 'Red' },
            { code: 2, name: 'Blue' },
          ],
          storages: [
            { code: 1, name: '64GB' },
            { code: 2, name: '128GB' },
          ],
        },
      },
      isLoading: false,
      isError: false,
      error: undefined,
      isSuccess: true,
    });

    renderWithProviders();
    expect(screen.getByText(/product details/i)).toBeInTheDocument();
    expect(screen.getByText(/BrandA/i)).toBeInTheDocument();
    expect(screen.getByText(/ModelA/i)).toBeInTheDocument();
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    expect(addToCartButton).toBeInTheDocument();
  });
});
