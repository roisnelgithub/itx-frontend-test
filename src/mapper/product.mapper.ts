import type { ProductApiResponse } from "@/services/product.service";
import { parseCurrencyValue } from "@/utils/format-price";

export interface Product {
  id: string;
  brand: string;
  model: string;
  price: number;
  imageURL: string;
}

export const mapProduct = (apiProduct: ProductApiResponse): Product => ({
  id: apiProduct.id,
  brand: apiProduct.brand,
  model: apiProduct.model,
  price: parseCurrencyValue(apiProduct.price),
  imageURL: apiProduct.imgUrl,
});

export const mapProducts = (apiProducts: ProductApiResponse[]): Product[] =>
  apiProducts.map(mapProduct);
