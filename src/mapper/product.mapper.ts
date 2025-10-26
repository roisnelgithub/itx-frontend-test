import type { ProductApiResponse, ProductDetailsApiResponse } from "@/services/product.service";
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


export interface ProductResume {
  id: string;
  brand: string;
  model: string;
  price: number;
  cpu: string;
  ram: string;
  os: string;
  displayResolution: string;
  battery: string;
  primaryCamera: string[];
  secondaryCamera: string[];
  dimensions: string;
  weight: string;
}

export const mapProductDetailsToResume = (
  apiProduct: ProductDetailsApiResponse
): ProductResume => ({
  id: apiProduct.id,
  brand: apiProduct.brand,
  model: apiProduct.model,
  price: parseCurrencyValue(apiProduct.price),
  cpu: apiProduct.cpu,
  ram: apiProduct.ram,
  os: apiProduct.os,
  displayResolution: apiProduct.displayResolution,
  battery: apiProduct.battery,
  primaryCamera: apiProduct.primaryCamera,
  secondaryCamera: apiProduct.secondaryCmera,
  dimensions: apiProduct.dimentions,
  weight: apiProduct.weight,
});