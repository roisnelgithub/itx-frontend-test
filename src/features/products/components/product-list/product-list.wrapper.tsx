import { useEffect, useState } from "react";
import { showErrorToast } from "@/lib/toast";

import { useProducts } from "@/features/products/hooks/query/use-products";
import ProductContent from "./product-content";
import ProductSearchField, { } from "@/shared/fields/search.field"

const ProductListWrapper = () => {
  const { data: products, isLoading, isError, error, isSuccess } = useProducts();
  const [query, setQuery] = useState("");

  const handleChange = (value: string) => {
    setQuery(value)
  }

  useEffect(() => {
    if (isError && error) {
      showErrorToast(error.message);
    }
  }, [isError, error]);

  return (
    <section className="w-full px-8">
      {/* Header */}
      <header className="flex w-full flex-col items-start gap-3 
                        md:flex-row md:items-center md:justify-between md:gap-0">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Product list
        </h1>
        <div className="w-full md:w-auto">
          <ProductSearchField
            value={query}
            onChange={handleChange}
            disabled={isLoading} />
        </div>
      </header>

      {/* Content */}
      <main className="flex justify-center mt-12">
        <ProductContent
          isError={isError}
          error={error ?? undefined}
          isLoading={isLoading}
          isSuccess={isSuccess}
          products={products}
          query={query} />
      </main>
    </section>
  )
}

export default ProductListWrapper
