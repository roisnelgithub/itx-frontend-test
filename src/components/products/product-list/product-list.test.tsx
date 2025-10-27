import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProductList from "./product-list";
import ProductDetailsPage from "@/pages/product-details.page";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BreadcrumbProvider } from "@/contexts/breadcrumb.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const mockProducts = [
  { id: "1", brand: "BrandA", model: "ModelA", price: 100, imageURL: "urlA" },
  { id: "2", brand: "BrandB", model: "ModelB", price: 200, imageURL: "urlB" },
];

describe("ProductList", () => {
  it("navigates to product details page on click", async () => {
    render(
      <QueryClientProvider client={queryClient}>

        <TooltipProvider>
          <BreadcrumbProvider>
            <MemoryRouter initialEntries={["/"]}>
              <Routes>
                <Route path="/" element={<ProductList products={mockProducts} />} />
                <Route path="/:id" element={<ProductDetailsPage />} />
              </Routes>
            </MemoryRouter>
          </BreadcrumbProvider>
        </TooltipProvider>
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByText(/BrandA/i));

    expect(await screen.findByText(/Product Details/i)).toBeInTheDocument();
  });
});
