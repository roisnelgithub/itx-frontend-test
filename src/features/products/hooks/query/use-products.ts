import { useQuery } from "@tanstack/react-query";

import type { IApiError } from "@/lib/axios";
import { mapProducts, type IProduct } from "@/features/products/mappers/product.mapper";
import { getProducts } from "@/features/products/services/product.service";

export const useProducts = () => {
  return useQuery<IProduct[], IApiError>({
    queryKey: ["products"],
    queryFn: async () => {
      const data = await getProducts();
      return mapProducts(data);
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });
};