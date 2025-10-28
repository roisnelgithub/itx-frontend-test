import { api } from "@/lib/axios";

export interface IAddProductToCartResponse {
  count: number;
}

export interface IAddProductToCartRequest {
  id: string;
  colorCode: string;
  storageCode: string;
}

export const addProductToCart = async (data: IAddProductToCartRequest): Promise<IAddProductToCartResponse> => {
  const { data: response } = await api.post("/api/cart", data);
  return response;
};
