import { mapProducts } from "@/mapper/product.mapper";
import { getProducts } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const data = await getProducts();
      return mapProducts(data);
    },
  });
};