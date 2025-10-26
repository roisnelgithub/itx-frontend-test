import { useState } from "react";

import { useProducts } from "@/hooks/use-products";
import SearchField from "@/components/shared/fields/search.field"
import ProductContent from "./product-content";

const ProductListWrapper = () => {
  const { data: products, isLoading, isError, isSuccess } = useProducts();
  const [query, setQuery] = useState("");

  const handleChange = (value: string) => {
    setQuery(value)
  }

  return (
    <section className="w-full px-8">
      {/* Header */}
      <header className="flex w-full flex-col items-start gap-3 
                        md:flex-row md:items-center md:justify-between md:gap-0">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Product list
        </h1>
        <div className="w-full md:w-auto">
          <SearchField
            value={query}
            onChange={handleChange}
            disabled={isLoading} />
        </div>
      </header>

      {/* Content */}
      <main className="flex justify-center mt-12">
        <ProductContent
          isError={isError}
          isLoading={isLoading}
          isSuccess={isSuccess}
          products={products}
          query={query} />
      </main>
    </section>
  )
}

export default ProductListWrapper
