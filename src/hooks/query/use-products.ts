import type { ApiError } from "@/lib/axios";
import { mapProducts, type Product } from "@/mapper/product.mapper";
import { getProducts } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  return useQuery<Product[], ApiError>({
    queryKey: ["products"],
    queryFn: async () => {
      const data = await getProducts();
      return mapProducts(data);
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });
};