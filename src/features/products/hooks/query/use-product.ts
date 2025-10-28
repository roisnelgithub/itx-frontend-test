import { useQuery } from "@tanstack/react-query";

import type { IApiError } from "@/lib/axios";
import { mapProductDetailsToResume, type IProductResume } from "@/features/products/mappers/product.mapper";
import { getProductById } from "@/features/products/services/product.service";

export const useProduct = (id: string) => {
  return useQuery<IProductResume, IApiError>({
    queryKey: ["product", id],
    queryFn: async () => {
      const data = await getProductById(id);
      return mapProductDetailsToResume(data);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });
};