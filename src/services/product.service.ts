import { api } from "@/lib/axios";

export interface ProductApiResponse {
  id: string;
  brand: string;
  model: string;
  price: number;
  imgUrl: string;
}

export const getProducts = async (): Promise<ProductApiResponse[]> => {
  const { data } = await api.get("/api/product");
  return data;
};