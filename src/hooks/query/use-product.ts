import { mapProductDetailsToResume, type ProductResume } from "@/mapper/product.mapper";
import { getProductById } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (id: string) => {
  return useQuery<ProductResume>({
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