import { useEffect, useMemo, useState } from "react";

import type { IProduct } from "@/features/products/mappers/product.mapper";

interface IUseProductFilterOptions {

  debounceMs?: number;
  fields?: (keyof IProduct)[];
}

export function useProductFilter(
  products: IProduct[] | undefined | null,
  query: string,
  options: IUseProductFilterOptions = {}
) {
  const { debounceMs = 300, fields = ["brand", "model"] } = options;

  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    if (!query) {
      setIsFiltering(false);
      return;
    }
    setIsFiltering(true);

    const timer = setTimeout(() => {
      setIsFiltering(false);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    const searchText = query.trim().toLowerCase();
    if (!searchText) return products;

    return products.filter((product) => {
      return fields.some((field) => {
        const fieldValue = (product[field] ?? "").toString().toLowerCase();
        return fieldValue.includes(searchText);
      });
    });
  }, [products, query, fields]);

  return { filteredProducts, isFiltering };
}